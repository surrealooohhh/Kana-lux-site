"use client";

import Link from "next/link";
import { Mail, MapPin, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/page-shell";
import { SectionHeading } from "@/components/section-heading";
import { useLanguage } from "@/components/providers/language-provider";

export default function Page() {
  const { language } = useLanguage();
  const isZh = language === "zh";

  return <PageShell><SectionHeading eyebrow={isZh ? "关于" : "About"} title={isZh ? "关于我" : "About Me"} description={isZh ? "小楽 来自中国，致力于帮助所有人学会五十音。" : "Xiao Le is from China and is dedicated to helping everyone learn kana."} /><div className="glass rounded-3xl p-8"><MapPin className="h-6 w-6 text-primary" /><h2 className="mt-5 text-3xl font-semibold">小楽</h2><p className="mt-3 max-w-2xl leading-7 text-muted-foreground">{isZh ? "来自中国，致力于帮助所有人学会五十音。希望这个网站能让初学者少一点压力，多一点清晰和成就感。" : "From China, dedicated to helping everyone learn the Japanese kana system. This site is designed to make beginner learning clearer, calmer, and more enjoyable."}</p><Button asChild className="mt-6"><Link href="mailto:surrealooohhh@gmail.com"><Mail className="h-4 w-4" />{isZh ? "联系方式" : "Contact"}</Link></Button></div><div className="glass mt-4 rounded-2xl p-6"><Sparkles className="h-6 w-6 text-primary" /><h3 className="mt-4 text-xl font-semibold">Kana Lux</h3><p className="mt-2 leading-7 text-muted-foreground">{isZh ? "这是一个面向五十音学习的现代网站，整合假名表、发音、练习、测试和小游戏，帮助学习过程更直观、更连续。" : "Kana Lux is a modern website for learning kana, combining kana charts, pronunciation, practice, tests, and games into one continuous learning experience."}</p></div></PageShell>;
}
