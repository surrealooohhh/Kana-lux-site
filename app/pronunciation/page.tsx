"use client";

import { Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/page-shell";
import { useLanguage } from "@/components/providers/language-provider";
import { SectionHeading } from "@/components/section-heading";
import { gojuon } from "@/data/kana";
import { speak } from "@/lib/utils";

export default function Page() { const { language } = useLanguage(); const isZh = language === "zh"; return <PageShell><SectionHeading eyebrow={isZh ? "发音" : "Audio"} title={isZh ? "发音实验室" : "Pronunciation Lab"} description={isZh ? "点击任意假名播放日语发音。" : "Click any kana to play Japanese pronunciation."} /><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{gojuon.map((kana) => <div key={kana.id} className="glass flex items-center justify-between rounded-2xl p-5"><div className="flex items-baseline gap-4"><span className="text-5xl font-semibold">{kana.hiragana}</span><span className="text-xl text-muted-foreground">{kana.romaji}</span></div><Button size="icon" onClick={() => speak(kana.hiragana)}><Volume2 className="h-4 w-4" /></Button></div>)}</div></PageShell>; }
