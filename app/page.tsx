"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { KanaGrid } from "@/components/kana/kana-grid";
import { useLanguage } from "@/components/providers/language-provider";
import { gojuon } from "@/data/kana";

export default function HomePage() {
  const { language } = useLanguage();
  const isZh = language === "zh";

  return (
    <main>
      <section className="relative grid min-h-dvh place-items-center overflow-hidden px-4 pt-40 md:pt-20">
        <div className="mx-auto max-w-5xl text-center">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="glass mx-auto mb-6 inline-flex rounded-full px-4 py-2 text-sm">{isZh ? "极光五十音学习系统" : "Aurora Kana Learning System"}</motion.div>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="aurora-text animate-shimmer text-6xl font-semibold sm:text-8xl lg:text-9xl">日本語 五十音図</motion.h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl text-muted-foreground sm:text-2xl">{isZh ? "用更漂亮、更轻松的方式学会五十音。" : "Learn Japanese beautifully with a focused kana system."}</p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"><Button asChild size="lg"><Link href="/hiragana">{isZh ? "开始学习" : "Start Learning"} <ArrowRight className="h-4 w-4" /></Link></Button><Button asChild size="lg" variant="secondary"><Link href="#features">{isZh ? "了解网站" : "Explore"}</Link></Button></div>
        </div>
      </section>
      <section id="features" className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
        <div className="glass rounded-3xl p-8 sm:p-10">
          <Sparkles className="h-7 w-7 text-primary" />
          <h2 className="mt-6 text-3xl font-semibold">{isZh ? "一个为五十音打造的现代学习空间" : "A Modern Learning Space For Kana"}</h2>
          <p className="mt-5 text-base leading-8 text-muted-foreground sm:text-lg">
            {isZh
              ? "本网站把平假名、片假名、浊音、半浊音、拗音、发音、练习、测试和小游戏整合到同一个界面中。你可以从基础音开始逐步学习，也可以通过搜索、收藏、最近学习和即时反馈找到自己的节奏，让五十音学习更清晰、更有动力。"
              : "This website brings hiragana, katakana, voiced sounds, contracted sounds, audio practice, quizzes, tests, and games into one polished interface. Start with the basics, search quickly, save favorites, review recent items, and learn with instant feedback at your own pace."}
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6"><div className="mb-8 flex items-end justify-between gap-4"><div><p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">{isZh ? "预览" : "Preview"}</p><h2 className="mt-2 text-3xl font-semibold">{isZh ? "先从基础音开始" : "Start With The Basics"}</h2></div><Button asChild variant="outline"><Link href="/hiragana">{isZh ? "查看全部" : "View All"}</Link></Button></div><KanaGrid items={gojuon.slice(0, 15)} showModes={false} /></section>
    </main>
  );
}
