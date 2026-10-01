"use client";

import React, { useState } from "react";
import { HelpCircle, ChevronDown } from "lucide-react";
import { useLanguage, ContactFaqItem } from "@/lib/i18n";
import { cn } from "@/lib";

export const ContactFaqAccordion: React.FC = () => {
  const { t } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <section
      aria-label="Tanya Jawab Seputar Layanan & Produk"
      className="mt-12 sm:mt-16 bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-200 shadow-md"
    >
      <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-6 sm:mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-50 text-[#008276] border border-teal-200 mb-2">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>{t.contact.faqBadge}</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-[#0a2642] font-sans">
          {t.contact.faqTitle}
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          {t.contact.faqSubtitle}
        </p>
      </div>

      <div className="max-w-3xl mx-auto flex flex-col gap-3">
        {t.contact.faqs.map((faq: ContactFaqItem, idx: number) => {
          const isOpen = openFaq === idx;
          return (
            <div
              key={idx}
              className="rounded-xl border border-slate-200 overflow-hidden transition-all"
            >
              <button
                type="button"
                onClick={() => setOpenFaq(isOpen ? null : idx)}
                className="w-full flex items-center justify-between gap-4 p-4 text-left font-bold text-xs sm:text-sm text-[#0a2642] hover:bg-slate-50 transition-colors cursor-pointer"
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
  );
};
