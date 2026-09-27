import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portal Admin - UMKM Mundu Pesisir",
  description: "Panel Pengelolaan Produk dan Data UMKM Desa Mundu Pesisir",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans selection:bg-[#008276] selection:text-white antialiased">
      {children}
    </div>
  );
}
