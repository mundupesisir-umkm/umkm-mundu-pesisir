"use client";

import React from "react";
import { UploadCloud, RefreshCw } from "lucide-react";
import { ProductItem } from "@/constants/products";
import { formatRupiah } from "@/lib/supabase";

export interface ProductFormData {
  name: string;
  categoryLabel: string;
  categoryKey: "siwang" | "seafood";
  price: number;
  phone: string;
  image: string;
  badge: string;
  description: string;
  composition: string;
  shelfLife: string;
  packaging: string;
}

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingProduct: ProductItem | null;
  formData: ProductFormData;
  setFormData: React.Dispatch<React.SetStateAction<ProductFormData>>;
  actionLoading: boolean;
  onImageFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const ProductFormModal: React.FC<ProductFormModalProps> = ({
  isOpen,
  onClose,
  editingProduct,
  formData,
  setFormData,
  actionLoading,
  onImageFileChange,
  onSubmit,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-extrabold text-[#0a2642] font-sans">
              {editingProduct ? "Edit Data Produk" : "Tambah Produk Baru"}
            </h3>
            <p className="text-xs text-slate-500">
              Perubahan akan langsung tersimpan di Supabase
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={onSubmit} className="flex-1 overflow-y-auto p-6 space-y-4 text-xs sm:text-sm">
          {/* Product Name */}
          <div>
            <label className="block font-bold text-slate-700 mb-1.5">
              Nama Produk <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Contoh: Siwang Original Gurih Khas Mundu Pesisir"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#008276] focus:outline-hidden text-sm"
            />
          </div>

          {/* Row 2: Category & Label */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1.5">
                Kelompok Tab Kategori <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.categoryKey}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    categoryKey: e.target.value as "siwang" | "seafood",
                  })
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#008276] focus:outline-hidden font-medium text-slate-700"
              >
                <option value="siwang">Siwang (Sambal Siwang)</option>
                <option value="seafood">Seafood & Olahan Nelayan</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1.5">
                Label Kategori <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.categoryLabel}
                onChange={(e) => setFormData({ ...formData, categoryLabel: e.target.value })}
                placeholder="Contoh: SIWANG (TERASI BAWANG)"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#008276] focus:outline-hidden"
              />
            </div>
          </div>

          {/* Row 3: Price & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="font-bold text-slate-700">
                  Harga Produk (Rupiah) <span className="text-red-500">*</span>
                </label>
                <span className="text-[11px] text-[#008276] font-bold">
                  {formatRupiah(formData.price)}
                </span>
              </div>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-semibold text-xs pointer-events-none">
                  Rp
                </span>
                <input
                  type="number"
                  required
                  min={0}
                  step={500}
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#008276] focus:outline-hidden font-semibold text-slate-800"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1.5">
                No. WhatsApp Pengrajin <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="Contoh: 081214145254"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#008276] focus:outline-hidden font-medium"
              />
            </div>
          </div>

          {/* Row 4: Badge & Image */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1.5">
                Badge / Label Promo <span className="text-slate-400 font-normal">(Opsional)</span>
              </label>
              <input
                type="text"
                value={formData.badge}
                onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                placeholder="Contoh: Paling Laris, 100% Murni"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#008276] focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1.5">
                Foto Produk <span className="text-slate-400 font-normal">(URL / Upload)</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="/siwang-pouch.jpg"
                  className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#008276] focus:outline-hidden text-xs"
                />
                <label className="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold cursor-pointer flex items-center gap-1.5 transition-colors shrink-0 text-xs">
                  <UploadCloud className="w-4 h-4" />
                  <span>Upload</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={onImageFileChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Row 5: Description */}
          <div>
            <label className="block font-bold text-slate-700 mb-1.5">
              Deskripsi Produk <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              rows={2}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Deskripsi singkat keunggulan dan cita rasa produk..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#008276] focus:outline-hidden"
            />
          </div>

          {/* Details (Composition, Shelf Life, Packaging) */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <span className="font-bold text-[#0a2642] block text-xs uppercase tracking-wider">
              Detail Spesifikasi
            </span>

            <div>
              <label className="block text-slate-600 font-medium mb-1 text-xs">
                Komposisi Bahan
              </label>
              <input
                type="text"
                value={formData.composition}
                onChange={(e) => setFormData({ ...formData, composition: e.target.value })}
                placeholder="Bawang merah, udang rebon, rempah alami..."
                className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs focus:ring-2 focus:ring-[#008276]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-600 font-medium mb-1 text-xs">
                  Ketahanan / Masa Simpan
                </label>
                <input
                  type="text"
                  value={formData.shelfLife}
                  onChange={(e) => setFormData({ ...formData, shelfLife: e.target.value })}
                  placeholder="3 - 4 Bulan di suhu ruang."
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs focus:ring-2 focus:ring-[#008276]"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-medium mb-1 text-xs">
                  Jenis Kemasan
                </label>
                <input
                  type="text"
                  value={formData.packaging}
                  onChange={(e) => setFormData({ ...formData, packaging: e.target.value })}
                  placeholder="Standing pouch zipper kedap udara."
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs focus:ring-2 focus:ring-[#008276]"
                />
              </div>
            </div>
          </div>

          {/* Modal Footer Buttons */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={actionLoading}
              className="px-6 py-2.5 rounded-xl bg-[#008276] hover:bg-[#006e64] disabled:opacity-50 text-white font-bold shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-2"
            >
              {actionLoading && <RefreshCw className="w-4 h-4 animate-spin" />}
              <span>{editingProduct ? "Simpan Perubahan" : "Simpan Produk"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
