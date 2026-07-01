import { KanaGrid } from "@/components/kana/kana-grid";
import { PageShell } from "@/components/page-shell";
import { SectionHeading } from "@/components/section-heading";
import { dakuten } from "@/data/kana";

export default function Page() { return <PageShell><SectionHeading eyebrow="Voiced Sounds" title="浊音" description="加浊点后的声音更有声带振动。" /><KanaGrid items={dakuten} /></PageShell>; }
