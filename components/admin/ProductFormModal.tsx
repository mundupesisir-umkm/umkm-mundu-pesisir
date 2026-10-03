"use client";

import React from "react";
import { UploadCloud, RefreshCw, Plus, Trash2, BookOpen, ImageIcon, HelpCircle } from "lucide-react";
import { ProductItem, ProductVariant } from "@/constants/products";
import { formatRupiah } from "@/lib/supabase";

export interface ProductFormData {
  name: string;
  categoryLabel: string;
  categoryKey: "siwang" | "seafood" | "beras" | string;
  price: number;
  phone: string;
  image: string;
  badge: string;
  description: string;
  composition: string;
  shelfLife: string;
  packaging: string;
  variants: ProductVariant[];
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
  onOpenGuideModal?: () => void;
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
  onOpenGuideModal,
}) => {
  if (!isOpen) return null;

  // Add a new empty variant row
  const handleAddVariant = () => {
    const newVariant: ProductVariant = {
      id: `variant-${Date.now()}`,
      name: "",
      price: formData.price || 15000,
      priceFormatted: formatRupiah(formData.price || 15000),
      unit: "Toples / Pack",
      description: "",
    };

    setFormData((prev) => ({
      ...prev,
      variants: [...(prev.variants || []), newVariant],
    }));
  };

  // Update a specific variant field
  const handleUpdateVariant = (
    index: number,
    field: keyof ProductVariant,
    value: string | number
  ) => {
    setFormData((prev) => {
      const nextVariants = [...(prev.variants || [])];
      const target = { ...nextVariants[index] };

      if (field === "price") {
        const numPrice = Number(value) || 0;
        target.price = numPrice;
        target.priceFormatted = formatRupiah(numPrice);
      } else {
        (target as Record<string, unknown>)[field] = value;
      }

      nextVariants[index] = target;
      return { ...prev, variants: nextVariants };
    });
  };

  // Delete a variant row
  const handleDeleteVariant = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      variants: (prev.variants || []).filter((_, i) => i !== index),
    }));
  };

  // Sync main price with lowest variant price
  const handleSyncPriceFromVariants = () => {
    if (!formData.variants || formData.variants.length === 0) return;
    const prices = formData.variants.map((v) => v.price).filter((p) => p > 0);
    if (prices.length > 0) {
      const lowestPrice = Math.min(...prices);
      setFormData((prev) => ({ ...prev, price: lowestPrice }));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-3xl max-h-[92vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="px-5 sm:px-6 py-4 sm:py-5 border-b border-slate-100 flex items-center justify-between bg-linear-to-r from-slate-50 to-white">
          <div>
            <h3 className="text-base sm:text-lg font-extrabold text-[#0a2642] font-sans">
              {editingProduct ? "Edit Data Produk UMKM" : "Tambah Produk UMKM Baru"}
            </h3>
            <p className="text-xs text-slate-500">
              Data terhubung langsung ke katalog publik dan Supabase
            </p>
          </div>
          <div className="flex items-center gap-2">
            {onOpenGuideModal && (
              <button
                type="button"
                onClick={onOpenGuideModal}
                className="px-3 py-1.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-[#006e64] border border-teal-200 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
                title="Buka panduan pengisian"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Panduan Mengisi</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer text-lg leading-none"
              aria-label="Tutup"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Modal Form */}
        <form onSubmit={onSubmit} className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5 text-xs sm:text-sm">
          {/* Guide Helper Banner */}
          {onOpenGuideModal && (
            <div className="p-3 rounded-2xl bg-teal-50/70 border border-teal-200/80 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-teal-900 text-xs">
                <HelpCircle className="w-4 h-4 text-[#008276] shrink-0" />
                <span>
                  <strong>Tip:</strong> 1 Pengrajin UMKM = 1 Kartu Utama. Masukkan berbagai ukuran / jenis olahan ke dalam tabel <strong>Varian</strong> di bawah.
                </span>
              </div>
              <button
                type="button"
                onClick={onOpenGuideModal}
                className="text-[11px] font-bold text-[#008276] hover:underline shrink-0 cursor-pointer"
              >
                Pelajari Contoh ➔
              </button>
            </div>
          )}

          {/* Section 1: Informasi Utama */}
          <div className="space-y-4">
            {/* Product Name */}
            <div>
              <label className="block font-bold text-slate-700 mb-1.5">
                Nama Produk & Pengrajin <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Contoh: Siwang & Sambal Cumi Ibu Magfiro"
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
                  onChange={(e) => {
                    const key = e.target.value;
                    let label = formData.categoryLabel;
                    if (key === "siwang" && (!label || label.includes("SEAFOOD") || label.includes("BERAS"))) {
                      label = "SIWANG & SAMBAL";
                    } else if (key === "seafood" && (!label || label.includes("SIWANG") || label.includes("BERAS"))) {
                      label = "OLAHAN IKAN & HASIL LAUT";
                    } else if (key === "beras" && (!label || label.includes("SIWANG") || label.includes("SEAFOOD"))) {
                      label = "BERAS & HASIL TANI";
                    }
                    setFormData({
                      ...formData,
                      categoryKey: key,
                      categoryLabel: label,
                    });
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#008276] focus:outline-hidden font-medium text-slate-700 bg-white"
                >
                  <option value="siwang">Siwang & Sambal Olahan</option>
                  <option value="seafood">Seafood & Olahan Hasil Laut</option>
                  <option value="beras">Beras & Pertanian</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  Label Kategori Tampilan <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.categoryLabel}
                  onChange={(e) => setFormData({ ...formData, categoryLabel: e.target.value })}
                  placeholder="Contoh: SIWANG & SAMBAL (IBU MAGFIRO)"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#008276] focus:outline-hidden"
                />
              </div>
            </div>

            {/* Row 3: Price & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="font-bold text-slate-700">
                    Harga Utama / Mulai Dari (Rupiah) <span className="text-red-500">*</span>
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
                  placeholder="Contoh: 082119882446"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#008276] focus:outline-hidden font-medium"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Format awalan 08... (otomatis dibuat link order WhatsApp ke pembeli)
                </span>
              </div>
            </div>

            {/* Row 4: Photo / Image */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="font-bold text-slate-700">
                  Foto Produk <span className="text-slate-400 font-normal">(Path / Upload)</span>
                </label>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, image: "/products/placeholder.svg" })}
                  className="text-[11px] text-[#008276] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <ImageIcon className="w-3 h-3" />
                  <span>Gunakan Placeholder Bersih</span>
                </button>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="/products/placeholder.svg"
                  className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#008276] focus:outline-hidden text-xs"
                />
                <label className="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold cursor-pointer flex items-center gap-1.5 transition-colors shrink-0 text-xs">
                  <UploadCloud className="w-4 h-4" />
                  <span>Upload Foto</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={onImageFileChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Row 5: Description */}
            <div>
              <label className="block font-bold text-slate-700 mb-1.5">
                Deskripsi Ringkas Produk <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                rows={2}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Deskripsi cita rasa, keunggulan, serta pilihan olahan pengrajin..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#008276] focus:outline-hidden"
              />
            </div>
          </div>

          {/* ========================================================= */}
          {/* SECTION 2: SUB-PRODUK / VARIAN DAFTAR (FLEXIBLE ARCHITECTURE) */}
          {/* ========================================================= */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-50/80 border border-slate-200 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-[#0a2642] text-sm uppercase tracking-wider">
                    Daftar Sub-Produk / Varian
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-[#008276]/10 text-[#008276] font-bold text-xs">
                    {(formData.variants || []).length} Varian
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Tambahkan jenis kemasan, macam olahan rasa, ukuran toples, atau perkilo/perkarung.
                </p>
              </div>

              <div className="flex items-center gap-2">
                {(formData.variants || []).length > 0 && (
                  <button
                    type="button"
                    onClick={handleSyncPriceFromVariants}
                    className="text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer"
                    title="Gunakan harga varian terendah sebagai harga acuan utama"
                  >
                    Gunakan Harga Terendah
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleAddVariant}
                  className="px-3 py-1.5 rounded-xl bg-[#008276] hover:bg-[#006e64] text-white font-bold text-xs flex items-center gap-1.5 shadow-2xs cursor-pointer transition-all"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tambah Varian</span>
                </button>
              </div>
            </div>

            {/* Variant List Table */}
            {(!formData.variants || formData.variants.length === 0) ? (
              <div className="p-6 text-center rounded-xl bg-white border border-dashed border-slate-300 text-slate-400 space-y-2">
                <p className="text-xs">
                  Belum ada sub-produk atau varian ditambahkan.
                </p>
                <button
                  type="button"
                  onClick={handleAddVariant}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-50 text-[#008276] font-bold text-xs hover:bg-teal-100 transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Klik di sini untuk menambah varian pertama</span>
                </button>
              </div>
            ) : (
              <div className="space-y-2.5">
                {formData.variants.map((variant, idx) => (
                  <div
                    key={variant.id || idx}
                    className="p-3 rounded-xl bg-white border border-slate-200 shadow-2xs grid grid-cols-1 sm:grid-cols-12 gap-2.5 items-center"
                  >
                    {/* Index & Name */}
                    <div className="sm:col-span-5 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-600 text-[11px] font-bold flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <input
                        type="text"
                        required
                        value={variant.name}
                        onChange={(e) => handleUpdateVariant(idx, "name", e.target.value)}
                        placeholder="Nama Varian (mis: Toples Kecil)"
                        className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-[#008276] focus:outline-hidden font-medium"
                      />
                    </div>

                    {/* Unit / Kemasan */}
                    <div className="sm:col-span-3">
                      <input
                        type="text"
                        value={variant.unit || ""}
                        onChange={(e) => handleUpdateVariant(idx, "unit", e.target.value)}
                        placeholder="Satuan (mis: 100gr / 1 Kg)"
                        className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-[#008276] focus:outline-hidden text-slate-600"
                      />
                    </div>

                    {/* Price (Rp) */}
                    <div className="sm:col-span-3 relative">
                      <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-[11px] font-semibold pointer-events-none">
                        Rp
                      </span>
                      <input
                        type="number"
                        required
                        min={0}
                        step={500}
                        value={variant.price}
                        onChange={(e) => handleUpdateVariant(idx, "price", e.target.value)}
                        placeholder="Harga"
                        className="w-full pl-8 pr-2 py-1.5 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-[#008276] focus:outline-hidden font-bold text-slate-800"
                      />
                    </div>

                    {/* Delete action */}
                    <div className="sm:col-span-1 flex justify-end">
                      <button
                        type="button"
                        onClick={() => handleDeleteVariant(idx)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                        title="Hapus varian ini"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section 3: Details (Composition, Shelf Life, Packaging) */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <span className="font-extrabold text-[#0a2642] block text-xs uppercase tracking-wider">
              Detail Spesifikasi & Informasi Tambahan
            </span>

            <div>
              <label className="block text-slate-600 font-medium mb-1 text-xs">
                Komposisi Bahan
              </label>
              <input
                type="text"
                value={formData.composition}
                onChange={(e) => setFormData({ ...formData, composition: e.target.value })}
                placeholder="Bahan lokal khas Desa Mundu Pesisir..."
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
                  placeholder="Contoh: 3 - 6 Bulan di suhu ruang."
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
                  placeholder="Contoh: Toples higienis / Karung beras segel."
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
