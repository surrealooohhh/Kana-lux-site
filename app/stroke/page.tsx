"use client";

import { PageShell } from "@/components/page-shell";
import { useLanguage } from "@/components/providers/language-provider";
import { SectionHeading } from "@/components/section-heading";
import { gojuon } from "@/data/kana";

export default function Page() { const { language } = useLanguage(); const isZh = language === "zh"; return <PageShell><SectionHeading eyebrow={isZh ? "假名" : "Kana"} title={isZh ? "假名资料" : "Kana Reference"} description={isZh ? "笔顺动画已移除，这里保留基础假名与笔画数量资料。" : "Stroke animations have been removed. This page keeps the basic kana reference."} /><div className="glass mx-auto max-w-4xl rounded-3xl p-6"><div className="grid gap-4 sm:grid-cols-3">{gojuon.slice(0, 15).map((kana) => <div key={kana.id} className="rounded-2xl bg-background/50 p-5 text-center"><div className="text-6xl font-semibold">{kana.hiragana}</div><div className="mt-3 text-xl text-muted-foreground">{kana.katakana}</div><div className="mt-2 text-sm text-muted-foreground">{isZh ? `${kana.strokeCount} 笔` : `${kana.strokeCount} strokes`}</div></div>)}</div></div></PageShell>; }
