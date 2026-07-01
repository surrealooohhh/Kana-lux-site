"use client";

import { KanaGrid } from "@/components/kana/kana-grid";
import { PageShell } from "@/components/page-shell";
import { useLanguage } from "@/components/providers/language-provider";
import { SectionHeading } from "@/components/section-heading";
import { handakuten } from "@/data/kana";

export default function Page() { const { language } = useLanguage(); const isZh = language === "zh"; return <PageShell><SectionHeading eyebrow={isZh ? "半浊音" : "P Sounds"} title={isZh ? "半浊音" : "Handakuten"} description={isZh ? "は 行加小圆点后变为 p 行。" : "The h-row changes into p-row sounds with a small circle mark."} /><KanaGrid items={handakuten} /></PageShell>; }
