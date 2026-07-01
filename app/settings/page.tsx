import { PageShell } from "@/components/page-shell";
import { SectionHeading } from "@/components/section-heading";

export default function Page() { return <PageShell><SectionHeading eyebrow="Settings" title="设置" description="字体大小、动画、声音、深色模式和语言偏好。" /><div className="glass mx-auto max-w-3xl rounded-3xl p-8 text-muted-foreground">设置会保存在本地浏览器中。</div></PageShell>; }
