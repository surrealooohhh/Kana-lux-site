"use client";

import { KanaGrid } from "@/components/kana/kana-grid";
import { PageShell } from "@/components/page-shell";
import { useLanguage } from "@/components/providers/language-provider";
import { SectionHeading } from "@/components/section-heading";
import { gojuon } from "@/data/kana";

export default function Page() { const { language } = useLanguage(); const isZh = language === "zh"; return <PageShell><SectionHeading eyebrow={isZh ? "平假名" : "Hiragana"} title={isZh ? "平假名" : "Hiragana"} description={isZh ? "基础五十音图。按行、随机、收藏和最近学习自由切换。" : "The core kana chart with row study, random order, favorites, and recent learning."} /><KanaGrid items={gojuon} /></PageShell>; }
