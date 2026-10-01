"use client";

import React, { useState } from "react";
import { KeyRound, AlertTriangle, RefreshCw } from "lucide-react";
import { updateAdminPassword } from "@/lib/supabase";

interface AdminPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (message: string) => void;
}

export const AdminPasswordModal: React.FC<AdminPasswordModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [newPasswordInput, setNewPasswordInput] = useState<string>("");
  const [confirmPasswordInput, setConfirmPasswordInput] = useState<string>("");
  const [passwordChangeError, setPasswordChangeError] = useState<string>("");
  const [actionLoading, setActionLoading] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleClose = () => {
    setPasswordChangeError("");
    setNewPasswordInput("");
    setConfirmPasswordInput("");
    onClose();
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordChangeError("");

    if (!newPasswordInput.trim()) {
      setPasswordChangeError("Kata sandi baru tidak boleh kosong.");
      return;
    }
    if (newPasswordInput.length < 4) {
      setPasswordChangeError("Kata sandi minimal 4 karakter.");
      return;
    }
    if (newPasswordInput !== confirmPasswordInput) {
      setPasswordChangeError("Konfirmasi kata sandi tidak cocok.");
      return;
    }

    setActionLoading(true);
    try {
      const res = await updateAdminPassword(newPasswordInput);
      if (res.success) {
        onSuccess("Kata sandi admin berhasil diperbarui di database!");
        handleClose();
      } else {
        setPasswordChangeError(res.error || "Gagal mengubah kata sandi.");
      }
    } catch {
      setPasswordChangeError("Terjadi kendala saat menghubungi database.");
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#008276]/10 text-[#008276] flex items-center justify-center">
              <KeyRound className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-[#0a2642] font-sans">
                Ganti Kata Sandi Admin
              </h3>
              <p className="text-xs text-slate-500">
                Tersimpan langsung di database Supabase
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleChangePassword} className="p-6 space-y-4 text-xs sm:text-sm">
          {passwordChangeError && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{passwordChangeError}</span>
            </div>
          )}

          <div>
            <label className="block font-bold text-slate-700 mb-1.5">
              Kata Sandi Baru <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              required
              value={newPasswordInput}
              onChange={(e) => setNewPasswordInput(e.target.value)}
              placeholder="Masukkan kata sandi baru (min. 4 karakter)"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#008276] focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1.5">
              Ulangi Kata Sandi Baru <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              required
              value={confirmPasswordInput}
              onChange={(e) => setConfirmPasswordInput(e.target.value)}
              placeholder="Ketik ulang kata sandi baru..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#008276] focus:outline-hidden"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={actionLoading}
              className="px-5 py-2.5 rounded-xl bg-[#008276] hover:bg-[#006e64] disabled:opacity-50 text-white font-bold shadow-md transition-all cursor-pointer flex items-center gap-2"
            >
              {actionLoading && <RefreshCw className="w-4 h-4 animate-spin" />}
              <span>Simpan ke Database</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
