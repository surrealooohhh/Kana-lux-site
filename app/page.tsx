"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, AudioLines, Sparkles, Trophy, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { KanaGrid } from "@/components/kana/kana-grid";
import { gojuon } from "@/data/kana";

const features = [
  { icon: Sparkles, title: "Glass Kana Cards", text: "hover、glow、ripple 与完整 Drawer 资料。" },
  { icon: AudioLines, title: "Pronunciation Lab", text: "Audio API 发音练习。" },
  { icon: Zap, title: "Practice Engine", text: "选择、听辨、罗马音、输入和拼写即时评分。" },
  { icon: Trophy, title: "Games & Records", text: "快速点击、挑战计时与本地记录。" }
];

export default function HomePage() {
  return (
    <main>
      <section className="relative grid min-h-dvh place-items-center overflow-hidden px-4 pt-40 md:pt-20">
        <div className="mx-auto max-w-5xl text-center">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="glass mx-auto mb-6 inline-flex rounded-full px-4 py-2 text-sm">Aurora Kana Learning System</motion.div>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="aurora-text animate-shimmer text-6xl font-semibold sm:text-8xl lg:text-9xl">日本語 五十音図</motion.h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl text-muted-foreground sm:text-2xl">Learn Japanese Beautifully.</p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"><Button asChild size="lg"><Link href="/hiragana">开始学习 <ArrowRight className="h-4 w-4" /></Link></Button><Button asChild size="lg" variant="secondary"><Link href="#features">探索功能</Link></Button></div>
        </div>
      </section>
      <section id="features" className="mx-auto max-w-7xl px-4 py-20 sm:px-6"><div className="grid gap-4 md:grid-cols-4">{features.map((feature) => <div key={feature.title} className="glass rounded-2xl p-6"><feature.icon className="h-6 w-6 text-primary" /><h2 className="mt-5 text-lg font-semibold">{feature.title}</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">{feature.text}</p></div>)}</div></section>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6"><div className="mb-8 flex items-end justify-between gap-4"><div><p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">Preview</p><h2 className="mt-2 text-3xl font-semibold">先从基础音开始</h2></div><Button asChild variant="outline"><Link href="/hiragana">查看全部</Link></Button></div><KanaGrid items={gojuon.slice(0, 15)} showModes={false} /></section>
    </main>
  );
}
