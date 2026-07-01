import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/page-shell";

export default function NotFound() { return <PageShell className="grid place-items-center text-center"><div><h1 className="text-7xl font-semibold">404</h1><p className="mt-4 text-muted-foreground">这个页面还没有假名落点。</p><Button asChild className="mt-8"><Link href="/">回到首页</Link></Button></div></PageShell>; }
