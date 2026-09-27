"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Package,
  Plus,
  Edit2,
  Trash2,
  Search,
  ExternalLink,
  LogOut,
  KeyRound,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Copy,
  Check,
  Eye,
  Database,
  Tag,
  Clock,
  ShieldCheck,
  Layers,
  ArrowUpDown,
  UploadCloud,
  FileCode,
  MessageSquareHeart,
} from "lucide-react";
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  checkProductsTable,
  uploadProductImage,
  formatRupiah,
  SUPABASE_SQL_SCHEMA,
  verifyAdminPassword,
  updateAdminPassword,
} from "@/lib/supabase";
import { ProductItem } from "@/constants/products";
import { TestimonialAdminSection } from "@/components/admin/TestimonialAdminSection";
import { cn } from "@/lib";

// Default admin access PIN (can be overridden by NEXT_PUBLIC_ADMIN_PIN)
const ADMIN_PIN = process.env.NEXT_PUBLIC_ADMIN_PIN || "adminmundu";

export default function AdminPage() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [pinInput, setPinInput] = useState<string>("");
  const [authError, setAuthError] = useState<string>("");
  const [loginLoading, setLoginLoading] = useState<boolean>(false);

  // Change Password Modal State
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState<boolean>(false);
  const [newPasswordInput, setNewPasswordInput] = useState<string>("");
  const [confirmPasswordInput, setConfirmPasswordInput] = useState<string>("");
  const [passwordChangeError, setPasswordChangeError] = useState<string>("");

  // Active Tab
  const [adminTab, setAdminTab] = useState<"products" | "testimonials">("products");

  // Data & Supabase Status
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [actionLoading, setActionLoading] = useState<boolean>(false);
  const [tableExists, setTableExists] = useState<boolean | null>(null);
  const [tableErrorMsg, setTableErrorMsg] = useState<string>("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copiedSql, setCopiedSql] = useState<boolean>(false);

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [showSqlModal, setShowSqlModal] = useState<boolean>(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    categoryLabel: "SIWANG (TERASI BAWANG)",
    categoryKey: "siwang" as "siwang" | "seafood",
    price: 25000,
    phone: "081214145254",
    image: "/siwang-pouch.jpg",
    badge: "",
    description: "",
    composition: "",
    shelfLife: "3 - 4 Bulan di suhu ruang.",
    packaging: "Standing pouch zipper tebal kedap udara.",
  });

  // Check existing session
  useEffect(() => {
    const savedAuth = sessionStorage.getItem("umkm_admin_auth");
    if (savedAuth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Verify Supabase Table & Fetch Data
  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const check = await checkProductsTable();
      setTableExists(check.exists);
      if (!check.exists) {
        setTableErrorMsg(
          check.message || "Tabel 'products' belum ditemukan di database Supabase."
        );
        setProducts([]);
        setLoading(false);
        return;
      }

      setTableErrorMsg("");
      const res = await fetchProducts();
      if (!res.error) {
        setProducts(res.data);
      } else {
        showToast(`Gagal memuat produk: ${res.error}`);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal memuat data";
      setTableErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated, loadData]);

  // Auth Handler with Supabase Database
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pinInput.trim()) {
      setAuthError("Silakan masukkan kata sandi.");
      return;
    }
    setLoginLoading(true);
    setAuthError("");
    try {
      const res = await verifyAdminPassword(pinInput);
      if (res.success) {
        setIsAuthenticated(true);
        sessionStorage.setItem("umkm_admin_auth", "true");
        setAuthError("");
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

  const handleLogout = () => {
    sessionStorage.removeItem("umkm_admin_auth");
    setIsAuthenticated(false);
    setPinInput("");
  };

  // Change Password in Supabase Database
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
        showToast("Kata sandi admin berhasil diperbarui di database!");
        setIsPasswordModalOpen(false);
        setNewPasswordInput("");
        setConfirmPasswordInput("");
      } else {
        setPasswordChangeError(res.error || "Gagal mengubah kata sandi.");
      }
    } catch {
      setPasswordChangeError("Terjadi kendala saat menghubungi database.");
    } finally {
      setActionLoading(false);
    }
  };

  // Copy SQL Schema
  const handleCopySql = () => {
    navigator.clipboard.writeText(SUPABASE_SQL_SCHEMA);
    setCopiedSql(true);
    showToast("Kode SQL berhasil disalin ke clipboard!");
    setTimeout(() => setCopiedSql(false), 2500);
  };


  // Open modal for Create
  const handleOpenCreateModal = () => {
    setEditingProduct(null);
    setFormData({
      name: "",
      categoryLabel: "SIWANG (TERASI BAWANG)",
      categoryKey: "siwang",
      price: 25000,
      phone: "081214145254",
      image: "/siwang-pouch.jpg",
      badge: "",
      description: "",
      composition: "Bawang merah Cirebon, terasi udang rebon asli Mundu Pesisir, rempah alami.",
      shelfLife: "3 - 4 Bulan di suhu ruang.",
      packaging: "Standing pouch zipper tebal kedap udara.",
    });
    setIsModalOpen(true);
  };

  // Open modal for Edit
  const handleOpenEditModal = (product: ProductItem) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      categoryLabel: product.categoryLabel,
      categoryKey: (product.categoryKey as "siwang" | "seafood") || "siwang",
      price: product.price,
      phone: product.phone || "081214145254",
      image: product.image,
      badge: product.badge || "",
      description: product.description,
      composition: product.details?.composition || "",
      shelfLife: product.details?.shelfLife || "",
      packaging: product.details?.packaging || "",
    });
    setIsModalOpen(true);
  };

  // Handle Form Submit (Create or Update)
  const handleSubmitProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert("Nama produk tidak boleh kosong!");
      return;
    }

    setActionLoading(true);
    try {
      const productPayload = {
        name: formData.name.trim(),
        categoryLabel: formData.categoryLabel.trim(),
        categoryKey: formData.categoryKey,
        price: Number(formData.price),
        priceFormatted: formatRupiah(Number(formData.price)),
        phone: formData.phone.trim() || undefined,
        image: formData.image.trim() || "/siwang-pouch.jpg",
        badge: formData.badge.trim() || undefined,
        description: formData.description.trim(),
        details: {
          composition: formData.composition.trim(),
          shelfLife: formData.shelfLife.trim(),
          packaging: formData.packaging.trim(),
        },
      };

      if (editingProduct) {
        const res = await updateProduct(editingProduct.id, productPayload);
        if (res.error) {
          alert(`Gagal memperbarui produk: ${res.error}`);
        } else {
          showToast(`Produk "${formData.name}" berhasil diperbarui!`);
          setIsModalOpen(false);
          await loadData();
        }
      } else {
        const res = await createProduct(productPayload);
        if (res.error) {
          alert(`Gagal menambahkan produk: ${res.error}`);
        } else {
          showToast(`Produk "${formData.name}" berhasil ditambahkan!`);
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

  // Handle Delete
  const handleDeleteProduct = async (id: string) => {
    setActionLoading(true);
    try {
      const res = await deleteProduct(id);
      if (res.error) {
        alert(`Gagal menghapus produk: ${res.error}`);
      } else {
        showToast("Produk berhasil dihapus dari database!");
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

  // Image Upload helper
  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setActionLoading(true);
    try {
      const res = await uploadProductImage(file);
      if (res.url) {
        setFormData((prev) => ({ ...prev, image: res.url! }));
        showToast("Foto produk berhasil dipilih!");
      } else if (res.error) {
        showToast(`Catatan: ${res.error}`);
      }
    } catch {
      showToast("Gagal memproses gambar.");
    } finally {
      setActionLoading(false);
    }
  };

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCat =
        categoryFilter === "all" || p.categoryKey === categoryFilter;
      return matchesSearch && matchesCat;
    });
  }, [products, searchQuery, categoryFilter]);

  // Statistics
  const stats = useMemo(() => {
    const total = products.length;
    const siwang = products.filter((p) => p.categoryKey === "siwang").length;
    const seafood = products.filter((p) => p.categoryKey === "seafood").length;
    const withBadge = products.filter((p) => Boolean(p.badge)).length;
    return { total, siwang, seafood, withBadge };
  }, [products]);

  // =========================================================================
  // VIEW: LOGIN SCREEN (if not authenticated)
  // =========================================================================
  if (!isAuthenticated) {
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

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label
                htmlFor="pin"
                className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2"
              >
                Kata Sandi Admin
              </label>
              <input
                id="pin"
                type="password"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Masukkan kata sandi..."
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#008276] focus:border-transparent text-sm transition-all"
                autoFocus
              />
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-3.5 px-4 rounded-xl bg-[#008276] hover:bg-[#006e64] disabled:opacity-50 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              {loginLoading && <RefreshCw className="w-4 h-4 animate-spin" />}
              <span>{loginLoading ? "Memeriksa Sandi..." : "Masuk ke Dashboard"}</span>
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <Link
              href="/"
              className="text-xs text-slate-500 hover:text-[#008276] font-medium inline-flex items-center gap-1 transition-colors"
            >
              <span>← Kembali ke Website Publik</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW: AUTHENTICATED ADMIN DASHBOARD
  // =========================================================================
  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0a2642] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-slate-700 text-xs sm:text-sm animate-in fade-in slide-in-from-bottom-4">
          <CheckCircle2 className="w-4 h-4 text-[#00c853] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

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
              onClick={() => {
                setPasswordChangeError("");
                setNewPasswordInput("");
                setConfirmPasswordInput("");
                setIsPasswordModalOpen(true);
              }}
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
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Keluar</span>
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* ========================================================= */}
        {/* DATABASE SETUP ALERT (If Table products does not exist)   */}
        {/* ========================================================= */}
        {tableExists === false && (
          <div className="p-6 rounded-3xl bg-amber-50 border-2 border-amber-300 text-amber-900 shadow-md">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-amber-950 font-sans">
                    Tabel Database Belum Dibuat di Supabase
                  </h3>
                  <p className="text-xs sm:text-sm text-amber-800 mt-1 max-w-2xl leading-relaxed">
                    Koneksi ke Supabase aktif, tetapi tabel <code className="bg-amber-100 px-1.5 py-0.5 rounded font-mono font-bold">public.products</code> belum ditemukan.
                    Silakan jalankan skrip SQL di Supabase SQL Editor untuk membuat tabel dan hak aksesnya.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={handleCopySql}
                  className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-sm transition-all cursor-pointer"
                >
                  {copiedSql ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedSql ? "Tersalin!" : "Salin Skrip SQL"}</span>
                </button>
                <button
                  onClick={() => setShowSqlModal(true)}
                  className="px-4 py-2.5 rounded-xl bg-white hover:bg-amber-100 text-amber-900 text-xs sm:text-sm font-bold border border-amber-300 flex items-center gap-2 transition-all cursor-pointer"
                >
                  <FileCode className="w-4 h-4" />
                  <span>Lihat SQL</span>
                </button>
                <button
                  onClick={loadData}
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
        )}

        {/* ========================================================= */}
        {/* DASHBOARD TAB SELECTOR                                    */}
        {/* ========================================================= */}
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
            <span>Katalog Produk ({products.length})</span>
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

        {/* ========================================================= */}
        {/* TAB 1: PRODUCT MANAGEMENT                                 */}
        {/* ========================================================= */}
        {adminTab === "products" && (
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
                onClick={handleOpenCreateModal}
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
                onClick={loadData}
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
                            onClick={() => handleOpenEditModal(product)}
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
      </div>
    )}

      {/* ========================================================= */}
      {/* TAB 2: TESTIMONIAL MANAGEMENT                             */}
      {/* ========================================================= */}
      {adminTab === "testimonials" && (
        <TestimonialAdminSection
          onShowToast={showToast}
          onOpenSqlModal={() => setShowSqlModal(true)}
        />
      )}
    </main>

      {/* ================================================================= */}
      {/* MODAL: ADD / EDIT PRODUCT                                         */}
      {/* ================================================================= */}
      {isModalOpen && (
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
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmitProduct} className="flex-1 overflow-y-auto p-6 space-y-4 text-xs sm:text-sm">
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
                        onChange={handleImageFileChange}
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
                  onClick={() => setIsModalOpen(false)}
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
      )}

      {/* ================================================================= */}
      {/* MODAL: CHANGE ADMIN PASSWORD                                      */}
      {/* ================================================================= */}
      {isPasswordModalOpen && (
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
                onClick={() => setIsPasswordModalOpen(false)}
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
                  onClick={() => setIsPasswordModalOpen(false)}
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
      )}

      {/* ================================================================= */}
      {/* MODAL: DELETE CONFIRMATION                                        */}
      {/* ================================================================= */}
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
                onClick={() => handleDeleteProduct(deleteConfirmId)}
                disabled={actionLoading}
                className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold shadow-md transition-colors cursor-pointer text-xs sm:text-sm"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================================================================= */}
      {/* MODAL: SQL VIEWER                                                 */}
      {/* ================================================================= */}
      {showSqlModal && (
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
                onClick={() => setShowSqlModal(false)}
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
                onClick={handleCopySql}
                className="px-5 py-2.5 rounded-xl bg-[#008276] hover:bg-[#00a896] text-white font-bold text-xs sm:text-sm flex items-center gap-2 cursor-pointer shadow-md"
              >
                {copiedSql ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copiedSql ? "Tersalin!" : "Salin Seluruh SQL"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
