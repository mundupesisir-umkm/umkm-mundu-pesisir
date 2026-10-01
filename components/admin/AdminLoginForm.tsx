"use client";

import React, { useState } from "react";
import Link from "next/link";
import { KeyRound, AlertTriangle, RefreshCw } from "lucide-react";
import { verifyAdminPassword } from "@/lib/supabase";

interface AdminLoginFormProps {
  onSuccess: () => void;
}

export const AdminLoginForm: React.FC<AdminLoginFormProps> = ({ onSuccess }) => {
  const [pinInput, setPinInput] = useState<string>("");
  const [authError, setAuthError] = useState<string>("");
  const [loginLoading, setLoginLoading] = useState<boolean>(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setAuthError("");

    try {
      const res = await verifyAdminPassword(pinInput);
      if (res.success) {
        sessionStorage.setItem("umkm_admin_auth", "true");
        onSuccess();
      } else {
        setAuthError(
          res.error ||
            "Kata sandi yang Anda masukkan salah. Silakan periksa kembali."
        );
      }
    } catch {
      setAuthError("Terjadi kendala saat memeriksa kata sandi.");
    } finally {
      setLoginLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-linear-to-br from-slate-100 via-[#f0f9f8] to-slate-200">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl shadow-slate-200/80 border border-slate-200 p-8 sm:p-10 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-2 bg-linear-to-r from-[#008276] via-[#00a896] to-[#0a2642]" />

        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-[#008276]/10 text-[#008276] flex items-center justify-center mx-auto mb-4 border border-[#008276]/20">
            <KeyRound className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-extrabold text-[#0a2642] font-sans">
            Portal Admin UMKM
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Desa Mundu Pesisir - Manajemen Katalog Produk
          </p>
        </div>

        {authError && (
          <div className="mb-6 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{authError}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label
              htmlFor="admin-pin"
              className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
            >
              Masukkan PIN / Kata Sandi Akses
            </label>
            <input
              id="admin-pin"
              type="password"
              required
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-2xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#008276]/30 focus:border-[#008276] transition-all font-mono"
            />
          </div>

          <button
            type="submit"
            disabled={loginLoading}
            className="w-full py-3.5 px-6 rounded-2xl bg-[#008276] hover:bg-[#006e64] text-white text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {loginLoading ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              "Masuk ke Dashboard"
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
          <Link
            href="/"
            className="text-xs font-semibold text-[#008276] hover:underline"
          >
            ← Kembali ke Website Utama
          </Link>
        </div>
      </div>
    </div>
  );
};
