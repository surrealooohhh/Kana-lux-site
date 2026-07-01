import { TestPanel } from "@/components/practice/test-panel";
import { PageShell } from "@/components/page-shell";
import { SectionHeading } from "@/components/section-heading";

export default function Page() { return <PageShell><SectionHeading eyebrow="Test" title="测试中心" description="选择 20 / 50 / 100 题，自动统计正确率、错误率、耗时和错误分析。" /><TestPanel /></PageShell>; }
