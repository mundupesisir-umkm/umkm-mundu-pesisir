"use client";

import React from "react";
import { AlertTriangle, Copy, Check, FileCode, RefreshCw, ExternalLink } from "lucide-react";

interface AdminDatabaseAlertProps {
  copiedSql: boolean;
  onCopySql: () => void;
  onOpenSqlModal: () => void;
  onRefresh: () => void;
}

export const AdminDatabaseAlert: React.FC<AdminDatabaseAlertProps> = ({
  copiedSql,
  onCopySql,
  onOpenSqlModal,
  onRefresh,
}) => {
  return (
    <div className="p-6 rounded-3xl bg-amber-50 border-2 border-amber-300 text-amber-900 shadow-md">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="text-base sm:text-lg font-bold text-amber-950 font-sans">
              Tabel Database Belum Dibuat di Supabase
            </h3>
            <p className="text-xs sm:text-sm text-amber-800 mt-1 max-w-2xl leading-relaxed">
              Koneksi ke Supabase aktif, tetapi tabel{" "}
              <code className="bg-amber-100 px-1.5 py-0.5 rounded font-mono font-bold">
                public.products
              </code>{" "}
              belum ditemukan. Silakan jalankan skrip SQL di Supabase SQL Editor untuk
              membuat tabel dan hak aksesnya.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onCopySql}
            className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-sm transition-all cursor-pointer"
          >
            {copiedSql ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copiedSql ? "Tersalin!" : "Salin Skrip SQL"}</span>
          </button>
          <button
            onClick={onOpenSqlModal}
            className="px-4 py-2.5 rounded-xl bg-white hover:bg-amber-100 text-amber-900 text-xs sm:text-sm font-bold border border-amber-300 flex items-center gap-2 transition-all cursor-pointer"
          >
            <FileCode className="w-4 h-4" />
            <span>Lihat SQL</span>
          </button>
          <button
            onClick={onRefresh}
            className="px-3 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-xs sm:text-sm font-bold border border-slate-300 transition-all cursor-pointer"
            title="Cek Ulang Database"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-amber-200/80 text-xs text-amber-800 flex flex-wrap items-center gap-4">
        <span>Langkah cepat:</span>
        <a
          href="https://supabase.com/dashboard/project/bxtwyqmldikttqotcwjg/sql/new"
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold underline text-amber-900 hover:text-black inline-flex items-center gap-1"
        >
          1. Buka Supabase SQL Editor <ExternalLink className="w-3 h-3" />
        </a>
        <span>→ 2. Paste kode SQL dan klik Run</span>
        <span>→ 3. Klik tombol Segarkan di atas</span>
      </div>
    </div>
  );
};
