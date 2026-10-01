"use client";

import React from "react";
import { FileCode, Copy, Check } from "lucide-react";
import { SUPABASE_SQL_SCHEMA } from "@/lib/supabase";

interface AdminSqlSchemaModalProps {
  isOpen: boolean;
  onClose: () => void;
  copiedSql: boolean;
  onCopySql: () => void;
}

export const AdminSqlSchemaModal: React.FC<AdminSqlSchemaModalProps> = ({
  isOpen,
  onClose,
  copiedSql,
  onCopySql,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-slate-900 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 max-w-3xl w-full max-h-[85vh] flex flex-col overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileCode className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-white font-sans text-sm sm:text-base">
              Skrip SQL Supabase untuk UMKM Mundu Pesisir
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-950 font-mono text-xs text-slate-300 leading-relaxed whitespace-pre">
          {SUPABASE_SQL_SCHEMA}
        </div>

        <div className="px-6 py-4 border-t border-slate-800 flex items-center justify-between gap-3 bg-slate-900">
          <span className="text-xs text-slate-400">
            Jalankan di Supabase Dashboard &gt; SQL Editor
          </span>
          <button
            onClick={onCopySql}
            className="px-5 py-2.5 rounded-xl bg-[#008276] hover:bg-[#00a896] text-white font-bold text-xs sm:text-sm flex items-center gap-2 cursor-pointer shadow-md"
          >
            {copiedSql ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copiedSql ? "Tersalin!" : "Salin Seluruh SQL"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
