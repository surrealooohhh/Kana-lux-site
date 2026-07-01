import { PracticePanel } from "@/components/practice/practice-panel";
import { PageShell } from "@/components/page-shell";
import { SectionHeading } from "@/components/section-heading";

export default function Page() { return <PageShell><SectionHeading eyebrow="Practice" title="练习模式" description="选择、听辨、罗马音、输入和拼写练习，答题后即时反馈。" /><PracticePanel /></PageShell>; }
