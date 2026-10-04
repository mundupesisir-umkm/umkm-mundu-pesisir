"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { CheckCircle2 } from "lucide-react";
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  checkProductsTable,
  uploadProductImage,
  formatRupiah,
  SUPABASE_SQL_SCHEMA,
  fetchProductCategories,
  ProductCategoryItem,
  DEFAULT_PRODUCT_CATEGORIES,
  fetchTestimonials,
} from "@/lib/supabase";
import { ProductItem } from "@/constants/products";
import {
  AdminLoginForm,
  AdminHeader,
  AdminDatabaseAlert,
  AdminPasswordModal,
  AdminSqlSchemaModal,
  AdminGuideModal,
  ProductAdminTable,
  ProductFormModal,
  ProductFormData,
  TestimonialAdminSection,
  CategoryManagerModal,
} from "@/components/admin";

const INITIAL_FORM_DATA: ProductFormData = {
  name: "",
  categoryLabel: "SIWANG & SAMBAL",
  categoryKey: "siwang",
  price: 15000,
  phone: "082119882446",
  image: "/products/placeholder.svg",
  badge: "",
  description: "",
  composition: "Bawang merah Cirebon, terasi udang rebon asli Mundu Pesisir, rempah alami.",
  shelfLife: "3 - 4 Bulan di suhu ruang.",
  packaging: "Toples higienis / standing pouch kedap udara.",
  variants: [],
};

