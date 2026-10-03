"use client";

import React, { useState } from "react";
import {
  BookOpen,
  HelpCircle,
  CheckCircle2,
  Package,
  Layers,
  Smartphone,
  Image as ImageIcon,
  FileText,
  Sparkles,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib";

interface AdminGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminGuideModal: React.FC<AdminGuideModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<"konsep" | "formulir" | "contoh" | "whatsapp">("konsep");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-3xl max-h-[92vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="px-5 sm:px-6 py-4 sm:py-5 border-b border-slate-100 flex items-center justify-between bg-linear-to-r from-slate-50 to-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#008276]/10 text-[#008276] flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-extrabold text-[#0a2642] font-sans">
                Panduan Lengkap Pengisian Data UMKM
              </h3>
              <p className="text-xs text-slate-500">
                Petunjuk praktis mengelola profil UMKM, sub-produk/varian, & nomor WhatsApp
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer text-lg leading-none"
            aria-label="Tutup"
          >
            ✕
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-5 sm:px-6 pt-3 pb-1 border-b border-slate-100 flex items-center gap-1.5 sm:gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab("konsep")}
            className={cn(
              "px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer",
              activeTab === "konsep"
                ? "bg-[#008276] text-white shadow-xs"
                : "text-slate-600 hover:bg-slate-100"
            )}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>1. Konsep & Struktur</span>
          </button>

          <button
            onClick={() => setActiveTab("formulir")}
            className={cn(
              "px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer",
              activeTab === "formulir"
                ? "bg-[#008276] text-white shadow-xs"
                : "text-slate-600 hover:bg-slate-100"
            )}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>2. Panduan Input Form</span>
          </button>

          <button
            onClick={() => setActiveTab("contoh")}
            className={cn(
              "px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer",
              activeTab === "contoh"
                ? "bg-[#008276] text-white shadow-xs"
                : "text-slate-600 hover:bg-slate-100"
            )}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>3. Contoh Nyata 3 UMKM</span>
          </button>

          <button
            onClick={() => setActiveTab("whatsapp")}
            className={cn(
              "px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer",
              activeTab === "whatsapp"
                ? "bg-[#008276] text-white shadow-xs"
                : "text-slate-600 hover:bg-slate-100"
            )}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>4. Integrasi WhatsApp</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
          {/* TAB 1: KONSEP & STRUKTUR */}
          {activeTab === "konsep" && (
            <div className="space-y-4 animate-in fade-in">
              <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200/80 text-teal-950">
                <h4 className="font-extrabold text-sm sm:text-base text-[#006e64] flex items-center gap-2 mb-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#008276]" />
                  Prinsip: 1 Pengrajin UMKM = 1 Kartu Produk Terpadu
                </h4>
                <p className="text-xs sm:text-sm text-teal-900/90 leading-relaxed">
                  Agar website rapi, tidak membingungkan pembeli, dan mudah dikelola, 
                  <strong> jangan membuat kartu produk terpisah untuk setiap ukuran atau varian</strong>. 
                  Satukan seluruh varian produk ke dalam 1 profil UMKM pengrajin.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-[11px] font-bold text-red-600 uppercase tracking-wider block mb-1">
                    ❌ Cara yang Tidak Dianjurkan
                  </span>
                  <p className="text-xs text-slate-600">
                    Membuat 5 kartu produk terpisah seperti:
                  </p>
                  <ul className="list-disc pl-4 text-xs mt-1.5 space-y-0.5 text-slate-500">
                    <li>Kartu 1: Siwang Kecil Rp 15k</li>
                    <li>Kartu 2: Siwang Sedang Rp 28k</li>
                    <li>Kartu 3: Siwang Besar Rp 55k</li>
                    <li>Kartu 4: Sambal Cumi Kecil Rp 25k</li>
                    <li>Kartu 5: Sambal Cumi Sedang Rp 50k</li>
                  </ul>
                  <p className="text-[11px] text-red-700/80 mt-2 font-medium">
                    Efek: Katalog penuh sesak, informasi terpecah-pecah.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                  <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider block mb-1">
                    ✅ Cara Terbaik (Sistem Terpadu)
                  </span>
                  <p className="text-xs text-emerald-900 font-semibold">
                    Cukup buat 1 Produk Utama:
                  </p>
                  <p className="text-xs font-bold text-[#0a2642] mt-0.5">
                    &quot;Siwang & Sambal Cumi Ibu Magfiro&quot;
                  </p>
                  <p className="text-xs text-slate-600 mt-1">
                    Lalu masukkan ke-5 pilihan tersebut ke tabel <strong>Sub-Produk / Varian</strong>.
                  </p>
                  <p className="text-[11px] text-emerald-800 mt-2 font-medium">
                    Efek: Pembeli bisa langsung memilih varian dengan radio button interaktif & harga langsung terhitung otomatis!
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-amber-950">
                <h5 className="font-bold text-xs uppercase tracking-wider text-amber-900 mb-1 flex items-center gap-1.5">
                  <Package className="w-3.5 h-3.5" />
                  Kapan Menambah Kartu Baru?
                </h5>
                <p className="text-xs text-amber-900/90 leading-relaxed">
                  Tambah kartu produk baru <strong>hanya jika ada Pengrajin UMKM baru</strong> dari Desa Mundu Pesisir 
                  atau jenis usaha yang benar-benar berbeda.
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: PANDUAN INPUT FORM */}
          {activeTab === "formulir" && (
            <div className="space-y-4 animate-in fade-in">
              <div className="space-y-3">
                <div className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-[#008276] transition-colors">
                  <h5 className="font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#008276] text-white text-[11px] flex items-center justify-center font-bold">1</span>
                    Nama Produk & Nama Pengrajin
                  </h5>
                  <p className="text-xs text-slate-600 mt-1">
                    Sertakan jenis produk dan nama UMKM/pemiliknya agar pembeli mengenali pengrajinnya.
                  </p>
                  <div className="mt-2 text-xs bg-slate-100 p-2 rounded-lg font-mono text-slate-700">
                    Contoh: Siwang & Sambal Cumi Ibu Magfiro | Beras Berkualitas Ibu Santi
                  </div>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-[#008276] transition-colors">
                  <h5 className="font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#008276] text-white text-[11px] flex items-center justify-center font-bold">2</span>
                    Kelompok Tab Kategori
                  </h5>
                  <p className="text-xs text-slate-600 mt-1">
                    Pilih kategori yang tepat agar produk masuk di filter yang sesuai:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2 text-xs">
                    <div className="p-2 rounded-lg bg-teal-50 border border-teal-200 font-semibold text-teal-900">
                      • siwang: Sambal Siwang & Sambal Olahan
                    </div>
                    <div className="p-2 rounded-lg bg-blue-50 border border-blue-200 font-semibold text-blue-900">
                      • seafood: Olahan Nelayan & Ikan
                    </div>
                    <div className="p-2 rounded-lg bg-amber-50 border border-amber-200 font-semibold text-amber-900">
                      • beras: Beras Panen & Hasil Tani
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-[#008276] transition-colors">
                  <h5 className="font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#008276] text-white text-[11px] flex items-center justify-center font-bold">3</span>
                    Sub-Produk / Varian (Sangat Penting!)
                  </h5>
                  <p className="text-xs text-slate-600 mt-1">
                    Gunakan tabel varian untuk menambahkan setiap varian rasa, kemasan, atau bobot:
                  </p>
                  <ul className="list-disc pl-5 text-xs text-slate-600 mt-1.5 space-y-1">
                    <li><strong>Nama Varian:</strong> Contoh: <em>Toples Kecil</em>, <em>Perkilo IR 64</em>, <em>Bandeng Presto</em>.</li>
                    <li><strong>Satuan / Ukuran:</strong> Contoh: <em>100 gram</em>, <em>1 Kg</em>, <em>1 Karung (25kg)</em>, <em>1 Ekor</em>.</li>
                    <li><strong>Harga (Rp):</strong> Angka nominal tanpa titik (misal: <code>15000</code>).</li>
                  </ul>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-[#008276] transition-colors">
                  <h5 className="font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#008276] text-white text-[11px] flex items-center justify-center font-bold">4</span>
                    Nomor WhatsApp Pengrajin
                  </h5>
                  <p className="text-xs text-slate-600 mt-1">
                    Gunakan nomor ponsel aktif WhatsApp diawali dengan <code>08...</code> (misal: <code>082119882446</code>). 
                    Sistem otomatis mengubahnya menjadi format link WhatsApp internasional (628...).
                  </p>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-[#008276] transition-colors">
                  <h5 className="font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#008276] text-white text-[11px] flex items-center justify-center font-bold">5</span>
                    Foto Produk & Empty State Placeholder
                  </h5>
                  <p className="text-xs text-slate-600 mt-1">
                    Jika belum memiliki foto produk resmi dari pengrajin, gunakan placeholder default: 
                    <code className="bg-slate-100 text-teal-800 px-1 py-0.5 rounded font-mono ml-1">/products/placeholder.svg</code>. 
                    Gambar placeholder ini dirancang bersih, minimalis, dan profesional tanpa gambar ilustrasi buatan/AI.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CONTOH NYATA 3 UMKM */}
          {activeTab === "contoh" && (
            <div className="space-y-4 animate-in fade-in">
              <p className="text-xs text-slate-500">
                Berikut adalah 3 contoh data UMKM Desa Mundu Pesisir yang sudah terstandarisasi sebagai referensi Anda:
              </p>

              {/* Contoh 1 */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <h5 className="font-extrabold text-sm text-[#0a2642]">
                    1. UMKM Ibu Magfiro (Siwang & Sambal Cumi)
                  </h5>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-100 text-teal-800">
                    Kategori: siwang
                  </span>
                </div>
                <div className="text-xs space-y-1 text-slate-600">
                  <p><strong>No. WhatsApp:</strong> 082119882446</p>
                  <p><strong>Harga Utama:</strong> Rp 15.000 (Mulai dari)</p>
                  <p><strong>Sub-Produk / Varian (5 Varian):</strong></p>
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px]">
                    <div>• Siwang Toples Kecil (100gr) - <strong>Rp 15.000</strong></div>
                    <div>• Siwang Toples Sedang (200gr) - <strong>Rp 28.000</strong></div>
                    <div>• Siwang Toples Besar (400gr) - <strong>Rp 55.000</strong></div>
                    <div>• Sambal Cumi Toples Kecil (150gr) - <strong>Rp 25.000</strong></div>
                    <div>• Sambal Cumi Toples Sedang (300gr) - <strong>Rp 50.000</strong></div>
                  </div>
                </div>
              </div>

              {/* Contoh 2 */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <h5 className="font-extrabold text-sm text-[#0a2642]">
                    2. UMKM Ibu Santi (Beras Berkualitas Panen Lokal)
                  </h5>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                    Kategori: beras
                  </span>
                </div>
                <div className="text-xs space-y-1 text-slate-600">
                  <p><strong>No. WhatsApp:</strong> 082115397254</p>
                  <p><strong>Harga Utama:</strong> Rp 14.500 (Mulai dari per kg)</p>
                  <p><strong>Sub-Produk / Varian (6 Varian):</strong></p>
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px]">
                    <div>• Beras Super IR 64 Perkilo - <strong>Rp 14.500</strong></div>
                    <div>• Beras Pandan Wangi Perkilo - <strong>Rp 15.500</strong></div>
                    <div>• Beras Rojolele Premium Perkilo - <strong>Rp 16.000</strong></div>
                    <div>• Beras Super IR 64 Perkarung (25kg) - <strong>Rp 355.000</strong></div>
                    <div>• Beras Pandan Wangi Perkarung (25kg) - <strong>Rp 370.000</strong></div>
                    <div>• Beras Rojolele Perkarung (25kg) - <strong>Rp 375.000</strong></div>
                  </div>
                </div>
              </div>

              {/* Contoh 3 */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <h5 className="font-extrabold text-sm text-[#0a2642]">
                    3. UMKM Siti Maemunah (Olahan Ikan & Hasil Laut)
                  </h5>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                    Kategori: seafood
                  </span>
                </div>
                <div className="text-xs space-y-1 text-slate-600">
                  <p><strong>No. WhatsApp:</strong> 083823396163</p>
                  <p><strong>Harga Utama:</strong> Rp 3.000 (Mulai dari)</p>
                  <p><strong>Sub-Produk / Varian (3 Varian):</strong></p>
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px]">
                    <div>• Pindang Ikan Biles Gurih (Per Keranjang) - <strong>Rp 3.000</strong></div>
                    <div>• Ikan Sarden Masak Segar (Per Porsi) - <strong>Rp 12.000</strong></div>
                    <div>• Bandeng Presto Duri Lunak (Per Ekor/Pack) - <strong>Rp 35.000</strong></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: INTEGRASI WHATSAPP */}
          {activeTab === "whatsapp" && (
            <div className="space-y-4 animate-in fade-in">
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950">
                <h4 className="font-extrabold text-sm sm:text-base text-emerald-900 flex items-center gap-2 mb-1.5">
                  <Smartphone className="w-4 h-4 text-emerald-600" />
                  Bagaimana Pembeli Terhubung ke WhatsApp Pengrajin?
                </h4>
                <p className="text-xs sm:text-sm text-emerald-900/90 leading-relaxed">
                  Ketika pembeli mengklik tombol <strong>&quot;Pesan via WhatsApp&quot;</strong> di halaman produk, 
                  sistem web langsung membuat pesan otomatis yang telah terisi rapi dengan detail pesanan.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2.5">
                <h5 className="font-bold text-xs uppercase tracking-wider text-slate-500">
                  Format Pesan Otomatis yang Diterima Pengrajin:
                </h5>
                <div className="p-3.5 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs leading-relaxed">
                  <p>Halo Pengrajin UMKM Mundu Pesisir,</p>
                  <p className="mt-1">Saya tertarik memesan produk:</p>
                  <p>• Produk: Siwang & Sambal Cumi Ibu Magfiro</p>
                  <p>• Pilihan Varian: Siwang Toples Sedang (Rp 28.000)</p>
                  <p>• Jumlah Pesanan: 2 item</p>
                  <p>• Total Estimasi: Rp 56.000</p>
                  <p className="mt-1">Mohon info ketersediaan stok dan biaya ongkir ke alamat saya ya. Terima kasih!</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
                💡 <strong>Tips Admin:</strong> Pastikan nomor WhatsApp pengrajin selalu aktif menerima chat dari pelanggan, 
                karena setiap order langsung masuk ke ponsel masing-masing pengrajin tanpa perantara.
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 sm:px-6 py-3.5 border-t border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="text-[11px] text-slate-500 hidden sm:block">
            Portal Administrasi UMKM Desa Mundu Pesisir
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#008276] hover:bg-[#006e64] text-white text-xs sm:text-sm font-bold shadow-xs hover:shadow transition-all cursor-pointer ml-auto"
          >
            Mengerti, Tutup Panduan
          </button>
        </div>
      </div>
    </div>
  );
};
