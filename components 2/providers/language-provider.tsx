"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

type Language = "zh" | "en";

const LanguageContext = createContext<{
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
} | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("zh");

  useEffect(() => {
    const stored = window.localStorage.getItem("kana-lux-language");
    if (stored === "zh" || stored === "en") setLanguageState(stored);
  }, []);

  const value = useMemo(() => {
    const setLanguage = (nextLanguage: Language) => {
      setLanguageState(nextLanguage);
      window.localStorage.setItem("kana-lux-language", nextLanguage);
      document.documentElement.lang = nextLanguage === "zh" ? "zh-CN" : "en";
    };

    return {
      language,
      setLanguage,
      toggleLanguage: () => setLanguage(language === "zh" ? "en" : "zh")
    };
  }, [language]);

  useEffect(() => {
    document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
  }, [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}
