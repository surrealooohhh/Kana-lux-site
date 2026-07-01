import { KanaGrid } from "@/components/kana/kana-grid";
import { PageShell } from "@/components/page-shell";
import { SectionHeading } from "@/components/section-heading";
import { handakuten } from "@/data/kana";

export default function Page() { return <PageShell><SectionHeading eyebrow="P Sounds" title="半浊音" description="は 行加小圆点后变为 p 行。" /><KanaGrid items={handakuten} /></PageShell>; }
