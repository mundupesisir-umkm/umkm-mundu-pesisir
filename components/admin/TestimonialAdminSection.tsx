"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  MessageSquareHeart,
  Plus,
  Edit2,
  Trash2,
  Search,
  Star,
  MapPin,
  Calendar,
  AlertTriangle,
  RefreshCw,
  Award,
  Sparkles,
  Quote,
} from "lucide-react";
import {
  fetchTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  checkTestimonialsTable,
} from "@/lib/supabase";
import { TestimonialItem } from "@/constants/testimonials";

interface TestimonialAdminSectionProps {
  onShowToast: (msg: string) => void;
  onOpenSqlModal: () => void;
}

export const TestimonialAdminSection: React.FC<TestimonialAdminSectionProps> = ({
  onShowToast,
  onOpenSqlModal,
}) => {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [tableExists, setTableExists] = useState<boolean | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<TestimonialItem | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    location: "Cirebon, Jawa Barat",
    rating: 5,
    productTag: "Siwang Gurih Rebon",
    date: new Date().toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
    review: "",
    hasWatermark: false,
  });

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const check = await checkTestimonialsTable();
      setTableExists(check.exists);

      if (!check.exists) {
        setTestimonials([]);
        setLoading(false);
        return;
      }

      const res = await fetchTestimonials();
      if (!res.error) {
        setTestimonials(res.data || []);
      } else {
        onShowToast(`Gagal memuat testimoni: ${res.error}`);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal memuat ulasan";
      onShowToast(msg);
    } finally {
      setLoading(false);
    }
  }, [onShowToast]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Open Add Modal
  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      name: "",
      location: "Cirebon, Jawa Barat",
      rating: 5,
      productTag: "Siwang Gurih Rebon",
      date: new Date().toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      review: "",
      hasWatermark: false,
    });
    setIsModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (item: TestimonialItem) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      location: item.location,
      rating: item.rating,
      productTag: item.productTag || "",
      date: item.date || "",
      review: item.review,
      hasWatermark: Boolean(item.hasWatermark),
    });
    setIsModalOpen(true);
  };

  // Submit Add / Edit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.review.trim()) {
      alert("Nama pembeli dan isi testimoni wajib diisi!");
      return;
    }

    setActionLoading(true);
    try {
      if (editingItem) {
        const res = await updateTestimonial(editingItem.id, {
          name: formData.name.trim(),
          location: formData.location.trim(),
          rating: Number(formData.rating),
          productTag: formData.productTag.trim() || undefined,
          date: formData.date.trim() || undefined,
          review: formData.review.trim(),
          hasWatermark: formData.hasWatermark,
        });

        if (res.error) {
          alert(`Gagal memperbarui testimoni: ${res.error}`);
        } else {
          onShowToast(`Ulasan dari "${formData.name}" berhasil diperbarui!`);
          setIsModalOpen(false);
          await loadData();
        }
      } else {
        const res = await createTestimonial({
          name: formData.name.trim(),
          location: formData.location.trim(),
          rating: Number(formData.rating),
          productTag: formData.productTag.trim() || undefined,
          date: formData.date.trim() || undefined,
          review: formData.review.trim(),
          hasWatermark: formData.hasWatermark,
        });

        if (res.error) {
          alert(`Gagal menambahkan testimoni: ${res.error}`);
        } else {
          onShowToast(`Ulasan dari "${formData.name}" berhasil ditambahkan!`);
          setIsModalOpen(false);
          await loadData();
        }
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Terjadi kesalahan";
      alert(msg);
    } finally {
      setActionLoading(false);
    }
  };

  // Delete Handler
  const handleDelete = async (id: string) => {
    setActionLoading(true);
    try {
      const res = await deleteTestimonial(id);
      if (res.error) {
        alert(`Gagal menghapus testimoni: ${res.error}`);
      } else {
        onShowToast("Testimoni berhasil dihapus dari database!");
        setDeleteConfirmId(null);
        await loadData();
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Terjadi kesalahan";
      alert(msg);
    } finally {
      setActionLoading(false);
    }
  };

  // Filtered Testimonials
  const filteredTestimonials = useMemo(() => {
    if (!searchQuery.trim()) return testimonials;
    const q = searchQuery.toLowerCase();
    return testimonials.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.location.toLowerCase().includes(q) ||
        t.review.toLowerCase().includes(q) ||
        t.productTag?.toLowerCase().includes(q)
    );
  }, [testimonials, searchQuery]);

  // Statistics
  const stats = useMemo(() => {
    const total = testimonials.length;
    const fiveStar = testimonials.filter((t) => t.rating >= 5).length;
    const withTag = testimonials.filter((t) => Boolean(t.productTag)).length;
    return { total, fiveStar, withTag };
  }, [testimonials]);

  return (
    <div className="space-y-6">
      {/* Alert if testimonials table not created yet in Supabase */}
      {tableExists === false && (
        <div className="p-6 rounded-2xl bg-amber-50 border-2 border-amber-300 text-amber-900 shadow-md">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-extrabold text-base text-[#0a2642]">
                  Tabel &quot;testimonials&quot; Belum Dibuat di Database Supabase
                </h3>
                <p className="text-xs sm:text-sm text-amber-800 mt-1 leading-relaxed">
                  Supabase belum mendeteksi tabel testimoni. Silakan jalankan query SQL
                  yang telah disediakan melalui Supabase SQL Editor agar ulasan tersimpan
                  ke database.
                </p>
              </div>
            </div>
            <button
              onClick={onOpenSqlModal}
              className="px-5 py-2.5 rounded-xl bg-[#008276] hover:bg-[#006e64] text-white font-bold text-xs sm:text-sm shadow-md transition-all shrink-0 cursor-pointer"
            >
              Lihat Skrip SQL Supabase
            </button>
          </div>
        </div>
      )}

      {/* STATS OVERVIEW CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
              Total Testimoni
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-[#0a2642] font-sans mt-1 block">
              {stats.total}
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-teal-50 text-[#008276] flex items-center justify-center">
            <MessageSquareHeart className="w-6 h-6" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
              Bintang 5 (Puas)
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-amber-600 font-sans mt-1 block">
              {stats.fiveStar}
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Star className="w-6 h-6 fill-amber-500" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
              Ulasan dengan Tag Produk
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-blue-600 font-sans mt-1 block">
              {stats.withTag}
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* ACTION BAR: SEARCH & ADD BUTTON */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama pembeli, kota, tag produk, atau isi ulasan..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-[#008276]/30 focus:border-[#008276] transition-all"
          />
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={loadData}
            disabled={loading}
            className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors cursor-pointer"
            title="Muat Ulang Data"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>

          <button
            onClick={handleOpenAdd}
            className="px-4 sm:px-5 py-2.5 rounded-xl bg-[#008276] hover:bg-[#006e64] text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-sm hover:shadow-md transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Testimoni</span>
          </button>
        </div>
      </div>

      {/* TABLE / LIST OF TESTIMONIALS */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-500 text-xs sm:text-sm flex flex-col items-center gap-2">
            <RefreshCw className="w-6 h-6 animate-spin text-[#008276]" />
            <span>Memuat data ulasan dari Supabase...</span>
          </div>
        ) : filteredTestimonials.length === 0 ? (
          <div className="p-14 text-center">
            <MessageSquareHeart className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">
              {testimonials.length === 0
                ? "Belum Ada Testimoni di Database"
                : "Tidak Ada Ulasan yang Cocok"}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-sm mx-auto">
              {testimonials.length === 0
                ? "Tambahkan ulasan pembeli baru untuk ditampilkan di beranda dan halaman ulasan."
                : `Tidak ditemukan ulasan yang cocok dengan kata kunci "${searchQuery}".`}
            </p>
            {testimonials.length === 0 && (
              <button
                onClick={handleOpenAdd}
                className="mt-4 px-4 py-2 rounded-xl bg-[#008276] text-white text-xs font-bold hover:bg-[#006e64] transition-colors cursor-pointer"
              >
                + Tambah Testimoni Pertama
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/80 text-slate-600 font-bold text-[11px] uppercase tracking-wider">
                  <th className="py-3 px-4">Pembeli</th>
                  <th className="py-3 px-4">Rating & Produk</th>
                  <th className="py-3 px-4">Isi Testimoni</th>
                  <th className="py-3 px-4">Tanggal</th>
                  <th className="py-3 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredTestimonials.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                    {/* Pembeli & Kota */}
                    <td className="py-3.5 px-4 align-top">
                      <div className="flex items-start gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-teal-50 text-[#008276] font-bold flex items-center justify-center shrink-0 border border-teal-100">
                          {item.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <span className="font-bold text-[#0a2642] block">
                            {item.name}
                          </span>
                          <span className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                            <span>{item.location}</span>
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Rating & Product Tag */}
                    <td className="py-3.5 px-4 align-top whitespace-nowrap">
                      <div className="flex items-center gap-1 text-amber-500">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < item.rating
                                ? "fill-amber-400 text-amber-400"
                                : "text-slate-300"
                            }`}
                          />
                        ))}
                      </div>
                      {item.productTag && (
                        <span className="inline-block mt-1 px-2.5 py-0.5 rounded-lg bg-teal-50 text-[#008276] text-[10px] font-bold border border-teal-100">
                          {item.productTag}
                        </span>
                      )}
                    </td>

                    {/* Isi Testimoni */}
                    <td className="py-3.5 px-4 align-top max-w-md">
                      <p className="text-slate-700 text-xs leading-relaxed line-clamp-3">
                        {item.review}
                      </p>
                    </td>

                    {/* Tanggal */}
                    <td className="py-3.5 px-4 align-top whitespace-nowrap text-[11px] text-slate-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        <span>{item.date || "-"}</span>
                      </div>
                    </td>

                    {/* Aksi */}
                    <td className="py-3.5 px-4 align-top text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenEdit(item)}
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
                          title="Edit Testimoni"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(item.id)}
                          className="p-1.5 rounded-lg bg-red-50 hover:bg-red-600 hover:text-white text-red-600 transition-colors cursor-pointer"
                          title="Hapus Testimoni"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
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

      {/* ================================================================= */}
      {/* MODAL: ADD / EDIT TESTIMONIAL                                     */}
      {/* ================================================================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-base sm:text-lg font-extrabold text-[#0a2642] font-sans">
                  {editingItem ? "Edit Ulasan Testimoni" : "Tambah Testimoni Baru"}
                </h3>
                <p className="text-xs text-slate-500">
                  Data akan langsung tersimpan di Supabase
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4 text-xs sm:text-sm">
              {/* Nama Pembeli */}
              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  Nama Pembeli <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Contoh: Raden Whisnu Arya Nugraha"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#008276] focus:outline-hidden text-sm"
                />
              </div>

              {/* Kota / Lokasi */}
              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  Kota / Wilayah Asal <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Contoh: Bekasi, Jawa Barat atau Jakarta Selatan"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#008276] focus:outline-hidden text-sm"
                />
              </div>

              {/* Rating Bintang & Tag Produk */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">
                    Rating Kepuasan <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center gap-1.5 p-2 rounded-xl border border-slate-200 bg-slate-50">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFormData({ ...formData, rating: star })}
                        className="cursor-pointer focus:outline-hidden"
                      >
                        <Star
                          className={`w-5 h-5 ${
                            star <= formData.rating
                              ? "fill-amber-400 text-amber-400"
                              : "text-slate-300"
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-bold text-slate-700 ml-1">
                      {formData.rating} / 5
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">
                    Tag Produk <span className="text-slate-400 font-normal">(Opsional)</span>
                  </label>
                  <input
                    type="text"
                    value={formData.productTag}
                    onChange={(e) => setFormData({ ...formData, productTag: e.target.value })}
                    placeholder="Contoh: Siwang Gurih Rebon"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#008276] focus:outline-hidden text-sm"
                  />
                </div>
              </div>

              {/* Tanggal */}
              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  Tanggal Ulasan
                </label>
                <input
                  type="text"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  placeholder="Contoh: 12 September 2026"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#008276] focus:outline-hidden text-sm"
                />
              </div>

              {/* Isi Ulasan */}
              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  Isi Ulasan Testimoni <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.review}
                  onChange={(e) => setFormData({ ...formData, review: e.target.value })}
                  placeholder="Ceritakan pengalaman kepuasan pembeli tentang rasa, kerenyahan, keaslian bahan, pengemasan, dll..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#008276] focus:outline-hidden text-sm leading-relaxed"
                />
              </div>

              {/* Modal Actions */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-5 py-2.5 rounded-xl bg-[#008276] hover:bg-[#006e64] disabled:opacity-50 text-white font-bold shadow-md transition-all cursor-pointer flex items-center gap-2"
                >
                  {actionLoading && <RefreshCw className="w-4 h-4 animate-spin" />}
                  <span>{editingItem ? "Simpan Perubahan" : "Tambah Testimoni"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================================================================= */}
      {/* MODAL: DELETE CONFIRMATION                                        */}
      {/* ================================================================= */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-sm w-full p-6 text-center">
            <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-6 h-6" />
            </div>
            <h4 className="font-extrabold text-base text-[#0a2642]">
              Hapus Testimoni Ini?
            </h4>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Tindakan ini tidak dapat dibatalkan. Ulasan akan dihapus permanen
              dari database Supabase.
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 text-xs transition-colors cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                disabled={actionLoading}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
              >
                {actionLoading ? "Menghapus..." : "Ya, Hapus"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
