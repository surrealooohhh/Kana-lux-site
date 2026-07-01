"use client";

import { KanaGrid } from "@/components/kana/kana-grid";
import { PageShell } from "@/components/page-shell";
import { useLanguage } from "@/components/providers/language-provider";
import { SectionHeading } from "@/components/section-heading";
import { gojuon } from "@/data/kana";

export default function Page() { const { language } = useLanguage(); const isZh = language === "zh"; return <PageShell><SectionHeading eyebrow={isZh ? "片假名" : "Katakana"} title={isZh ? "片假名" : "Katakana"} description={isZh ? "用于外来语、拟声词和强调表达的片假名训练。" : "Practice katakana for loanwords, sound effects, and emphasis."} /><KanaGrid items={gojuon.map((item) => ({ ...item, hiragana: item.katakana, katakana: item.hiragana }))} /></PageShell>; }
