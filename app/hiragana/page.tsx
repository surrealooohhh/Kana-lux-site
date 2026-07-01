import { KanaGrid } from "@/components/kana/kana-grid";
import { PageShell } from "@/components/page-shell";
import { SectionHeading } from "@/components/section-heading";
import { gojuon } from "@/data/kana";

export default function Page() { return <PageShell><SectionHeading eyebrow="Hiragana" title="平假名" description="基础五十音图。按行、随机、收藏和最近学习自由切换。" /><KanaGrid items={gojuon} /></PageShell>; }
