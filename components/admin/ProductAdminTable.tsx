"use client";

import React from "react";
import Image from "next/image";
import {
  Package,
  Layers,
  Database,
  Tag,
  Plus,
  Search,
  RefreshCw,
  Edit2,
  Trash2,
} from "lucide-react";
import { ProductItem } from "@/constants/products";

interface ProductStats {
  total: number;
  siwang: number;
  seafood: number;
  withBadge: number;
}

interface ProductAdminTableProps {
  products: ProductItem[];
  filteredProducts: ProductItem[];
  stats: ProductStats;
  loading: boolean;
  tableExists: boolean | null;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  categoryFilter: string;
  setCategoryFilter: (cat: string) => void;
  onRefresh: () => void;
  onOpenCreateModal: () => void;
  onOpenEditModal: (product: ProductItem) => void;
  deleteConfirmId: string | null;
  setDeleteConfirmId: (id: string | null) => void;
  onDeleteProduct: (id: string) => void;
  actionLoading: boolean;
}

export const ProductAdminTable: React.FC<ProductAdminTableProps> = ({
  filteredProducts,
  stats,
  loading,
  tableExists,
  searchQuery,
  setSearchQuery,
  categoryFilter,
  setCategoryFilter,
  onRefresh,
  onOpenCreateModal,
  onOpenEditModal,
  deleteConfirmId,
  setDeleteConfirmId,
  onDeleteProduct,
  actionLoading,
}) => {
  return (
    <div className="space-y-6">
      {/* STATS OVERVIEW CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#008276]/10 text-[#008276] flex items-center justify-center shrink-0">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Total Produk
            </span>
            <span className="text-2xl font-extrabold text-[#0a2642]">
              {stats.total}
            </span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Varian Siwang
            </span>
            <span className="text-2xl font-extrabold text-[#0a2642]">
              {stats.siwang}
            </span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center shrink-0">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Hasil Seafood
            </span>
            <span className="text-2xl font-extrabold text-[#0a2642]">
              {stats.seafood}
            </span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-rose-500/10 text-rose-600 flex items-center justify-center shrink-0">
            <Tag className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Promo / Badge
            </span>
            <span className="text-2xl font-extrabold text-[#0a2642]">
              {stats.withBadge}
            </span>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* PRODUCT MANAGEMENT HEADER & TOOLBAR                       */}
      {/* ========================================================= */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        {/* Header Action Bar */}
        <div className="p-5 sm:p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg sm:text-xl font-extrabold text-[#0a2642] font-sans">
              Katalog Produk Terdaftar
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Kelola data produk yang tampil di website publik dan terhubung langsung ke Supabase
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={onOpenCreateModal}
              disabled={tableExists === false}
              className="px-5 py-2.5 rounded-xl bg-[#008276] hover:bg-[#006e64] disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Produk Baru</span>
            </button>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="p-4 sm:p-5 bg-slate-50/60 border-b border-slate-100 flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama produk, kategori, atau deskripsi..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-[#008276]"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm font-medium text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-[#008276] w-full sm:w-auto"
            >
              <option value="all">Semua Kategori</option>
              <option value="siwang">Siwang (Terasi Bawang)</option>
              <option value="seafood">Seafood & Tangkapan Nelayan</option>
            </select>

            <button
              onClick={onRefresh}
              className="p-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer shrink-0"
              title="Segarkan Data"
            >
              <RefreshCw className={loading ? "w-4 h-4 animate-spin" : "w-4 h-4"} />
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* PRODUCT LIST TABLE / EMPTY STATE                          */}
        {/* ========================================================= */}
        {loading ? (
          <div className="p-12 text-center text-slate-500">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto text-[#008276] mb-3" />
            <p className="text-sm font-medium">Memuat data produk dari Supabase...</p>
          </div>
        ) : tableExists === false ? (
          <div className="p-12 text-center text-slate-500">
            <Database className="w-12 h-12 mx-auto text-amber-500 mb-3 opacity-80" />
            <p className="text-base font-bold text-slate-800">Tabel Belum Siap</p>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-md mx-auto">
              Silakan jalankan skrip SQL di atas agar Supabase siap menerima data produk.
            </p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            <Package className="w-12 h-12 mx-auto text-slate-300 mb-3" />
            <p className="text-base font-bold text-slate-800">Belum Ada Produk</p>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-md mx-auto">
              {searchQuery
                ? "Tidak ada produk yang cocok dengan pencarian Anda."
                : "Database Supabase kosong. Silakan klik tombol 'Tambah Produk Baru' di atas untuk mulai menginput produk."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/50 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3.5 px-4 sm:px-6">Produk</th>
                  <th className="py-3.5 px-4">Kategori</th>
                  <th className="py-3.5 px-4">Harga</th>
                  <th className="py-3.5 px-4">Badge / Promo</th>
                  <th className="py-3.5 px-4">WA Pengrajin</th>
                  <th className="py-3.5 px-4 sm:px-6 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                {filteredProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="hover:bg-slate-50/80 transition-colors"
                  >
                    {/* Name & Image */}
                    <td className="py-3.5 px-4 sm:px-6">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                          <Image
                            src={product.image || "/siwang-pouch.jpg"}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-bold text-[#0a2642] font-sans line-clamp-1">
                            {product.name}
                          </h4>
                          <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                            {product.description}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="inline-block px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-[11px] font-semibold border border-slate-200">
                        {product.categoryLabel}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="font-extrabold text-[#008276]">
                        {product.priceFormatted}
                      </span>
                    </td>

                    {/* Badge */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {product.badge ? (
                        <span className="inline-block px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-[11px] font-bold">
                          {product.badge}
                        </span>
                      ) : (
                        <span className="text-slate-400 text-xs">-</span>
                      )}
                    </td>

                    {/* Phone / WA Pengrajin */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 font-mono text-[11px]">
                        {product.phone || "6281214145254"}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 sm:px-6 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => onOpenEditModal(product)}
                          className="p-2 rounded-lg bg-slate-100 hover:bg-[#008276] hover:text-white text-slate-600 transition-colors cursor-pointer"
                          title="Edit Produk"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(product.id)}
                          className="p-2 rounded-lg bg-red-50 hover:bg-red-600 hover:text-white text-red-600 transition-colors cursor-pointer"
                          title="Hapus Produk"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* MODAL: DELETE CONFIRMATION */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl border border-slate-200 text-center">
            <div className="w-14 h-14 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 font-sans">
              Hapus Produk Ini?
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Produk yang dihapus tidak dapat dipulihkan dari Supabase.
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold hover:bg-slate-100 transition-colors cursor-pointer text-xs sm:text-sm"
              >
                Batal
              </button>
              <button
                onClick={() => onDeleteProduct(deleteConfirmId)}
                disabled={actionLoading}
                className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold shadow-md transition-colors cursor-pointer text-xs sm:text-sm"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
