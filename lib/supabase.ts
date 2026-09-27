import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { ProductItem, PRODUCT_CATALOG_CONFIG } from "@/constants/products";
import { TestimonialItem, TESTIMONIALS_CONFIG } from "@/constants/testimonials";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://bxtwyqmldikttqotcwjg.supabase.co";
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  "sb_publishable_TEyknZL_oFWMbZzIcK8IUw_sxULoJo7";

// Singleton pattern to prevent Multiple GoTrueClient instances in browser context / Fast Refresh
const createSupabaseSingleton = (): SupabaseClient => {
  const globalWithSupabase = globalThis as typeof globalThis & {
    __supabaseInstance?: SupabaseClient;
  };

  if (!globalWithSupabase.__supabaseInstance) {
    globalWithSupabase.__supabaseInstance = createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: false,
      },
    });
  }

  return globalWithSupabase.__supabaseInstance;
};

export const supabase = createSupabaseSingleton();

export interface ProductRow {
  id: string;
  name: string;
  category_label: string;
  category_key: string;
  description: string;
  price: number;
  price_formatted: string;
  phone?: string | null;
  image: string;
  badge?: string | null;
  composition?: string | null;
  shelf_life?: string | null;
  packaging?: string | null;
  created_at?: string;
}

export const formatRupiah = (val: number): string => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
    .format(val)
    .replace("Rp", "Rp ");
};

export const mapRowToProduct = (row: ProductRow): ProductItem => ({
  id: row.id,
  name: row.name,
  categoryLabel: row.category_label,
  categoryKey: (row.category_key as "siwang" | "seafood") || "siwang",
  description: row.description,
  price: Number(row.price),
  priceFormatted: row.price_formatted || formatRupiah(Number(row.price)),
  phone: row.phone || undefined,
  image: row.image,
  badge: row.badge || undefined,
  details: {
    composition: row.composition || "-",
    shelfLife: row.shelf_life || "-",
    packaging: row.packaging || "-",
  },
});

export const mapProductToRow = (
  product: Partial<ProductItem> & { name: string; price: number }
): Record<string, unknown> => {
  const row: Record<string, unknown> = {
    name: product.name,
    category_label: product.categoryLabel || "PRODUK UMKM",
    category_key: product.categoryKey || "siwang",
    description: product.description || "",
    price: product.price,
    price_formatted: product.priceFormatted || formatRupiah(product.price),
    phone: product.phone || null,
    image: product.image || "/siwang-pouch.jpg",
    badge: product.badge || null,
    composition: product.details?.composition || null,
    shelf_life: product.details?.shelfLife || null,
    packaging: product.details?.packaging || null,
  };

  if (product.id) {
    row.id = product.id;
  }

  return row;
};

export interface TestimonialRow {
  id: string;
  name: string;
  location: string;
  rating: number;
  review: string;
  product_tag?: string | null;
  date?: string | null;
  has_watermark?: boolean | null;
  created_at?: string;
}

export const mapRowToTestimonial = (row: TestimonialRow): TestimonialItem => ({
  id: row.id,
  name: row.name,
  location: row.location,
  rating: Number(row.rating) || 5,
  review: row.review,
  productTag: row.product_tag || undefined,
  date: row.date || undefined,
  hasWatermark: Boolean(row.has_watermark),
});

export const mapTestimonialToRow = (
  item: Partial<TestimonialItem> & { name: string; review: string }
): Record<string, unknown> => {
  const row: Record<string, unknown> = {
    name: item.name,
    location: item.location || "Cirebon, Jawa Barat",
    rating: item.rating ?? 5,
    review: item.review,
    product_tag: item.productTag || null,
    date:
      item.date ||
      new Date().toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    has_watermark: Boolean(item.hasWatermark),
  };

  if (item.id) {
    row.id = item.id;
  }

  return row;
};

/**
 * Check if the `products` table exists in Supabase
 */
export async function checkProductsTable(): Promise<{
  exists: boolean;
  code?: string;
  message?: string;
}> {
  try {
    const { error } = await supabase.from("products").select("id").limit(1);
    if (!error) {
      return { exists: true };
    }
    // PGRST205 indicates relation / table does not exist
    if (error.code === "PGRST205" || error.message.includes("does not exist") || error.message.includes("schema cache")) {
      return { exists: false, code: error.code, message: error.message };
    }
    return { exists: false, code: error.code, message: error.message };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return { exists: false, message };
  }
}

/**
 * Fetch all products from Supabase
 */
