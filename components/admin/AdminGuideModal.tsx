"use client";

import React, { useState } from "react";
import {
  BookOpen,
  CheckCircle2,
  Package,
  Layers,
  Smartphone,
  ImageIcon,
  FileText,
  Sparkles,
  FolderPlus,
  MessageSquareHeart,
  Star,
  ExternalLink,
  Tag,
  Lightbulb,
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
  const [activeTab, setActiveTab] = useState<
    "konsep" | "kategori" | "produk" | "ulasan" | "whatsapp"
  >("konsep");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="px-5 sm:px-6 py-4 sm:py-5 border-b border-slate-100 flex items-center justify-between bg-linear-to-r from-teal-50/70 via-slate-50 to-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#008276]/10 text-[#008276] flex items-center justify-center shrink-0 shadow-2xs">
              <BookOpen className="w-5 h-5 text-[#008276]" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-extrabold text-[#0a2642] font-sans">
                Panduan Resmi Pengelolaan Admin UMKM
              </h3>
              <p className="text-xs text-slate-500">
                Panduan praktis mengelola profil UMKM, varian, tab kategori baru, &amp; ulasan pembeli
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

        {/* Tab Navigation */}
        <div className="px-5 sm:px-6 pt-3 pb-1 border-b border-slate-100 flex items-center gap-1.5 sm:gap-2 overflow-x-auto bg-slate-50/50">
          <button
            type="button"
            onClick={() => setActiveTab("konsep")}
            className={cn(
              "px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer",
              activeTab === "konsep"
                ? "bg-[#008276] text-white shadow-xs"
                : "text-slate-600 hover:bg-slate-200/60"
            )}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>1. Konsep &amp; Struktur</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("kategori")}
            className={cn(
              "px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer",
              activeTab === "kategori"
                ? "bg-[#008276] text-white shadow-xs"
                : "text-slate-600 hover:bg-slate-200/60"
            )}
          >
            <FolderPlus className="w-3.5 h-3.5" />
            <span>2. Tab Kategori Baru</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("produk")}
            className={cn(
              "px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer",
              activeTab === "produk"
                ? "bg-[#008276] text-white shadow-xs"
                : "text-slate-600 hover:bg-slate-200/60"
            )}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>3. Input Produk &amp; Varian</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("ulasan")}
            className={cn(
              "px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer",
              activeTab === "ulasan"
                ? "bg-[#008276] text-white shadow-xs"
                : "text-slate-600 hover:bg-slate-200/60"
            )}
          >
            <MessageSquareHeart className="w-3.5 h-3.5" />
            <span>4. Kelola Ulasan Pembeli</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("whatsapp")}
            className={cn(
              "px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer",
              activeTab === "whatsapp"
                ? "bg-[#008276] text-white shadow-xs"
                : "text-slate-600 hover:bg-slate-200/60"
            )}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>5. Integrasi WhatsApp</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-5 text-xs sm:text-sm text-slate-600 leading-relaxed">
          {/* TAB 1: KONSEP & STRUKTUR */}
          {activeTab === "konsep" && (
            <div className="space-y-4 animate-in fade-in">
              <div className="p-4 sm:p-5 rounded-2xl bg-teal-50 border border-teal-200/80 text-teal-950">
                <h4 className="font-extrabold text-sm sm:text-base text-[#006e64] flex items-center gap-2 mb-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#008276] shrink-0" />
                  Prinsip Utama: 1 Profil Pengrajin = 1 Kartu Produk Terpadu
                </h4>
                <p className="text-xs sm:text-sm text-teal-900/90 leading-relaxed">
                  Agar tampilan website UMKM Mundu Pesisir rapi, profesional, dan tidak membingungkan pembeli, 
                  <strong> jangan membuat kartu produk terpisah untuk setiap ukuran atau rasa</strong>. 
                  Satukan seluruh variasi produk pengrajin ke dalam 1 kartu utama, lalu manfaatkan fitur 
                  <strong> Sub-Produk / Varian</strong>.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <span className="text-[11px] font-bold text-red-600 uppercase tracking-wider block">
                    ❌ Cara yang Tidak Dianjurkan
                  </span>
                  <p className="text-xs text-slate-700">
                    Membuat 5 kartu produk terpisah seperti:
                  </p>
                  <ul className="list-disc pl-4 text-xs space-y-1 text-slate-500 font-mono">
                    <li>Kartu 1: Siwang Toples Kecil Rp 15.000</li>
                    <li>Kartu 2: Siwang Toples Sedang Rp 28.000</li>
                    <li>Kartu 3: Siwang Toples Besar Rp 55.000</li>
                    <li>Kartu 4: Sambal Cumi Botol Kecil Rp 25.000</li>
                    <li>Kartu 5: Sambal Cumi Botol Sedang Rp 50.000</li>
                  </ul>
                  <p className="text-[11px] text-red-700 mt-2 font-medium">
                    Akibat: Halaman katalog penuh sesak, pembeli bingung membedakan pengrajin, dan data terfragmentasi.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
                  <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block">
                    ✅ Cara Terbaik (Sistem Terpadu)
                  </span>
                  <p className="text-xs text-emerald-950 font-semibold">
                    Cukup buat 1 Kartu Produk Utama:
                  </p>
                  <p className="text-xs font-bold text-[#0a2642] bg-white p-2 rounded-xl border border-emerald-200">
                    &quot;Siwang &amp; Sambal Cumi Ibu Magfiro&quot;
                  </p>
                  <p className="text-xs text-slate-600">
                    Lalu tambahkan ke-5 pilihan ukuran tersebut ke dalam tabel <strong>Sub-Produk / Varian</strong>.
                  </p>
                  <p className="text-[11px] text-emerald-800 mt-2 font-medium">
                    Keuntungan: Pembeli bisa langsung memilih ukuran toples menggunakan radio button interaktif, dan harga otomatis terhitung rapi saat order via WhatsApp!
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-amber-950 flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-xs uppercase tracking-wider text-amber-900 mb-0.5">
                    Kapan Perlu Menambah Kartu Baru?
                  </h5>
                  <p className="text-xs text-amber-900/90 leading-relaxed">
                    Tambah kartu produk baru <strong>hanya jika ada pengrajin UMKM baru</strong> dari Desa Mundu Pesisir, 
                    atau jenis kelompok komoditas yang benar-benar berbeda (misal: pengrajin terasi blok baru, pengrajin anyaman laut, dsb).
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: TAB KATEGORI BARU */}
          {activeTab === "kategori" && (
            <div className="space-y-4 animate-in fade-in">
              <div className="p-4 sm:p-5 rounded-2xl bg-teal-50 border border-teal-200/80 text-teal-950">
                <h4 className="font-extrabold text-sm sm:text-base text-[#006e64] flex items-center gap-2 mb-1.5">
                  <FolderPlus className="w-4 h-4 text-[#008276] shrink-0" />
                  Fitur Baru: Pengelolaan Kelompok Tab Kategori
                </h4>
                <p className="text-xs sm:text-sm text-teal-900/90 leading-relaxed">
                  Admin kini memiliki fleksibilitas penuh untuk menambah kelompok tab kategori baru. 
                  Setiap kategori baru yang Anda buat akan langsung menjadi <strong>tab filter interaktif</strong> pada halaman publik 
                  <code className="mx-1 px-1.5 py-0.5 rounded bg-teal-100 font-mono text-xs">/produk</code> dan tabel admin!
                </p>
              </div>

              <div className="space-y-3">
                <h5 className="font-bold text-xs uppercase tracking-wider text-slate-500">
                  Dua Cara Menambah Kategori Baru:
                </h5>

                <div className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-[#008276] transition-colors space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-[#008276] text-white text-xs flex items-center justify-center font-bold">1</span>
                    <h6 className="font-bold text-sm text-[#0a2642]">
                      Melalui Tombol &quot;Kelola Kategori&quot; di Toolbar Admin
                    </h6>
                  </div>
                  <p className="text-xs text-slate-600 pl-8">
                    Klik tombol <strong>&quot;Kelola Kategori&quot;</strong> di atas tabel produk. Di sana Anda dapat melihat daftar semua kategori aktif, jumlah produk yang ada di setiap kategori, serta form cepat untuk menambah kategori baru tanpa harus membuat produk terlebih dahulu.
                  </p>
                </div>

                <div className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-[#008276] transition-colors space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-[#008276] text-white text-xs flex items-center justify-center font-bold">2</span>
                    <h6 className="font-bold text-sm text-[#0a2642]">
                      Langsung Saat Menambah / Mengedit Produk
                    </h6>
                  </div>
                  <p className="text-xs text-slate-600 pl-8">
                    Pada formulir produk, di bagian <strong>&quot;Kelompok Tab Kategori&quot;</strong>, klik tombol <strong>&quot;+ Kategori Baru&quot;</strong>. Ketik nama kategori baru Anda (contoh: <em>Kerajinan Kerang &amp; Souvenir</em>). Sistem akan otomatis membuat slug dan menyimpannya ke produk!
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
                <h5 className="font-bold text-xs uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-[#008276]" />
                  Contoh Penggunaan Kategori Baru yang Cocok untuk Desa Mundu Pesisir:
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                    <p className="font-bold text-[#0a2642]">Kue Kering &amp; Snack Pesisir</p>
                    <p className="text-[11px] text-slate-500 font-mono mt-0.5">slug: kue-kering-snack</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                    <p className="font-bold text-[#0a2642]">Kerajinan &amp; Suvenir Kerang</p>
                    <p className="text-[11px] text-slate-500 font-mono mt-0.5">slug: kerajinan-suvenir</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                    <p className="font-bold text-[#0a2642]">Minuman Herbal &amp; Tradisional</p>
                    <p className="text-[11px] text-slate-500 font-mono mt-0.5">slug: minuman-herbal</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                    <p className="font-bold text-[#0a2642]">Hasil Perikanan Tambak</p>
                    <p className="text-[11px] text-slate-500 font-mono mt-0.5">slug: perikanan-tambak</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: INPUT PRODUK & VARIAN */}
          {activeTab === "produk" && (
            <div className="space-y-4 animate-in fade-in">
              <div className="space-y-3">
                <div className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-[#008276] transition-colors">
                  <h5 className="font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#008276] text-white text-[11px] flex items-center justify-center font-bold">1</span>
                    Nama Produk &amp; Nama Pengrajin
                  </h5>
                  <p className="text-xs text-slate-600 mt-1">
                    Sertakan jenis produk dan nama UMKM/pemiliknya agar pembeli mengenali pembuat aslinya.
                  </p>
                  <div className="mt-2 text-xs bg-slate-100 p-2 rounded-lg font-mono text-slate-700">
                    Contoh: Siwang &amp; Sambal Cumi Ibu Magfiro | Beras Berkualitas Ibu Santi
                  </div>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-[#008276] transition-colors">
                  <h5 className="font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#008276] text-white text-[11px] flex items-center justify-center font-bold">2</span>
                    Foto Produk (Rasio &amp; Kualitas)
                  </h5>
                  <p className="text-xs text-slate-600 mt-1">
                    Gunakan foto produk berlatar bersih dan terang dengan rasio <strong>1:1 (Persegi)</strong> atau <strong>4:3</strong>. Ukuran file maksimal 2 MB format JPG, PNG, atau WebP.
                  </p>
                  <p className="text-[11px] text-teal-800 mt-1.5 font-medium">
                    💡 Tips: Foto produk dengan pencahayaan alami di atas tampah anyaman atau meja kayu akan memberikan kesan otentik pesisir Cirebon yang memikat.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-[#008276] transition-colors">
                  <h5 className="font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#008276] text-white text-[11px] flex items-center justify-center font-bold">3</span>
                    Harga Utama &amp; Sinkronisasi Varian
                  </h5>
                  <p className="text-xs text-slate-600 mt-1">
                    Isi harga dasar terendah pada kolom harga utama. Jika Anda mengisi daftar varian, cukup klik tombol <strong>&quot;Hitung Dari Varian Termurah&quot;</strong> untuk otomatis mengatur harga mulai dari varian paling ekonomis!
                  </p>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-[#008276] transition-colors">
                  <h5 className="font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#008276] text-white text-[11px] flex items-center justify-center font-bold">4</span>
                    Detail Lengkap (Komposisi, Masa Simpan, Kemasan)
                  </h5>
                  <p className="text-xs text-slate-600 mt-1">
                    Informasi ini sangat diperhatikan oleh pembeli luar kota untuk mengetahui ketahanan produk saat dikirim lewat ekspedisi.
                  </p>
                  <div className="mt-2 text-xs bg-slate-100 p-2.5 rounded-lg space-y-1 text-slate-700">
                    <p><strong>Komposisi:</strong> Bawang merah Cirebon, terasi udang rebon asli Mundu Pesisir, cabai segar, rempah alami.</p>
                    <p><strong>Daya Tahan:</strong> 3 - 4 Bulan di suhu ruang (tanpa bahan pengawet).</p>
                    <p><strong>Kemasan:</strong> Toples tebal kedap udara dengan segil seal alumunium.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: KELOLA ULASAN PEMBELI */}
          {activeTab === "ulasan" && (
            <div className="space-y-4 animate-in fade-in">
              <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/80 border border-amber-200 text-amber-950">
                <h4 className="font-extrabold text-sm sm:text-base text-amber-900 flex items-center gap-2 mb-1.5">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500 shrink-0" />
                  Mengapa Testimoni &amp; Ulasan Sangat Penting?
                </h4>
                <p className="text-xs sm:text-sm text-amber-900/90 leading-relaxed">
                  Ulasan pembeli nyata adalah faktor penentu nomor satu bagi pembeli online dari luar kota untuk berbelanja oleh-oleh pesisir. 
                  Setiap ulasan yang Anda masukkan di panel admin akan otomatis tampil di <strong>halaman Testimoni</strong> dan <strong>slider ulasan di Beranda</strong>!
                </p>
              </div>

              <div className="space-y-3">
                <h5 className="font-bold text-xs uppercase tracking-wider text-slate-500">
                  Langkah Mengelola Ulasan Pembeli:
                </h5>

                <div className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-1.5">
                  <h6 className="font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#0a2642] text-white text-[11px] flex items-center justify-center font-bold">1</span>
                    Buka Tab &quot;Ulasan Pembeli&quot;
                  </h6>
                  <p className="text-xs text-slate-600 pl-7">
                    Di bagian atas dashboard admin, pilih tab <strong>&quot;Ulasan Pembeli&quot;</strong>. Anda akan melihat ringkasan seluruh testimoni yang tersimpan di database cloud Supabase.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-1.5">
                  <h6 className="font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#0a2642] text-white text-[11px] flex items-center justify-center font-bold">2</span>
                    Input Testimoni Baru (+ Tambah Ulasan)
                  </h6>
                  <p className="text-xs text-slate-600 pl-7">
                    Klik tombol <strong>&quot;Tambah Ulasan Baru&quot;</strong>, lalu masukkan data:
                  </p>
                  <ul className="list-disc pl-11 text-xs space-y-0.5 text-slate-500">
                    <li><strong>Nama Pembeli:</strong> misal <em>Ibu Ratna Dewi</em></li>
                    <li><strong>Asal Kota:</strong> misal <em>Bandung, Jawa Barat</em> atau <em>Jakarta Selatan</em></li>
                    <li><strong>Rating Bintang:</strong> Pilih 5 Bintang untuk ulasan sangat memuaskan</li>
                    <li><strong>Produk Yang Dibeli:</strong> misal <em>Siwang Pedas Toples Besar</em></li>
                    <li><strong>Isi Review:</strong> Kutipan jujur dari chat WhatsApp pembeli saat mereka menerima paket</li>
                  </ul>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-1.5">
                  <h6 className="font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#0a2642] text-white text-[11px] flex items-center justify-center font-bold">3</span>
                    Otomatis Menghitung Badge &amp; Rating Publik
                  </h6>
                  <p className="text-xs text-slate-600 pl-7">
                    Setelah ulasan tersimpan, counter pada badge web publik otomatis diperbarui (contoh: <em>&quot;12+ Ulasan Terverifikasi&quot;</em>) dan rating rata-rata dihitung secara transparan.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: INTEGRASI WHATSAPP */}
          {activeTab === "whatsapp" && (
            <div className="space-y-4 animate-in fade-in">
              <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950">
                <h4 className="font-extrabold text-sm sm:text-base text-emerald-900 flex items-center gap-2 mb-1.5">
                  <Smartphone className="w-4 h-4 text-emerald-600 shrink-0" />
                  Format Nomor WhatsApp Resmi
                </h4>
                <p className="text-xs sm:text-sm text-emerald-900/90 leading-relaxed">
                  Gunakan nomor ponsel WhatsApp aktif yang diawali dengan format standar <code className="px-1.5 py-0.5 rounded bg-emerald-100 font-mono text-xs">08...</code> (misal: <code className="px-1.5 py-0.5 rounded bg-emerald-100 font-mono text-xs">081214145254</code>). Sistem otomatis mengonversinya menjadi link WhatsApp internasional <code className="px-1.5 py-0.5 rounded bg-emerald-100 font-mono text-xs">wa.me/62...</code>.
                </p>
              </div>

              <div className="space-y-3">
                <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-2">
                  <h6 className="font-bold text-sm text-[#0a2642]">
                    Dua Jenis Pengalihan Chat WhatsApp:
                  </h6>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                      <span className="font-bold text-slate-800 block">🟢 Nomor Pengrajin Langsung</span>
                      <p className="text-slate-600">
                        Jika kolom nomor telepon diisi nomor HP pengrajin, pembeli yang mengklik tombol di kartu produk akan terhubung langsung ke WhatsApp pengrajin tersebut.
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-teal-50 border border-teal-200 space-y-1">
                      <span className="font-bold text-[#006e64] block">🏛️ Nomor Admin Terpusat Desa</span>
                      <p className="text-teal-900">
                        Jika dikosongkan, pesanan otomatis dialihkan ke nomor WhatsApp Layanan Resmi Admin Desa Mundu Pesisir (<strong>+62 812-1414-5254</strong>).
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-2">
                  <h6 className="font-bold text-sm text-[#0a2642]">
                    Format Pesan Otomatis yang Diterima di WhatsApp:
                  </h6>
                  <p className="text-xs text-slate-600">
                    Saat pembeli menekan tombol &quot;Pesan via WhatsApp&quot;, pesan sudah tersusun rapi:
                  </p>
                  <div className="p-3 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs leading-relaxed">
                    Halo Admin / Pengrajin UMKM Mundu Pesisir,<br />
                    Saya ingin memesan produk:<br />
                    • *Produk:* Siwang &amp; Sambal Cumi Ibu Magfiro<br />
                    • *Pilihan Varian:* Siwang Toples Sedang (130gr)<br />
                    • *Harga:* Rp 28.000<br />
                    Mohon info ketersediaan stok dan ongkos kirim ke alamat saya. Terima kasih!
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 sm:px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Panduan ini dapat dibuka kapan saja melalui tombol &quot;Panduan Mengisi&quot; di navigasi atas.
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#008276] hover:bg-[#006e64] text-white text-xs font-bold transition-colors cursor-pointer"
          >
            Mengerti &amp; Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
