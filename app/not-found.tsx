import Image from "next/image";
import Link from "next/link";
import { Home, ShoppingBag, ArrowLeft, LifeBuoy } from "lucide-react";
import { SITE_CONFIG } from "@/constants";

export default function NotFound() {
  return (
    <main className="w-full h-dvh max-h-dvh flex flex-col justify-between items-center px-4 py-4 sm:px-6 sm:py-6 relative overflow-hidden bg-white selection:bg-[#0a2642] selection:text-[#dfc19c]">
      {/* Ambient Coastal Gradient & Sand Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-85 h-85 sm:w-150 sm:h-150 rounded-full bg-linear-to-tr from-[#f8efe6] via-[#f2e7db]/70 to-[#e8f2f9]/30 blur-3xl pointer-events-none -z-10" />

      {/* 1. Top Minimal Header Bar (Brand Identity without full navbar) */}
      <header className="w-full max-w-4xl flex items-center justify-between z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#f8efe6]/90 border border-[#d8c7b4]/80 shadow-2xs hover:border-[#0a2642] transition-colors"
        >
          <div className="relative w-6 h-6 sm:w-7 sm:h-7 shrink-0">
            <Image
              src={SITE_CONFIG.logoSrc}
              alt={SITE_CONFIG.name}
              width={28}
              height={28}
              className="object-contain w-full h-full"
              priority
            />
          </div>
          <span className="text-xs sm:text-sm font-bold text-[#0a2642] tracking-tight">
            {SITE_CONFIG.name}
          </span>
        </Link>

        <Link
          href="/#kontak"
          className="inline-flex items-center gap-1.5 text-xs text-[#8a6843] hover:text-[#0a2642] font-semibold transition-colors px-3 py-1.5 rounded-lg hover:bg-[#f4ece1]"
        >
          <LifeBuoy className="w-3.5 h-3.5 text-[#8a6843]" />
          <span className="hidden sm:inline">Pusat Bantuan</span>
        </Link>
      </header>

      {/* 2. Center Content - Creative "4 [Logo] 4" Composition */}
      <section className="flex flex-col items-center justify-center my-auto text-center z-10 max-w-xl w-full">
        {/* Giant 4-Logo-4 Landmark */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 select-none mb-2 sm:mb-3">
          <span className="text-6xl sm:text-8xl md:text-9xl font-black tracking-tighter text-[#0a2642] leading-none font-sans drop-shadow-xs">
            4
          </span>

          {/* Logo utilized as the animated center "0" in coastal halo */}
          <div className="relative flex items-center justify-center">
            {/* Outer animated halo ring in sand & ocean tones */}
            <div className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-3xl bg-linear-to-br from-[#f8efe6] via-[#f2e7db] to-[#ebdccb] border-2 border-[#d8c7b4] shadow-xl shadow-[#0a2642]/10 flex items-center justify-center p-3 sm:p-4 rotate-2 hover:rotate-0 transition-transform duration-300">
              <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  src={SITE_CONFIG.logoSrc}
                  alt={SITE_CONFIG.name}
                  fill
                  sizes="(max-width: 768px) 100px, 128px"
                  className="object-contain drop-shadow-md"
                  priority
                />
              </div>
            </div>

            {/* Nautical badge marker */}
            <span className="absolute -bottom-2 px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold bg-[#0a2642] text-[#fbf7f2] tracking-wider uppercase shadow-md border border-[#dfc19c]/40">
              Pesisir
            </span>
          </div>

          <span className="text-6xl sm:text-8xl md:text-9xl font-black tracking-tighter text-[#0a2642] leading-none font-sans drop-shadow-xs">
            4
          </span>
        </div>

        {/* Status Pill */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold bg-[#f4ece1] text-[#8a6843] border border-[#d8c7b4] mb-2 sm:mb-3 mt-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#8a6843] animate-ping" />
          Dermaga Tidak Ditemukan
        </div>

        {/* Headings */}
        <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#0a2642] tracking-tight mb-1.5 sm:mb-2">
          Terbawa Arus Keluar Peta
        </h1>

        <p className="text-xs sm:text-sm text-[#5a6b7c] max-w-sm sm:max-w-md leading-relaxed mb-5 sm:mb-6">
          Halaman yang Anda tuju belum berlabuh di perairan kami. Mari kembali ke beranda untuk menjelajahi potensi & produk unggulan{" "}
          <span className="font-semibold text-[#0a2642]">{SITE_CONFIG.name}</span>.
        </p>

        {/* Interactive Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3.5 w-full sm:w-auto">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#0a2642] hover:bg-[#071c30] text-[#fbf7f2] text-xs sm:text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
          >
            <Home className="w-4 h-4 text-[#dfc19c]" />
            <span>Kembali ke Beranda</span>
          </Link>

          <Link
            href="/#produk"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#f2e7db] hover:bg-[#eadbc9] text-[#0a2642] border border-[#d8c7b4] text-xs sm:text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
          >
            <ShoppingBag className="w-4 h-4 text-[#8a6843]" />
            <span>Katalog Produk UMKM</span>
          </Link>
        </div>
      </section>

      {/* 3. Bottom Minimal Nautical Ribbon */}
      <footer className="w-full max-w-4xl flex items-center justify-between text-[11px] sm:text-xs text-[#8a6843] pt-2 border-t border-[#f0e4d7] z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 hover:text-[#0a2642] font-medium transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali</span>
        </Link>

        <span className="text-[#8c7a68]">
          © {new Date().getFullYear()} {SITE_CONFIG.name}
        </span>
      </footer>
    </main>
  );
}
