"use client";

import type { ReactNode } from "react";
import { LanguageProvider } from "@/components/providers/language-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";

export function AppProviders({ children }: { children: ReactNode }) {
  return <ThemeProvider><LanguageProvider>{children}</LanguageProvider></ThemeProvider>;
}
