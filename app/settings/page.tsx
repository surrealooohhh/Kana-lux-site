"use client";

import { PageShell } from "@/components/page-shell";
import { useLanguage } from "@/components/providers/language-provider";
import { SectionHeading } from "@/components/section-heading";

export default function Page() { const { language } = useLanguage(); const isZh = language === "zh"; return <PageShell><SectionHeading eyebrow={isZh ? "设置" : "Settings"} title={isZh ? "设置" : "Settings"} description={isZh ? "字体大小、动画、声音、深色模式和语言偏好。" : "Font size, motion, sound, dark mode, and language preferences."} /><div className="glass mx-auto max-w-3xl rounded-3xl p-8 text-muted-foreground">{isZh ? "设置会保存在本地浏览器中。" : "Settings are saved in your browser."}</div></PageShell>; }