export async function fetchProducts(): Promise<{
  data: ProductItem[];
  error?: string;
}> {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return { data: [], error: error.message };
    }

    const items = (data as ProductRow[]).map(mapRowToProduct);
    return { data: items };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to fetch products";
    return { data: [], error: message };
  }
}

/**
 * Fetch a single product by ID from Supabase
 */
export async function fetchProductById(id: string): Promise<{
  data: ProductItem | null;
  error?: string;
}> {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) {
      // Fallback check in static products if DB table error
      const fallback = PRODUCT_CATALOG_CONFIG.products.find((p) => p.id === id);
      if (fallback) return { data: fallback };
      return { data: null, error: error.message };
    }

    if (!data) {
      const fallback = PRODUCT_CATALOG_CONFIG.products.find((p) => p.id === id);
      return { data: fallback || null };
    }

    return { data: mapRowToProduct(data as ProductRow) };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to fetch product";
    const fallback = PRODUCT_CATALOG_CONFIG.products.find((p) => p.id === id);
    if (fallback) return { data: fallback };
    return { data: null, error: message };
  }
}

/**
 * Insert a new product into Supabase
 */
export async function createProduct(
  product: Omit<ProductItem, "id">
): Promise<{ data: ProductItem | null; error?: string }> {
  try {
    const row = mapProductToRow(product);
    const { data, error } = await supabase
      .from("products")
      .insert([row])
      .select()
      .single();

    if (error) {
      return { data: null, error: error.message };
    }

    return { data: mapRowToProduct(data as ProductRow) };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to create product";
    return { data: null, error: message };
  }
}

/**
 * Update an existing product
 */
export async function updateProduct(
  id: string,
  product: Partial<ProductItem>
): Promise<{ data: ProductItem | null; error?: string }> {
  try {
    const updateData: Record<string, unknown> = {};
    if (product.name !== undefined) updateData.name = product.name;
    if (product.categoryLabel !== undefined) updateData.category_label = product.categoryLabel;
    if (product.categoryKey !== undefined) updateData.category_key = product.categoryKey;
    if (product.description !== undefined) updateData.description = product.description;
    if (product.price !== undefined) {
      updateData.price = product.price;
      updateData.price_formatted = product.priceFormatted || formatRupiah(product.price);
    }
    if (product.phone !== undefined) updateData.phone = product.phone || null;
    if (product.image !== undefined) updateData.image = product.image;
    if (product.badge !== undefined) updateData.badge = product.badge || null;
    if (product.details) {
      if (product.details.composition !== undefined) updateData.composition = product.details.composition;
      if (product.details.shelfLife !== undefined) updateData.shelf_life = product.details.shelfLife;
      if (product.details.packaging !== undefined) updateData.packaging = product.details.packaging;
    }

    const { data, error } = await supabase
      .from("products")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return { data: null, error: error.message };
    }

    return { data: mapRowToProduct(data as ProductRow) };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to update product";
    return { data: null, error: message };
  }
}

/**
 * Delete a product by ID
 */
export async function deleteProduct(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to delete product";
    return { success: false, error: message };
  }
}

/**
 * Seed initial products into Supabase
 */
export async function seedInitialProducts(
  products: ProductItem[]
): Promise<{ count: number; error?: string }> {
  try {
    const rows = products.map((p) => {
      // Omit original mock string ID if it's not a UUID, let DB generate UUID or use slug
      const row = mapProductToRow(p);
      return row;
    });

    const { data, error } = await supabase.from("products").insert(rows).select();
    if (error) {
      return { count: 0, error: error.message };
    }

    return { count: data?.length || 0 };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to seed products";
    return { count: 0, error: message };
  }
}

/**
 * Upload product image to Supabase Storage with automatic fallback
 */
