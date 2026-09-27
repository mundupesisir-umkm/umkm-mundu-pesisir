"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  MessageCircle,
  MapPin,
  Mail,
  Clock,
  Navigation,
  Send,
  HelpCircle,
  ExternalLink,
  ChevronDown,
  CheckCircle2,
} from "lucide-react";
import { CONTACT_CONFIG, ContactChannel } from "@/constants/contact";
import { cn } from "@/lib";

export const ContactPageContent: React.FC = () => {
  // Form State
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    topic: "Pemesanan Produk",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Construct WhatsApp message URL
    const text = `Halo Admin UMKM Desa Mundu Pesisir,%0A%0A*Nama:* ${encodeURIComponent(
      formData.name
    )}%0A*No. WhatsApp:* ${encodeURIComponent(
      formData.phone
    )}%0A*Keperluan:* ${encodeURIComponent(
      formData.topic
    )}%0A*Pesan:*%0A${encodeURIComponent(formData.message)}`;

    const waUrl = `https://wa.me/6281214145254?text=${text}`;
    window.open(waUrl, "_blank");
    setIsSubmitted(true);
  };

  const getChannelIcon = (icon: ContactChannel["icon"]) => {
    switch (icon) {
      case "WhatsApp":
        return <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-[#00c853]" />;
      case "MapPin":
        return <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-[#008276]" />;
      case "Mail":
        return <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-[#0a2642]" />;
      case "Clock":
        return <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600" />;
    }
  };

  return (
    <div className="w-full min-h-screen bg-slate-50/60 pb-16 sm:pb-20">
      {/* ========================================================= */}
      {/* 1. HERO HEADER AREA                                       */}
      {/* ========================================================= */}
      <section className="w-full relative overflow-hidden bg-linear-to-b from-[#f2f9f8] via-[#e8f6f5] to-[#f4f7f6] pt-8 sm:pt-12 md:pt-14 pb-8 sm:pb-12 px-4 sm:px-6 lg:px-8 border-b border-[#d8ebe7]">
        {/* Subtle Ambient Coastal Glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 max-w-4xl h-56 bg-linear-to-r from-teal-200/30 via-cyan-100/40 to-emerald-200/30 rounded-full blur-3xl pointer-events-none z-0"
          aria-hidden="true"
        />

        <div className="max-w-5xl mx-auto relative z-10 flex flex-col items-center text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#f4ece1] text-[#8a6843] border border-[#d8c7b4] mb-3">
            <MapPin className="w-3.5 h-3.5 text-[#8a6843]" />
            <span>{CONTACT_CONFIG.badge}</span>
          </div>

          {/* Main Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#0a2642] tracking-tight font-sans leading-tight">
            {CONTACT_CONFIG.headline}
          </h1>

          {/* Description */}
          <p className="mt-3 text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed font-sans max-w-2xl">
            {CONTACT_CONFIG.description}
          </p>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. CONTACT CHANNELS CARDS                                 */}
      {/* ========================================================= */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
          {CONTACT_CONFIG.channels.map((ch) => (
            <div
              key={ch.id}
              className={cn(
                "rounded-2xl p-5 sm:p-6 bg-white border shadow-md flex flex-col justify-between transition-all duration-300 hover:-translate-y-1",
                ch.isPrimary
                  ? "border-[#00c853]/40 shadow-emerald-900/5 ring-1 ring-[#00c853]/20"
                  : "border-slate-200 shadow-slate-900/5"
              )}
            >
              <div>
                {/* Top Badge & Icon */}
                <div className="flex items-center justify-between gap-2 mb-3.5">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-slate-100 flex items-center justify-center">
                    {getChannelIcon(ch.icon)}
                  </div>
                  {ch.statusBadge && (
                    <span
                      className={cn(
                        "text-[10px] sm:text-xs font-semibold px-2.5 py-0.5 rounded-full border",
                        ch.isPrimary
                          ? "bg-emerald-50 text-[#009b3e] border-[#00c853]/30"
                          : "bg-slate-100 text-slate-600 border-slate-200"
                      )}
                    >
                      {ch.statusBadge}
                    </span>
                  )}
                </div>

                {/* Title & Subtitle */}
                <h3 className="font-bold text-sm sm:text-base text-[#0a2642] font-sans">
                  {ch.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  {ch.subtitle}
                </p>

                {/* Primary Value */}
                <div className="mt-3.5 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs sm:text-sm font-semibold text-[#0a2642] select-all wrap-break-word">
                  {ch.primaryValue}
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-5 pt-3 border-t border-slate-100">
                <a
                  href={ch.actionHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all text-center",
                    ch.isPrimary
                      ? "bg-[#00c853] hover:bg-[#00b049] text-white shadow-xs"
                      : "bg-[#0a2642] hover:bg-[#18395e] text-white"
                  )}
                >
                  <span>{ch.actionText}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================= */}
      {/* 3. INTERACTIVE INQUIRY FORM & EMBEDDED MAP               */}
      {/* ========================================================= */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 sm:mt-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* LEFT: INQUIRY FORM (5 Cols) */}
          <div className="lg:col-span-5 bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-md">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#008276]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#008276]">
                FORMULIR PESAN CEPAT
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold text-[#0a2642] font-sans">
              Ada Pertanyaan atau Pemesanan?
            </h2>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Isi data di bawah ini untuk terhubung langsung dengan admin UMKM via
              WhatsApp dengan pesan terformat otomatis.
            </p>

            <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-3.5">
              {/* Name */}
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-xs font-bold text-[#0a2642] mb-1"
                >
                  Nama Lengkap *
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Contoh: Budi Santoso"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#008276]/30 focus:border-[#008276] transition-all"
                />
              </div>

              {/* Phone / WA */}
              <div>
                <label
                  htmlFor="contact-phone"
                  className="block text-xs font-bold text-[#0a2642] mb-1"
                >
                  Nomor WhatsApp *
                </label>
                <input
                  id="contact-phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="Contoh: 081234567890"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#008276]/30 focus:border-[#008276] transition-all"
                />
              </div>

              {/* Topic Select */}
              <div>
                <label
                  htmlFor="contact-topic"
                  className="block text-xs font-bold text-[#0a2642] mb-1"
                >
                  Topik Keperluan
                </label>
                <select
                  id="contact-topic"
                  value={formData.topic}
                  onChange={(e) =>
                    setFormData({ ...formData, topic: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#008276]/30 focus:border-[#008276] transition-all"
                >
                  <option value="Pemesanan Produk Retail">
                    Pemesanan Produk Retail (Siwang & Seafood)
                  </option>
                  <option value="Kemitraan Reseller / Grosir">
                    Kemitraan Reseller / Harga Grosir
                  </option>
                  <option value="Kunjungan & Studi Banding">
                    Kunjungan Desa / Studi Banding UMKM
                  </option>
                  <option value="Pertanyaan & Informasi Umum">
                    Pertanyaan & Informasi Lainnya
                  </option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-bold text-[#0a2642] mb-1"
                >
                  Pesan atau Detail Pesanan *
                </label>
                <textarea
                  id="contact-message"
                  rows={3}
                  required
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="Tuliskan pertanyaan atau pesanan produk yang Anda inginkan..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#008276]/30 focus:border-[#008276] transition-all resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="mt-2 w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-[#00c853] hover:bg-[#00b049] text-white text-xs sm:text-sm font-bold shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Kirim via WhatsApp Admin</span>
              </button>

              {isSubmitted && (
                <div className="flex items-center gap-2 text-xs text-emerald-700 bg-emerald-50 p-2.5 rounded-xl border border-emerald-200 mt-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    Pesan Anda sedang dibuka di aplikasi WhatsApp. Pastikan klik
                    tombol kirim di chat!
                  </span>
                </div>
              )}
            </form>
          </div>

          {/* RIGHT: MAP & ROUTE DIRECTIONS (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            {/* Interactive Map Card */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-slate-200 shadow-md">
              <div className="flex items-center justify-between gap-2 mb-3.5">
                <div>
                  <h2 className="text-base sm:text-lg font-extrabold text-[#0a2642] font-sans flex items-center gap-2">
                    <Navigation className="w-4 h-4 text-[#008276]" />
                    <span>Peta Lokasi Desa Mundu Pesisir</span>
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Kecamatan Mundu, Kabupaten Cirebon, Jawa Barat
                  </p>
                </div>

                <a
                  href="https://maps.google.com/?q=Desa+Mundu+Pesisir+Cirebon"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors shrink-0"
                >
                  <span>Buka di Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Map Iframe */}
              <div className="relative aspect-video sm:aspect-16/10 w-full rounded-xl sm:rounded-2xl overflow-hidden border border-slate-200 bg-slate-100">
                <iframe
                  title="Peta Lokasi Desa Mundu Pesisir Cirebon"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15849.208754160453!2d108.5855071!3d-6.7337424!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6f1d8717c18151%3A0xe54e1a06700c3b88!2sMundu%20Pesisir%2C%20Mundu%2C%20Cirebon%20Regency%2C%20West%20Java!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>

              {/* Mobile button to open Google Maps */}
              <a
                href="https://maps.google.com/?q=Desa+Mundu+Pesisir+Cirebon"
                target="_blank"
                rel="noopener noreferrer"
                className="sm:hidden mt-3 w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold text-center"
              >
                <span>Buka di Aplikasi Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Route Tips Card */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-md">
              <h3 className="text-sm sm:text-base font-bold text-[#0a2642] mb-3 flex items-center gap-2">
                <span className="text-[#008276]">🚗</span>
                <span>Panduan Rute Menuju Lokasi</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {CONTACT_CONFIG.routes.map((rt, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-xs font-bold text-[#008276] block mb-1">
                        {rt.from}
                      </span>
                      <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed">
                        {rt.description}
                      </p>
                    </div>
                    <span className="mt-2 text-[10px] font-semibold text-slate-500 bg-white py-1 px-2 rounded-md self-start border border-slate-200">
                      ⏱️ {rt.duration}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 4. FREQUENTLY ASKED QUESTIONS (FAQ)                      */}
        {/* ========================================================= */}
        <section
          aria-label="Tanya Jawab Seputar Layanan & Produk"
          className="mt-12 sm:mt-16 bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-200 shadow-md"
        >
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-6 sm:mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-50 text-[#008276] border border-teal-200 mb-2">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>TANYA JAWAB UMUM</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0a2642] font-sans">
              Pertanyaan yang Sering Diajukan
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Informasi cepat seputar pengiriman luar kota, ketahanan produk, dan
              pembelian grosir.
            </p>
          </div>

          <div className="max-w-3xl mx-auto flex flex-col gap-3">
            {CONTACT_CONFIG.faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-200 overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between gap-4 p-4 text-left font-bold text-xs sm:text-sm text-[#0a2642] hover:bg-slate-50 transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={cn(
                        "w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200",
                        isOpen && "rotate-180 text-[#008276]"
                      )}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50/50 border-t border-slate-100">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================= */}
        {/* 5. BOTTOM COMMUNITY BANNER                                */}
        {/* ========================================================= */}
        <div className="mt-8 sm:mt-12 rounded-2xl p-5 sm:p-7 bg-linear-to-r from-[#0a2642] via-[#0d3356] to-[#0a2642] border border-[#d8c7b4]/40 shadow-lg text-white flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h3 className="font-bold text-base sm:text-lg">
              Ingin Menjelajahi Produk UMKM Lainnya?
            </h3>
            <p className="text-xs text-slate-300 mt-0.5">
              Lihat aneka Siwang renyah, kerupuk payur gurih, dan seafood kering
              langsung dari perahu nelayan.
            </p>
          </div>
          <Link
            href="/#produk"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-[#008276] hover:bg-[#006e64] text-white text-xs sm:text-sm font-bold shadow-xs hover:-translate-y-0.5 transition-all whitespace-nowrap shrink-0"
          >
            <span>Katalog Produk UMKM</span>
          </Link>
        </div>
      </main>
    </div>
  );
};
