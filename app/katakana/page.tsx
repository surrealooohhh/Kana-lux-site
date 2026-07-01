import { KanaGrid } from "@/components/kana/kana-grid";
import { PageShell } from "@/components/page-shell";
import { SectionHeading } from "@/components/section-heading";
import { gojuon } from "@/data/kana";

export default function Page() { return <PageShell><SectionHeading eyebrow="Katakana" title="片假名" description="用于外来语、拟声词和强调表达的片假名训练。" /><KanaGrid items={gojuon.map((item) => ({ ...item, hiragana: item.katakana, katakana: item.hiragana }))} /></PageShell>; }
