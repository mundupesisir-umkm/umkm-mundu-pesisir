import { MetadataRoute } from "next";
import { fetchProducts } from "@/lib/supabase";
import { PRODUCT_CATALOG_CONFIG } from "@/constants/products";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://umkmmundupesisir.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // Static pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${siteUrl}/produk`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/produk/siwang`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${siteUrl}/produk/seafood`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${siteUrl}/testimoni`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/profil`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${siteUrl}/kontak`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  // Dynamic product pages
  let productRoutes: MetadataRoute.Sitemap = [];
  try {
    const res = await fetchProducts();
    const allIds = new Set<string>([
      ...(res.data || []).map((p) => p.id),
      ...PRODUCT_CATALOG_CONFIG.products.map((p) => p.id),
    ]);

    productRoutes = Array.from(allIds).map((id) => ({
      url: `${siteUrl}/produk/${encodeURIComponent(id)}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));
  } catch {
    // Fallback to static product IDs
    productRoutes = PRODUCT_CATALOG_CONFIG.products.map((p) => ({
      url: `${siteUrl}/produk/${encodeURIComponent(p.id)}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));
  }

  return [...staticRoutes, ...productRoutes];
}
