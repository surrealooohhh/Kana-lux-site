"use client";

import { motion } from "framer-motion";
import { PageShell } from "@/components/page-shell";
import { SectionHeading } from "@/components/section-heading";
import { gojuon } from "@/data/kana";

export default function Page() { return <PageShell><SectionHeading eyebrow="Stroke Order" title="笔顺动画" description="SVG 路径动画演示笔顺。" /><div className="glass mx-auto max-w-4xl rounded-3xl p-6"><div className="grid gap-4 sm:grid-cols-3">{gojuon.slice(0, 15).map((kana) => <div key={kana.id} className="rounded-2xl bg-background/50 p-5 text-center"><svg viewBox="0 0 160 120" className="h-32 w-full"><motion.path d="M30 76 C52 22 108 20 132 76" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" className="text-primary" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1.4, repeat: Infinity, repeatDelay: 1 }} /><text x="80" y="74" textAnchor="middle" className="fill-foreground text-5xl font-semibold">{kana.hiragana}</text></svg><div className="text-sm text-muted-foreground">{kana.strokeCount} strokes</div></div>)}</div></div></PageShell>; }
