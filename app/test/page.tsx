"use client";

import { TestPanel } from "@/components/practice/test-panel";
import { PageShell } from "@/components/page-shell";
import { useLanguage } from "@/components/providers/language-provider";
import { SectionHeading } from "@/components/section-heading";

export default function Page() { const { language } = useLanguage(); const isZh = language === "zh"; return <PageShell><SectionHeading eyebrow={isZh ? "测试" : "Test"} title={isZh ? "测试中心" : "Test Center"} description={isZh ? "选择 20 / 50 / 100 题，自动统计正确率、错误率、耗时和错误分析。" : "Choose 20, 50, or 100 questions and review accuracy, time, and mistakes."} /><TestPanel /></PageShell>; }
