import { KanaGrid } from "@/components/kana/kana-grid";
import { PageShell } from "@/components/page-shell";
import { SectionHeading } from "@/components/section-heading";
import { youon } from "@/data/kana";

export default function Page() { return <PageShell><SectionHeading eyebrow="Contracted Sounds" title="拗音" description="i 段假名与小 ゃ / ゅ / ょ 合成一拍。" /><KanaGrid items={youon} /></PageShell>; }
