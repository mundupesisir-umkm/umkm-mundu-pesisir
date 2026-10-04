"use client";

import React, { useState } from "react";
import {
  FolderPlus,
  Tag,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Plus,
  Layers,
  Sparkles,
} from "lucide-react";
import {
  ProductCategoryItem,
  saveProductCategories,
  slugifyCategory,
} from "@/lib/supabase";
import { ProductItem } from "@/constants/products";

interface CategoryManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: ProductCategoryItem[];
  products: ProductItem[];
  onCategoriesUpdated: (newCategories: ProductCategoryItem[]) => void;
  onShowToast: (msg: string) => void;
}

export const CategoryManagerModal: React.FC<CategoryManagerModalProps> = ({
  isOpen,
  onClose,
  categories,
  products,
  onCategoriesUpdated,
  onShowToast,
}) => {
  const [newLabel, setNewLabel] = useState("");
  const [newKey, setNewKey] = useState("");
  const [isManualKey, setIsManualKey] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleLabelChange = (val: string) => {
    setNewLabel(val);
    if (!isManualKey) {
      setNewKey(slugifyCategory(val));
    }
  };

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanLabel = newLabel.trim();
    const cleanKey = (newKey.trim() || slugifyCategory(cleanLabel)).toLowerCase();

    if (!cleanLabel) {
      alert("Nama kategori tidak boleh kosong!");
      return;
    }
    if (!cleanKey) {
      alert("Kunci/Slug kategori tidak valid!");
      return;
    }

    if (categories.some((c) => c.id === cleanKey)) {
      alert(`Kategori dengan kunci "${cleanKey}" sudah ada! Gunakan nama atau kunci yang berbeda.`);
      return;
    }

    const newItem: ProductCategoryItem = {
      id: cleanKey,
      label: cleanLabel,
      isDefault: false,
    };

    const nextList = [...categories, newItem];
    setIsSubmitting(true);
    try {
      const res = await saveProductCategories(nextList);
      if (res.success) {
        onCategoriesUpdated(nextList);
        onShowToast(`Kategori "${cleanLabel}" berhasil ditambahkan!`);
        setNewLabel("");
        setNewKey("");
        setIsManualKey(false);
      } else {
        alert(`Gagal menyimpan ke database: ${res.error}`);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Terjadi kesalahan";
      alert(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteCategory = async (catId: string) => {
    const productCount = products.filter((p) => p.categoryKey === catId).length;
    if (productCount > 0) {
      alert(
        `Kategori ini masih digunakan oleh ${productCount} produk! Pindahkan produk ke kategori lain sebelum menghapus.`
      );
      setDeleteConfirmId(null);
      return;
    }

    const nextList = categories.filter((c) => c.id !== catId);
    setIsSubmitting(true);
    try {
      const res = await saveProductCategories(nextList);
      if (res.success) {
        onCategoriesUpdated(nextList);
        onShowToast("Kategori berhasil dihapus!");
        setDeleteConfirmId(null);
      } else {
        alert(`Gagal menghapus: ${res.error}`);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Terjadi kesalahan";
      alert(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-2xl max-h-[92vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-5 sm:px-6 py-4 sm:py-5 border-b border-slate-100 flex items-center justify-between bg-linear-to-r from-teal-50/50 to-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#008276]/10 text-[#008276] flex items-center justify-center shrink-0">
              <FolderPlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-extrabold text-[#0a2642] font-sans">
                Kelola Kelompok Tab Kategori
              </h3>
              <p className="text-xs text-slate-500">
                Kategori ini akan muncul sebagai tab filter pada Katalog Publik &amp; Form Input
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer text-lg leading-none"
            aria-label="Tutup"
          >
            ✕
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* Add Category Form */}
          <form
            onSubmit={handleAddCategory}
            className="p-4 sm:p-5 rounded-2xl bg-teal-50/60 border border-teal-200/80 space-y-3.5"
          >
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#006e64]">
              <Sparkles className="w-3.5 h-3.5 text-[#008276]" />
              <span>Tambah Kelompok Kategori Baru</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nama Kategori / Tab Tampilan <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newLabel}
                  onChange={(e) => handleLabelChange(e.target.value)}
                  placeholder="Contoh: Kerajinan Tangan Pesisir"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-teal-200 bg-white text-xs sm:text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#008276]"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-slate-700">
                    Slug / Kunci Kategori <span className="text-red-500">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsManualKey(!isManualKey)}
                    className="text-[10px] text-[#008276] hover:underline font-semibold"
                  >
                    {isManualKey ? "Auto Slug" : "Edit Manual"}
                  </button>
                </div>
                <input
                  type="text"
                  required
                  value={newKey}
                  readOnly={!isManualKey}
                  onChange={(e) => {
                    setIsManualKey(true);
                    setNewKey(slugifyCategory(e.target.value));
                  }}
                  placeholder="otomatis dari nama kategori"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-teal-200 bg-white text-xs sm:text-sm font-mono text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#008276]"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-[11px] text-slate-500">
                Tab ini akan otomatis muncul di filter katalog setelah produk dimasukkan.
              </span>
              <button
                type="submit"
                disabled={isSubmitting || !newLabel.trim()}
                className="px-4 py-2 rounded-xl bg-[#008276] hover:bg-[#006e64] disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Simpan Kategori</span>
              </button>
            </div>
          </form>

          {/* Existing Categories List */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                <span>Daftar Kategori Aktif ({categories.length})</span>
              </h4>
              <span className="text-[11px] text-slate-400">
                Default tidak dapat dihapus untuk menjaga keutuhan data awal
              </span>
            </div>

            <div className="divide-y divide-slate-100 rounded-2xl border border-slate-200 bg-white overflow-hidden">
              {categories.map((cat) => {
                const productCount = products.filter((p) => p.categoryKey === cat.id).length;
                const isDefault = cat.isDefault || ["siwang", "seafood", "beras"].includes(cat.id);

                return (
                  <div
                    key={cat.id}
                    className="p-3.5 sm:p-4 flex items-center justify-between gap-3 hover:bg-slate-50/60 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-xs shrink-0">
                        <Tag className="w-4 h-4 text-[#008276]" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs sm:text-sm font-bold text-[#0a2642]">
                            {cat.label}
                          </span>
                          {isDefault ? (
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200">
                              Bawaan Desa
                            </span>
                          ) : (
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-teal-50 text-[#008276] border border-teal-200">
                              Kategori Kustom
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                          slug: <span className="text-slate-600 font-bold">{cat.id}</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                        {productCount} Produk
                      </span>

                      {!isDefault && (
                        <div>
                          {deleteConfirmId === cat.id ? (
                            <div className="flex items-center gap-1.5 animate-in fade-in">
                              <button
                                type="button"
                                onClick={() => handleDeleteCategory(cat.id)}
                                disabled={isSubmitting}
                                className="px-2.5 py-1 rounded-lg bg-red-600 text-white text-xs font-bold hover:bg-red-700 cursor-pointer"
                              >
                                Ya, Hapus
                              </button>
                              <button
                                type="button"
                                onClick={() => setDeleteConfirmId(null)}
                                className="px-2 py-1 rounded-lg bg-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-300 cursor-pointer"
                              >
                                Batal
                              </button>
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={() => setDeleteConfirmId(cat.id)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                              title="Hapus Kategori"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 sm:px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Perubahan langsung tersimpan di cloud Supabase.
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold transition-colors cursor-pointer"
          >
            Selesai
          </button>
        </div>
      </div>
    </div>
  );
};
