"use client";

import { KanaGrid } from "@/components/kana/kana-grid";
import { PageShell } from "@/components/page-shell";
import { useLanguage } from "@/components/providers/language-provider";
import { SectionHeading } from "@/components/section-heading";
import { dakuten } from "@/data/kana";

export default function Page() { const { language } = useLanguage(); const isZh = language === "zh"; return <PageShell><SectionHeading eyebrow={isZh ? "浊音" : "Voiced Sounds"} title={isZh ? "浊音" : "Dakuten"} description={isZh ? "加浊点后的声音更有声带振动。" : "Kana with dakuten marks and stronger voiced pronunciation."} /><KanaGrid items={dakuten} /></PageShell>; }
