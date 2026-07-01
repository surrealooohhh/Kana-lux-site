import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AppProviders } from "@/components/providers/app-providers";
import { AnimatedBackground } from "@/components/animated-background";
import { Navbar } from "@/components/navbar";

export const metadata: Metadata = {
  title: "日本語 五十音図 | Kana Lux",
  description: "A modern, animated Japanese kana learning experience."
};
export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="zh-CN" suppressHydrationWarning><body><AppProviders><AnimatedBackground /><Navbar />{children}</AppProviders></body></html>;
}
