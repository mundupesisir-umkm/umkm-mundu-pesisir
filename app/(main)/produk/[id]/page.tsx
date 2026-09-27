import type { Metadata } from "next";
import { ProductDetailView } from "@/components/products";
import { fetchProductById } from "@/lib/supabase";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const decodedId = decodeURIComponent(id);
  const { data: product } = await fetchProductById(decodedId);

  if (!product) {
    return {
      title: "Detail Produk - UMKM Mundu Pesisir",
      description:
        "Informasi detail produk olahan khas Desa Mundupesisir Cirebon.",
    };
  }

  return {
    title: `${product.name} - UMKM Mundu Pesisir Cirebon`,
    description: `${product.description} Harga: ${product.priceFormatted}. Produk olahan asli pesisir Cirebon tanpa pengawet.`,
    openGraph: {
      title: `${product.name} - UMKM Mundu Pesisir`,
      description: product.description,
      images: [product.image],
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  const decodedId = decodeURIComponent(id);
  return <ProductDetailView productId={decodedId} />;
}
