-- ================================================================
-- SQL SETUP DATABASE SUPABASE UNTUK UMKM DESA MUNDU PESISIR
-- ================================================================
-- Cara Pakai:
-- 1. Buka dashboard Supabase project Anda: https://supabase.com/dashboard
-- 2. Pilih project Anda
-- 3. Masuk ke menu "SQL Editor" di bilah navigasi kiri
-- 4. Klik "New Query", paste seluruh kode di bawah ini, lalu klik "Run"
-- ================================================================

-- 1. Buat Tabel Produk
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
  variants JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Tambahkan kolom phone & variants jika tabel sudah dibuat sebelumnya
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS phone TEXT;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS variants JSONB DEFAULT '[]'::jsonb;

-- 2. Buat Tabel Testimoni Pembeli
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

-- 3. Buat Tabel Pengaturan / Password Admin
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

-- 5. Hapus Policy lama jika sebelumnya sudah dibuat
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

-- 6. (Opsional) Bucket Storage untuk foto produk
INSERT INTO storage.buckets (id, name, public) 
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Public Access product-images" ON storage.objects;
DROP POLICY IF EXISTS "Public Upload product-images" ON storage.objects;

CREATE POLICY "Public Access product-images" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'product-images');

CREATE POLICY "Public Upload product-images" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'product-images');