export async function uploadProductImage(
  file: File
): Promise<{ url: string | null; error?: string }> {
  try {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
    const filePath = `products/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("product-images")
      .upload(filePath, file, { cacheControl: "3600", upsert: true });

    if (uploadError) {
      // If bucket doesn't exist, read as base64 data url for instant support
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve({
            url: reader.result as string,
            error: "Penyimpanan Supabase belum dikonfigurasi, gambar disimpan sebagai Data URL.",
          });
        };
        reader.onerror = () => {
          resolve({ url: null, error: uploadError.message });
        };
        reader.readAsDataURL(file);
      });
    }

    const { data } = supabase.storage.from("product-images").getPublicUrl(filePath);
    return { url: data.publicUrl };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to upload image";
    return { url: null, error: message };
  }
}

/**
 * Verify admin password from database table `admin_settings`
 */
export async function verifyAdminPassword(password: string): Promise<{
  success: boolean;
  fromDatabase: boolean;
  error?: string;
}> {
  try {
    const { data, error } = await supabase
      .from("admin_settings")
      .select("value")
      .eq("key", "admin_password")
      .maybeSingle();

    if (error) {
      // If table doesn't exist yet, fallback to default temporary password
      if (
        error.code === "PGRST205" ||
        error.message.includes("does not exist") ||
        error.message.includes("schema cache")
      ) {
        const isDefault =
          password.trim() === "adminmundu" || password.trim() === "admin123";
        return {
          success: isDefault,
          fromDatabase: false,
          error: isDefault
            ? undefined
            : "Password salah. (Tabel database belum dibuat, silakan gunakan 'adminmundu').",
        };
      }
      return { success: false, fromDatabase: false, error: error.message };
    }

    if (!data) {
      // Seed default password if row doesn't exist
      await supabase
        .from("admin_settings")
        .insert([{ key: "admin_password", value: "adminmundu" }]);
      const isDefault =
        password.trim() === "adminmundu" || password.trim() === "admin123";
      return { success: isDefault, fromDatabase: true };
    }

    return { success: data.value === password.trim(), fromDatabase: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Gagal memverifikasi password";
    return { success: false, fromDatabase: false, error: message };
  }
}

/**
 * Update admin password in database table `admin_settings`
 */
export async function updateAdminPassword(newPassword: string): Promise<{
  success: boolean;
  error?: string;
}> {
  try {
    const { error } = await supabase.from("admin_settings").upsert(
      {
        key: "admin_password",
        value: newPassword.trim(),
        updated_at: new Date().toISOString(),
      },
      { onConflict: "key" }
    );

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Gagal memperbarui password di database";
    return { success: false, error: message };
  }
}

/**
 * Check if the `testimonials` table exists in Supabase
 */
export async function checkTestimonialsTable(): Promise<{
  exists: boolean;
  code?: string;
  message?: string;
}> {
  try {
    const { error } = await supabase.from("testimonials").select("id").limit(1);
    if (!error) {
      return { exists: true };
    }
    if (
      error.code === "PGRST205" ||
      error.message.includes("does not exist") ||
      error.message.includes("schema cache")
    ) {
      return { exists: false, code: error.code, message: error.message };
    }
    return { exists: false, code: error.code, message: error.message };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return { exists: false, message };
  }
}

/**
 * Fetch all testimonials from Supabase
 */
export async function fetchTestimonials(): Promise<{
  data: TestimonialItem[];
  error?: string;
  tableExists?: boolean;
}> {
  try {
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      if (
        error.code === "PGRST205" ||
        error.message.includes("does not exist") ||
        error.message.includes("schema cache")
      ) {
        return {
          data: [],
          error: error.message,
          tableExists: false,
        };
      }
      return { data: [], error: error.message, tableExists: true };
    }

    const items = (data as TestimonialRow[]).map(mapRowToTestimonial);
    return { data: items, tableExists: true };
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Failed to fetch testimonials";
    return { data: [], error: message, tableExists: false };
  }
}

/**
 * Fetch a single testimonial by ID from Supabase
 */
export async function fetchTestimonialById(id: string): Promise<{
  data: TestimonialItem | null;
  error?: string;
}> {
  try {
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error || !data) {
      return { data: null, error: error?.message };
    }

    return { data: mapRowToTestimonial(data as TestimonialRow) };
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Failed to fetch testimonial";
    return { data: null, error: message };
  }
}

/**
 * Insert a new testimonial into Supabase
 */
export async function createTestimonial(
  item: Omit<TestimonialItem, "id">
): Promise<{ data: TestimonialItem | null; error?: string }> {
  try {
    const row = mapTestimonialToRow(item);
    const { data, error } = await supabase
      .from("testimonials")
      .insert([row])
      .select()
      .single();

    if (error) {
      return { data: null, error: error.message };
    }

    return { data: mapRowToTestimonial(data as TestimonialRow) };
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Failed to create testimonial";
    return { data: null, error: message };
  }
}

/**
 * Update an existing testimonial
 */
export async function updateTestimonial(
  id: string,
  item: Partial<TestimonialItem>
): Promise<{ data: TestimonialItem | null; error?: string }> {
  try {
    const updateData: Record<string, unknown> = {};
    if (item.name !== undefined) updateData.name = item.name;
    if (item.location !== undefined) updateData.location = item.location;
    if (item.rating !== undefined) updateData.rating = item.rating;
    if (item.review !== undefined) updateData.review = item.review;
    if (item.productTag !== undefined) updateData.product_tag = item.productTag || null;
    if (item.date !== undefined) updateData.date = item.date || null;
    if (item.hasWatermark !== undefined) updateData.has_watermark = Boolean(item.hasWatermark);

    const { data, error } = await supabase
      .from("testimonials")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return { data: null, error: error.message };
    }

    return { data: mapRowToTestimonial(data as TestimonialRow) };
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Failed to update testimonial";
    return { data: null, error: message };
  }
}

/**
 * Delete a testimonial by ID
 */
export async function deleteTestimonial(
  id: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase.from("testimonials").delete().eq("id", id);
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Failed to delete testimonial";
    return { success: false, error: message };
  }
}

export const SUPABASE_SQL_SCHEMA = `-- ================================================================
-- SQL SETUP UNTUK UMKM MUNDU PESISIR
-- Salin dan jalankan seluruh query ini di Supabase SQL Editor
-- (Dashboard Supabase > SQL Editor > New query > Run)
-- ================================================================

-- 1. Buat tabel produk
CREATE TABLE IF NOT EXISTS public.products (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT NOT NULL,
  category_label TEXT NOT NULL DEFAULT 'PRODUK UMKM',
  category_key TEXT NOT NULL DEFAULT 'siwang',
  description TEXT NOT NULL,
  price NUMERIC NOT NULL DEFAULT 0,
  price_formatted TEXT NOT NULL,
  phone TEXT,
  image TEXT NOT NULL DEFAULT '/siwang-pouch.jpg',
  badge TEXT,
  composition TEXT,
  shelf_life TEXT,
  packaging TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Tambahkan kolom phone jika tabel sudah dibuat sebelumnya
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS phone TEXT;

-- 2. Buat tabel testimoni pembeli
CREATE TABLE IF NOT EXISTS public.testimonials (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  rating NUMERIC NOT NULL DEFAULT 5,
  review TEXT NOT NULL,
  product_tag TEXT,
  date TEXT,
  has_watermark BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Buat tabel pengaturan & password admin
CREATE TABLE IF NOT EXISTS public.admin_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Masukkan password admin default jika belum ada
INSERT INTO public.admin_settings (key, value)
VALUES ('admin_password', 'adminmundu')
ON CONFLICT (key) DO NOTHING;

-- 4. Aktifkan Row Level Security (RLS)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_settings ENABLE ROW LEVEL SECURITY;

-- 5. Hapus policy lama jika ada untuk mencegah duplikasi
DROP POLICY IF EXISTS "Allow public read access" ON public.products;
DROP POLICY IF EXISTS "Allow anon insert" ON public.products;
DROP POLICY IF EXISTS "Allow anon update" ON public.products;
DROP POLICY IF EXISTS "Allow anon delete" ON public.products;

DROP POLICY IF EXISTS "Allow public read testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Allow anon insert testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Allow anon update testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Allow anon delete testimonials" ON public.testimonials;

DROP POLICY IF EXISTS "Allow anon read admin_settings" ON public.admin_settings;
DROP POLICY IF EXISTS "Allow anon update admin_settings" ON public.admin_settings;
DROP POLICY IF EXISTS "Allow anon insert admin_settings" ON public.admin_settings;

-- 6. Policy untuk Tabel Produk
CREATE POLICY "Allow public read access" 
ON public.products 
FOR SELECT 
USING (true);

CREATE POLICY "Allow anon insert" 
ON public.products 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow anon update" 
ON public.products 
FOR UPDATE 
USING (true);

CREATE POLICY "Allow anon delete" 
ON public.products 
FOR DELETE 
USING (true);

-- 7. Policy untuk Tabel Testimoni
CREATE POLICY "Allow public read testimonials" 
ON public.testimonials 
FOR SELECT 
USING (true);

CREATE POLICY "Allow anon insert testimonials" 
ON public.testimonials 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow anon update testimonials" 
ON public.testimonials 
FOR UPDATE 
USING (true);

CREATE POLICY "Allow anon delete testimonials" 
ON public.testimonials 
FOR DELETE 
USING (true);

-- 8. Policy untuk Tabel Pengaturan Admin
CREATE POLICY "Allow anon read admin_settings" 
ON public.admin_settings 
FOR SELECT 
USING (true);

CREATE POLICY "Allow anon update admin_settings" 
ON public.admin_settings 
FOR UPDATE 
USING (true);

CREATE POLICY "Allow anon insert admin_settings" 
ON public.admin_settings 
FOR INSERT 
WITH CHECK (true);

-- 9. (Opsional) Bucket Storage untuk upload foto produk
INSERT INTO storage.buckets (id, name, public) 
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public Access product-images" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'product-images');

CREATE POLICY "Public Upload product-images" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'product-images');
`;
