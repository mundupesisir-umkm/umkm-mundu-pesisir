import { ImageResponse } from "next/og";

export const alt = "UMKM Mundu Pesisir - Siwang & Olahan Seafood Khas Cirebon";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const revalidate = 86400; // Cache 24h

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "linear-gradient(135deg, #0a2642 0%, #004d3d 50%, #008276 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative wave pattern */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "480px",
            height: "480px",
            borderRadius: "50%",
            background: "rgba(0,130,118,0.18)",
            transform: "translate(120px, -120px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "360px",
            height: "360px",
            borderRadius: "50%",
            background: "rgba(0,130,118,0.14)",
            transform: "translate(-100px, 100px)",
          }}
        />

        {/* Content container */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
            padding: "60px 72px",
            position: "relative",
          }}
        >
          {/* Top: badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div
              style={{
                background: "rgba(255,255,255,0.15)",
                border: "1px solid rgba(255,255,255,0.3)",
                borderRadius: "999px",
                padding: "8px 20px",
                color: "#a5f3e8",
                fontSize: "16px",
                fontWeight: "700",
                letterSpacing: "2px",
                textTransform: "uppercase",
              }}
            >
              🌊 PRODUK ASLI PESISIR CIREBON
            </div>
          </div>

          {/* Middle: main title */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div
              style={{
                color: "#ffffff",
                fontSize: "72px",
                fontWeight: "900",
                lineHeight: 1.1,
                letterSpacing: "-1px",
              }}
            >
              UMKM Mundu Pesisir
            </div>
            <div
              style={{
                color: "#7dd3c8",
                fontSize: "30px",
                fontWeight: "500",
                lineHeight: 1.4,
              }}
            >
              Siwang Renyah · Kerupuk Ikan Payur · Terasi Rebon Murni
            </div>
            <div
              style={{
                color: "rgba(255,255,255,0.7)",
                fontSize: "22px",
                marginTop: "8px",
              }}
            >
              🏘️ Desa Mundu Pesisir, Kecamatan Mundu, Kabupaten Cirebon
            </div>
          </div>

          {/* Bottom: CTA chips */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                background: "#008276",
                color: "#fff",
                borderRadius: "12px",
                padding: "14px 28px",
                fontSize: "20px",
                fontWeight: "800",
              }}
            >
              📲 Pesan via WhatsApp
            </div>
            <div
              style={{
                background: "rgba(255,255,255,0.12)",
                color: "#fff",
                borderRadius: "12px",
                padding: "14px 28px",
                fontSize: "20px",
                fontWeight: "600",
                border: "1px solid rgba(255,255,255,0.25)",
              }}
            >
              🚚 Kirim Seluruh Indonesia
            </div>
            <div
              style={{
                background: "rgba(255,255,255,0.12)",
                color: "#fff",
                borderRadius: "12px",
                padding: "14px 28px",
                fontSize: "20px",
                fontWeight: "600",
                border: "1px solid rgba(255,255,255,0.25)",
              }}
            >
              ✅ Tanpa Pengawet
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
