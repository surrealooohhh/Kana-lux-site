"use client";

import { KanaGrid } from "@/components/kana/kana-grid";
import { PageShell } from "@/components/page-shell";
import { useLanguage } from "@/components/providers/language-provider";
import { SectionHeading } from "@/components/section-heading";
import { youon } from "@/data/kana";

export default function Page() { const { language } = useLanguage(); const isZh = language === "zh"; return <PageShell><SectionHeading eyebrow={isZh ? "拗音" : "Contracted Sounds"} title={isZh ? "拗音" : "Youon"} description={isZh ? "i 段假名与小 ゃ / ゅ / ょ 合成一拍。" : "Contracted sounds formed with small ya, yu, and yo."} /><KanaGrid items={youon} /></PageShell>; }
