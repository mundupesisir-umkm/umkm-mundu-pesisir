"use client";

import React from "react";
import Link from "next/link";
import { KeyRound, Eye, LogOut, Package, MessageSquareHeart } from "lucide-react";
import { cn } from "@/lib";

interface AdminHeaderProps {
  adminTab: "products" | "testimonials";
  setAdminTab: (tab: "products" | "testimonials") => void;
  productCount: number;
  onOpenPasswordModal: () => void;
  onLogout: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  adminTab,
  setAdminTab,
  productCount,
  onOpenPasswordModal,
  onLogout,
}) => {
  return (
    <>
      {/* TOP HEADER */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#008276] text-white flex items-center justify-center font-bold text-lg shadow-sm">
              M
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-[#0a2642] leading-tight">
                Admin UMKM Mundu Pesisir
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onOpenPasswordModal}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
              title="Ganti Password Admin"
            >
              <KeyRound className="w-3.5 h-3.5 text-[#008276]" />
              <span className="hidden sm:inline">Ganti Password</span>
            </button>

            <Link
              href="/produk"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Lihat Web Publik</span>
            </Link>

            <button
              onClick={onLogout}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Keluar</span>
            </button>
          </div>
        </div>
      </header>

      {/* DASHBOARD TAB SELECTOR */}
      <div className="flex items-center gap-2 p-1.5 bg-slate-200/80 rounded-2xl w-fit">
        <button
          type="button"
          onClick={() => setAdminTab("products")}
          className={cn(
            "flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer",
            adminTab === "products"
              ? "bg-white text-[#0a2642] shadow-xs"
              : "text-slate-600 hover:text-slate-900"
          )}
        >
          <Package className="w-4 h-4 text-[#008276]" />
          <span>Katalog Produk ({productCount})</span>
        </button>

        <button
          type="button"
          onClick={() => setAdminTab("testimonials")}
          className={cn(
            "flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer",
            adminTab === "testimonials"
              ? "bg-white text-[#0a2642] shadow-xs"
              : "text-slate-600 hover:text-slate-900"
          )}
        >
          <MessageSquareHeart className="w-4 h-4 text-[#8a6843]" />
          <span>Ulasan Testimoni</span>
        </button>
      </div>
    </>
  );
};