export default function AdminPage() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Change Password Modal State
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState<boolean>(false);

  // Guide Modal State
  const [isGuideModalOpen, setIsGuideModalOpen] = useState<boolean>(false);

  // Category Manager Modal State
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState<boolean>(false);

  // Active Tab
  const [adminTab, setAdminTab] = useState<"products" | "testimonials">("products");

  // Data & Supabase Status
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [categories, setCategories] = useState<ProductCategoryItem[]>(DEFAULT_PRODUCT_CATEGORIES);
  const [testimonialCount, setTestimonialCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [actionLoading, setActionLoading] = useState<boolean>(false);
  const [tableExists, setTableExists] = useState<boolean | null>(null);
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
  const [formData, setFormData] = useState<ProductFormData>(INITIAL_FORM_DATA);

  // Check existing session on mount
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
        setProducts([]);
        setLoading(false);
        return;
      }

      const [catRes, prodRes, testRes] = await Promise.all([
        fetchProductCategories(),
        fetchProducts(),
        fetchTestimonials().catch(() => ({ data: [] })),
      ]);

      if (prodRes && !prodRes.error) {
        setProducts(prodRes.data);
      } else if (prodRes?.error) {
        showToast(`Gagal memuat produk: ${prodRes.error}`);
      }

      // Merge saved categories with any product categoryKeys
      const loadedCats = [...(catRes.data || DEFAULT_PRODUCT_CATEGORIES)];
      if (prodRes && prodRes.data) {
        prodRes.data.forEach((p) => {
          if (p.categoryKey && !loadedCats.some((c) => c.id === p.categoryKey)) {
            loadedCats.push({
              id: p.categoryKey,
              label: p.categoryLabel || p.categoryKey.toUpperCase(),
              isDefault: false,
            });
          }
        });
      }
      setCategories(loadedCats);

      if (testRes && testRes.data) {
        setTestimonialCount(testRes.data.length);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal memuat data";
      showToast(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated, loadData]);

  const handleLogout = () => {
    sessionStorage.removeItem("umkm_admin_auth");
    setIsAuthenticated(false);
  };

  const handleCopySql = () => {
    navigator.clipboard.writeText(SUPABASE_SQL_SCHEMA);
    setCopiedSql(true);
    showToast("Kode SQL berhasil disalin ke clipboard!");
    setTimeout(() => setCopiedSql(false), 2500);
  };

  const handleOpenCreateModal = () => {
    setEditingProduct(null);
    setFormData(INITIAL_FORM_DATA);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (product: ProductItem) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      categoryLabel: product.categoryLabel,
      categoryKey: product.categoryKey || "siwang",
      price: product.price,
      phone: product.phone || "082119882446",
      image: product.image || "/products/placeholder.svg",
      badge: product.badge || "",
      description: product.description,
      composition: product.details?.composition || "",
      shelfLife: product.details?.shelfLife || "",
      packaging: product.details?.packaging || "",
      variants: product.variants ? [...product.variants] : [],
    });
    setIsModalOpen(true);
  };

  const handleSubmitProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert("Nama produk tidak boleh kosong!");
      return;
    }

    setActionLoading(true);
    try {
      // Calculate formatted price range or single price
      let computedPriceFormatted = formatRupiah(Number(formData.price));
      if (formData.variants && formData.variants.length > 0) {
        const prices = formData.variants.map((v) => Number(v.price)).filter((p) => p > 0);
        if (prices.length > 1) {
          const minP = Math.min(...prices);
          const maxP = Math.max(...prices);
          computedPriceFormatted = minP === maxP ? formatRupiah(minP) : `${formatRupiah(minP)} - ${formatRupiah(maxP)}`;
        } else if (prices.length === 1) {
          computedPriceFormatted = formatRupiah(prices[0]);
        }
      }

      const productPayload = {
        name: formData.name.trim(),
        categoryLabel: formData.categoryLabel.trim(),
        categoryKey: formData.categoryKey,
        price: Number(formData.price),
        priceFormatted: computedPriceFormatted,
        phone: formData.phone.trim() || undefined,
        image: formData.image.trim() || "/products/placeholder.svg",
        badge: formData.badge.trim() || undefined,
        description: formData.description.trim(),
        variants: formData.variants,
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
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.categoryLabel.toLowerCase().includes(query) ||
        (p.variants && p.variants.some((v) => v.name.toLowerCase().includes(query)));

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
    const beras = products.filter((p) => p.categoryKey === "beras").length;
    const variantsCount = products.reduce(
      (acc, p) => acc + (p.variants && p.variants.length > 0 ? p.variants.length : 1),
      0
    );
    const categoriesCount = categories.length;
    return { total, siwang, seafood, beras, variantsCount, categoriesCount };
  }, [products, categories]);

  // Screen 1: Unauthenticated
  if (!isAuthenticated) {
    return <AdminLoginForm onSuccess={() => setIsAuthenticated(true)} />;
  }

  // Screen 2: Authenticated Dashboard
  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0a2642] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-slate-700 text-xs sm:text-sm animate-in fade-in slide-in-from-bottom-4">
          <CheckCircle2 className="w-4 h-4 text-[#00c853] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header & Tab Selector */}
      <AdminHeader
        adminTab={adminTab}
        setAdminTab={setAdminTab}
        productCount={products.length}
        testimonialCount={testimonialCount}
        onOpenGuideModal={() => setIsGuideModalOpen(true)}
        onOpenPasswordModal={() => setIsPasswordModalOpen(true)}
        onLogout={handleLogout}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Database Setup Alert */}
        {tableExists === false && (
          <AdminDatabaseAlert
            copiedSql={copiedSql}
            onCopySql={handleCopySql}
            onOpenSqlModal={() => setShowSqlModal(true)}
            onRefresh={loadData}
          />
        )}

        {/* Tab 1: Product Management */}
        {adminTab === "products" && (
          <ProductAdminTable
            products={products}
            filteredProducts={filteredProducts}
            stats={stats}
            loading={loading}
            tableExists={tableExists}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            categories={categories}
            onRefresh={loadData}
            onOpenCreateModal={handleOpenCreateModal}
            onOpenEditModal={handleOpenEditModal}
            onOpenCategoryModal={() => setIsCategoryModalOpen(true)}
            deleteConfirmId={deleteConfirmId}
            setDeleteConfirmId={setDeleteConfirmId}
            onDeleteProduct={handleDeleteProduct}
            actionLoading={actionLoading}
            onOpenGuideModal={() => setIsGuideModalOpen(true)}
          />
        )}

        {/* Tab 2: Testimonial Management */}
        {adminTab === "testimonials" && (
          <TestimonialAdminSection
            onShowToast={showToast}
            onOpenSqlModal={() => setShowSqlModal(true)}
          />
        )}
      </main>

      {/* Modal: Add / Edit Product */}
      <ProductFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        editingProduct={editingProduct}
        formData={formData}
        setFormData={setFormData}
        actionLoading={actionLoading}
        onImageFileChange={handleImageFileChange}
        onSubmit={handleSubmitProduct}
        onOpenGuideModal={() => setIsGuideModalOpen(true)}
        categories={categories}
      />

      {/* Modal: Manage Categories */}
      <CategoryManagerModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        categories={categories}
        products={products}
        onCategoriesUpdated={(newCats) => setCategories(newCats)}
        onShowToast={showToast}
      />

      {/* Modal: Guide for Filling Data */}
      <AdminGuideModal
        isOpen={isGuideModalOpen}
        onClose={() => setIsGuideModalOpen(false)}
      />

      {/* Modal: Change Admin Password */}
      <AdminPasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        onSuccess={showToast}
      />

      {/* Modal: SQL Viewer */}
      <AdminSqlSchemaModal
        isOpen={showSqlModal}
        onClose={() => setShowSqlModal(false)}
        copiedSql={copiedSql}
        onCopySql={handleCopySql}
      />
    </div>
  );
}
