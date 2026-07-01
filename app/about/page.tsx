import Link from "next/link";
import { Mail, MapPin, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/page-shell";
import { SectionHeading } from "@/components/section-heading";

export default function Page() { return <PageShell><SectionHeading eyebrow="About" title="关于我" description="Surrealooohhh 来自中国。这里也是 Kana Lux 的设计与学习理念说明。" /><div className="glass rounded-3xl p-8"><MapPin className="h-6 w-6 text-primary" /><h2 className="mt-5 text-3xl font-semibold">Surrealooohhh</h2><p className="mt-3 max-w-2xl leading-7 text-muted-foreground">来自中国。这个网站把五十音图、发音、笔顺、练习和小游戏放进一个更现代、更科技感的学习体验里。</p><Button asChild className="mt-6"><Link href="mailto:surrealooohhh@gmail.com"><Mail className="h-4 w-4" />联系方式</Link></Button></div><div className="glass mt-4 rounded-2xl p-6"><Sparkles className="h-6 w-6 text-primary" /><h3 className="mt-4 text-xl font-semibold">Kana Lux</h3><p className="mt-2 leading-7 text-muted-foreground">一个现代化、动画丰富、数据驱动的日语五十音学习网站。</p></div></PageShell>; }
