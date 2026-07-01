"use client";

import { Heart, Play, Volume2 } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { useKanaProgress } from "@/hooks/use-kana-progress";
import { cn, speak } from "@/lib/utils";
import type { KanaItem } from "@/types/kana";

export function KanaDrawer({ kana, open, onOpenChange }: { kana: KanaItem | null; open: boolean; onOpenChange: (open: boolean) => void }) {
  const { favoriteSet, toggleFavorite, markRecent } = useKanaProgress();
  if (!kana) return null;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <div className="h-full overflow-y-auto p-6">
          <DialogTitle className="text-5xl font-semibold">{kana.hiragana}</DialogTitle>
          <DialogDescription className="mt-2 text-base">{kana.katakana} · {kana.romaji} · {kana.jlpt}</DialogDescription>
          <div className="mt-6 grid grid-cols-3 gap-3">
            <Stat label="片假名" value={kana.katakana} />
            <Stat label="Romaji" value={kana.romaji} />
            <Stat label="笔画" value={String(kana.strokeCount)} />
          </div>
          <div className="mt-5 flex gap-2">
            <Button className="flex-1" onClick={() => { speak(kana.hiragana); markRecent(kana.id); }}><Volume2 className="h-4 w-4" />发音</Button>
            <Button variant="secondary" onClick={() => toggleFavorite(kana.id)}><Heart className={cn("h-4 w-4", favoriteSet.has(kana.id) && "fill-rose-500 text-rose-500")} />收藏</Button>
          </div>
          <div className="mt-6 rounded-2xl border border-border bg-background/45 p-5">
            <div className="mb-4 flex items-center justify-between"><h3 className="font-semibold">SVG 笔顺动画</h3><Play className="h-4 w-4 text-primary" /></div>
            <svg viewBox="0 0 180 120" className="h-36 w-full">
              <motion.path d="M35 78 C62 16 112 18 143 76" fill="none" stroke="currentColor" strokeWidth="10" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 0.7 }} className="text-primary" />
              <text x="90" y="74" textAnchor="middle" className="fill-foreground text-5xl font-semibold">{kana.hiragana}</text>
            </svg>
          </div>
          <Info title="中文解释" body={kana.zh} />
          <Info title="English" body={kana.en} />
          <Info title="例词" body={`${kana.examples[0]?.word} · ${kana.examples[0]?.meaningZh} · ${kana.examples[0]?.meaningEn}`} />
          <Info title="例句" body={`${kana.sentence.ja} / ${kana.sentence.zh} / ${kana.sentence.en}`} />
          <Info title="常见错误" body={kana.commonMistake} />
          <Info title="Mnemonic" body={kana.mnemonic} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
function Stat({ label, value }: { label: string; value: string }) {
  return <div className="rounded-2xl bg-background/55 p-4 text-center"><div className="text-3xl font-semibold">{value}</div><div className="mt-1 text-xs text-muted-foreground">{label}</div></div>;
}
function Info({ title, body }: { title: string; body: string }) {
  return <div className="mt-5 rounded-2xl bg-background/45 p-5"><h3 className="font-semibold">{title}</h3><p className="mt-2 leading-7 text-muted-foreground">{body}</p></div>;
}
