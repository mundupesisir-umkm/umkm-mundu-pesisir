"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Language, TranslationDictionary, TRANSLATIONS } from "./translations";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationDictionary;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = "umkm_language_preference";

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>("id");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Language;
      if (saved === "id" || saved === "en") {
        setLanguageState(saved);
      }
    } catch {
      // Ignore localStorage errors (e.g. incognito/SSR)
    } finally {
      setMounted(true);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Ignore localStorage errors
    }
  };

  const t = TRANSLATIONS[language] || TRANSLATIONS.id;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    // Fallback when used outside provider
    return {
      language: "id",
      setLanguage: () => {},
      t: TRANSLATIONS.id,
    };
  }
  return context;
};
