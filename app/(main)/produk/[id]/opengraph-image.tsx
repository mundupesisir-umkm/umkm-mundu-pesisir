import { ImageResponse } from "next/og";
import { fetchProductById } from "@/lib/supabase";
import { PRODUCT_CATALOG_CONFIG } from "@/constants/products";

export const alt = "Detail Produk - UMKM Mundu Pesisir";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const revalidate = 3600;

interface Props {
  params: Promise<{ id: string }>;
}

export default async function Image({ params }: Props) {
  const { id } = await params;
  const decodedId = decodeURIComponent(id);

  const { data: product } = await fetchProductById(decodedId).catch(() => ({
    data: null,
  }));

  const p =
    product ||
    PRODUCT_CATALOG_CONFIG.products.find((x) => x.id === decodedId);

  const name = p?.name ?? "Produk UMKM Mundu Pesisir";
  const description = p?.description ?? "Olahan khas pesisir Cirebon tanpa pengawet";
  const price = p?.priceFormatted ?? "";
  const category = p?.categoryLabel ?? "PRODUK UMKM";
  const badge = p?.badge;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "linear-gradient(135deg, #0a2642 0%, #003d35 60%, #008276 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background accent */}
        <div
          style={{
            position: "absolute",
            top: "-80px",
            right: "-80px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "rgba(0,130,118,0.2)",
          }}
        />

        {/* Left: product info */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            flex: 1,
            padding: "56px 64px",
            position: "relative",
          }}
        >
          {/* Brand */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                background: "rgba(255,255,255,0.15)",
                border: "1px solid rgba(255,255,255,0.25)",
                borderRadius: "999px",
                padding: "8px 20px",
                color: "#a5f3e8",
                fontSize: "15px",
                fontWeight: "700",
                letterSpacing: "1.5px",
                textTransform: "uppercase",
              }}
            >
              🌊 UMKM Mundu Pesisir
            </div>
            {badge && (
              <div
                style={{
                  background: "#f59e0b",
                  color: "#1c1917",
                  borderRadius: "999px",
                  padding: "8px 20px",
                  fontSize: "14px",
                  fontWeight: "800",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                }}
              >
                ⭐ {badge}
              </div>
            )}
          </div>

          {/* Product detail */}
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <div
              style={{
                color: "#7dd3c8",
                fontSize: "18px",
                fontWeight: "700",
                textTransform: "uppercase",
                letterSpacing: "2px",
              }}
            >
              {category}
            </div>
            <div
              style={{
                color: "#ffffff",
                fontSize: name.length > 40 ? "44px" : "54px",
                fontWeight: "900",
                lineHeight: 1.1,
              }}
            >
              {name}
            </div>
            <div
              style={{
                color: "rgba(255,255,255,0.75)",
                fontSize: "22px",
                lineHeight: 1.5,
                maxWidth: "580px",
              }}
            >
              {description}
            </div>
          </div>

          {/* Price & CTA */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            {price && (
              <div
                style={{
                  background: "#008276",
                  color: "#fff",
                  borderRadius: "14px",
                  padding: "14px 28px",
                  fontSize: "28px",
                  fontWeight: "900",
                }}
              >
                {price}
              </div>
            )}
            <div
              style={{
                background: "rgba(255,255,255,0.12)",
                color: "#fff",
                borderRadius: "14px",
                padding: "14px 24px",
                fontSize: "20px",
                fontWeight: "700",
                border: "1px solid rgba(255,255,255,0.25)",
              }}
            >
              📲 Pesan via WhatsApp
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
