"use client";

import { PracticePanel } from "@/components/practice/practice-panel";
import { PageShell } from "@/components/page-shell";
import { useLanguage } from "@/components/providers/language-provider";
import { SectionHeading } from "@/components/section-heading";

export default function Page() { const { language } = useLanguage(); const isZh = language === "zh"; return <PageShell><SectionHeading eyebrow={isZh ? "练习" : "Practice"} title={isZh ? "练习模式" : "Practice Mode"} description={isZh ? "选择、听辨、罗马音、片假名输入和拼写练习，答题后即时反馈。" : "Practice with choices, audio, romaji, katakana input, and spelling with instant feedback."} /><PracticePanel /></PageShell>; }
