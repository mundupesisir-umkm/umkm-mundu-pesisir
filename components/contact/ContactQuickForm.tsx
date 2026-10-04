"use client";

import React, { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons";
import { useLanguage } from "@/lib/i18n";

export const ContactQuickForm: React.FC = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    topic: "Pemesanan Produk Retail",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Construct formatted WhatsApp message URL
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

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-md">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs font-bold uppercase tracking-wider text-[#008276]">
          {t.contact.formBadge}
        </span>
      </div>
      <h2 className="text-lg sm:text-xl font-extrabold text-[#0a2642] font-sans">
        {t.contact.formTitle}
      </h2>
      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
        {t.contact.formSubtitle}
      </p>

      <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-3.5">
        {/* Name */}
        <div>
          <label
            htmlFor="contact-name"
            className="block text-xs font-bold text-[#0a2642] mb-1"
          >
            {t.contact.formName} *
          </label>
          <input
            id="contact-name"
            type="text"
            required
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            placeholder={t.contact.formNamePlaceholder}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#008276]/30 focus:border-[#008276] transition-all"
          />
        </div>

        {/* Phone / WA */}
        <div>
          <label
            htmlFor="contact-phone"
            className="block text-xs font-bold text-[#0a2642] mb-1"
          >
            {t.contact.formPhone} *
          </label>
          <input
            id="contact-phone"
            type="tel"
            required
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            placeholder={t.contact.formPhonePlaceholder}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#008276]/30 focus:border-[#008276] transition-all"
          />
        </div>

        {/* Topic Select */}
        <div>
          <label
            htmlFor="contact-topic"
            className="block text-xs font-bold text-[#0a2642] mb-1"
          >
            {t.contact.formTopic}
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
              {t.contact.formTopicOrder}
            </option>
            <option value="Kemitraan Reseller / Grosir">
              {t.contact.formTopicReseller}
            </option>
            <option value="Kunjungan & Studi Banding">
              {t.contact.formTopicVisit}
            </option>
            <option value="Pertanyaan & Informasi Umum">
              {t.contact.formTopicOther}
            </option>
          </select>
        </div>

        {/* Message */}
        <div>
          <label
            htmlFor="contact-message"
            className="block text-xs font-bold text-[#0a2642] mb-1"
          >
            {t.contact.formMessage} *
          </label>
          <textarea
            id="contact-message"
            rows={3}
            required
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            placeholder={t.contact.formMessagePlaceholder}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#008276]/30 focus:border-[#008276] transition-all resize-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-2 w-full inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl bg-[#00c853] hover:bg-[#00b049] text-white text-xs sm:text-sm font-bold shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
        >
          <WhatsAppIcon className="w-4 h-4 text-white" />
          <span>{t.contact.formSubmitBtn}</span>
        </button>

        {isSubmitted && (
          <div className="flex items-center gap-2 text-xs text-emerald-700 bg-emerald-50 p-2.5 rounded-xl border border-emerald-200 mt-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{t.contact.formSuccessMsg}</span>
          </div>
        )}
      </form>
    </div>
  );
};
