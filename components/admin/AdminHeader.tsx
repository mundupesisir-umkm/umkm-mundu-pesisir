"use client";

import React from "react";
import Link from "next/link";
import { KeyRound, Eye, LogOut, Package, MessageSquareHeart, BookOpen } from "lucide-react";
import { cn } from "@/lib";

interface AdminHeaderProps {
  adminTab: "products" | "testimonials";
  setAdminTab: (tab: "products" | "testimonials") => void;
  productCount: number;
  testimonialCount?: number;
  onOpenGuideModal: () => void;
  onOpenPasswordModal: () => void;
  onLogout: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  adminTab,
  setAdminTab,
  productCount,
  testimonialCount,
  onOpenGuideModal,
  onOpenPasswordModal,
  onLogout,
}) => {
  return (
    <>
      {/* TOP HEADER */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-linear-to-br from-[#008276] to-[#005f56] text-white flex items-center justify-center font-extrabold text-lg shadow-sm ring-2 ring-[#008276]/20">
              M
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-base font-extrabold text-[#0a2642] leading-tight">
                  Admin Sentra UMKM
                </h2>
                <span className="hidden sm:inline-flex text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-50 text-[#008276] border border-teal-200">
                  Mundu Pesisir
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block">
                Portal Manajemen Produk, Kategori &amp; Ulasan Pembeli
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={onOpenGuideModal}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-teal-50 hover:bg-teal-100 text-[#006e64] border border-teal-200 text-xs font-bold transition-all cursor-pointer shadow-2xs"
              title="Panduan Lengkap Pengisian Data UMKM"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#008276]" />
              <span>Panduan Mengisi</span>
            </button>

            <button
              type="button"
              onClick={onOpenPasswordModal}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
              title="Ganti Password Admin"
            >
              <KeyRound className="w-3.5 h-3.5 text-[#008276]" />
              <span className="hidden md:inline">Ganti Password</span>
            </button>

            <Link
              href="/produk"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
              title="Buka Halaman Katalog Publik di Tab Baru"
            >
              <Eye className="w-3.5 h-3.5 text-slate-600" />
              <span className="hidden md:inline">Lihat Web Publik</span>
            </Link>

            <button
              type="button"
              onClick={onLogout}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold transition-colors cursor-pointer"
              title="Keluar dari Panel Admin"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Keluar</span>
            </button>
          </div>
        </div>
      </header>

      {/* DASHBOARD SUB-HEADER & TAB BAR */}
      <div className="bg-slate-100/80 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Tab Selector */}
          <div className="flex items-center gap-1.5 p-1 bg-white rounded-2xl border border-slate-200 shadow-2xs w-fit">
            <button
              type="button"
              onClick={() => setAdminTab("products")}
              className={cn(
                "flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer",
                adminTab === "products"
                  ? "bg-[#008276] text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              )}
            >
              <Package className="w-4 h-4" />
              <span>Katalog Produk</span>
              <span
                className={cn(
                  "text-[10px] font-extrabold px-2 py-0.5 rounded-full",
                  adminTab === "products"
                    ? "bg-white/20 text-white"
                    : "bg-slate-100 text-slate-600"
                )}
              >
                {productCount}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setAdminTab("testimonials")}
              className={cn(
                "flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer",
                adminTab === "testimonials"
                  ? "bg-[#0a2642] text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              )}
            >
              <MessageSquareHeart className="w-4 h-4" />
              <span>Ulasan Pembeli</span>
              {testimonialCount !== undefined && (
                <span
                  className={cn(
                    "text-[10px] font-extrabold px-2 py-0.5 rounded-full",
                    adminTab === "testimonials"
                      ? "bg-white/20 text-white"
                      : "bg-slate-100 text-slate-600"
                  )}
                >
                  {testimonialCount}
                </span>
              )}
            </button>
          </div>

          {/* Cloud Database Connected Status Indicator */}
          <div className="flex items-center gap-2 text-[11px] sm:text-xs text-slate-500 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Cloud Supabase Terhubung</span>
          </div>
        </div>
      </div>
    </>
  );
};
