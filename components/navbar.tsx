"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { useTheme } from "next-themes";
import { Globe2, Moon, Search, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { KanaDrawer } from "@/components/kana/kana-drawer";
import { findKana } from "@/data/kana";
import { cn } from "@/lib/utils";
import type { KanaItem } from "@/types/kana";

const navItems = [["首页", "/"], ["平假名", "/hiragana"], ["片假名", "/katakana"], ["浊音", "/dakuten"], ["半浊音", "/handakuten"], ["拗音", "/youon"], ["练习", "/practice"], ["测试", "/test"], ["游戏", "/game"], ["发音", "/pronunciation"], ["关于", "/about"]] as const;

export function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<KanaItem | null>(null);
  const results = useMemo(() => findKana(query).slice(0, 6), [query]);
  const searchBox = (
    <div className="relative">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search ka / shi / さ" className="focus-ring h-10 w-full rounded-xl border border-border/70 bg-background/60 pl-9 pr-3 text-sm backdrop-blur-xl" />
      {results.length ? <div className="glass absolute right-0 top-12 z-50 w-full overflow-hidden rounded-xl p-2">{results.map((kana) => <button key={kana.id} onClick={() => { setSelected(kana); setQuery(""); }} className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition hover:bg-muted"><span className="text-2xl font-semibold">{kana.hiragana}</span><span className="text-sm text-muted-foreground">{kana.katakana}</span><span className="ml-auto text-sm">{kana.romaji}</span></button>)}</div> : null}
    </div>
  );
  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-40 border-b border-border/60 bg-background/65 backdrop-blur-2xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6">
          <Link href="/" className="mr-2 flex items-center gap-2 font-semibold"><span className="grid h-8 w-8 place-items-center rounded-lg bg-foreground text-background">あ</span><span className="hidden sm:inline">Kana Lux</span></Link>
          <nav className="hidden min-w-0 flex-1 items-center gap-1 overflow-x-auto lg:flex">{navItems.map(([label, href]) => <Link key={href} href={href} className={cn("rounded-lg px-3 py-2 text-sm text-muted-foreground transition hover:bg-muted hover:text-foreground", pathname === href && "bg-muted text-foreground")}>{label}</Link>)}</nav>
          <div className="ml-auto hidden w-[260px] md:block">{searchBox}</div>
          <Button variant="ghost" size="icon" aria-label="Toggle dark mode" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}><Sun className="h-4 w-4 dark:hidden" /><Moon className="hidden h-4 w-4 dark:block" /></Button>
          <Button variant="ghost" size="icon" aria-label="Language"><Globe2 className="h-4 w-4" /></Button>
        </div>
        <nav className="flex gap-1 overflow-x-auto px-4 pb-3 lg:hidden">{navItems.map(([label, href]) => <Link key={href} href={href} className={cn("shrink-0 rounded-full px-3 py-1.5 text-xs text-muted-foreground", pathname === href && "bg-muted text-foreground")}>{label}</Link>)}</nav>
        <div className="px-4 pb-3 md:hidden">{searchBox}</div>
      </header>
      <KanaDrawer kana={selected} open={Boolean(selected)} onOpenChange={(open) => !open && setSelected(null)} />
    </>
  );
}
