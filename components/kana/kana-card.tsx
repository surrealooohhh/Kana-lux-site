"use client";

import { memo, type KeyboardEvent, type MouseEvent, useState } from "react";
import { motion } from "framer-motion";
import { Heart, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn, speak } from "@/lib/utils";
import type { KanaItem } from "@/types/kana";

function KanaCardBase({ kana, favorited, onSelect, onFavorite }: { kana: KanaItem; favorited?: boolean; onSelect: (kana: KanaItem) => void; onFavorite?: (id: string) => void }) {
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const compact = kana.hiragana.length > 1;
  function clickCard(event: MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const ripple = { id: Date.now(), x: event.clientX - rect.left, y: event.clientY - rect.top };
    setRipples((current) => [...current, ripple]);
    setTimeout(() => setRipples((current) => current.filter((item) => item.id !== ripple.id)), 620);
    onSelect(kana);
  }
  function keyCard(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Enter" || event.key === " ") { event.preventDefault(); onSelect(kana); }
  }
  return (
    <motion.div onClick={clickCard} onKeyDown={keyCard} role="button" tabIndex={0} initial={{ opacity: 0, y: 14, scale: 0.98 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true }} whileHover={{ y: -6, scale: 1.025 }} whileTap={{ scale: 0.96 }} transition={{ duration: 0.24 }} className="group relative aspect-[1.02] transform-gpu overflow-hidden rounded-2xl border border-white/35 bg-white/58 p-3 text-left shadow-glass backdrop-blur-xl outline-none transition-[border-color,box-shadow] duration-200 hover:border-cyan-300/80 hover:shadow-glow dark:border-white/10 dark:bg-white/[0.07] sm:p-4">
      {ripples.map((ripple) => <span key={ripple.id} className="pointer-events-none absolute h-8 w-8 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full bg-cyan-300/40" style={{ left: ripple.x, top: ripple.y }} />)}
      <div className="relative z-10 flex h-full flex-col">
        <div className="flex items-center justify-between">
          <span className="rounded-full bg-foreground/8 px-2 py-1 text-xs text-muted-foreground">{kana.row}</span>
          <button type="button" onClick={(event) => { event.stopPropagation(); onFavorite?.(kana.id); }} className="rounded-full p-1.5 transition hover:bg-muted" aria-label="Favorite kana"><Heart className={cn("h-4 w-4", favorited && "fill-rose-500 text-rose-500")} /></button>
        </div>
        <div className="grid flex-1 place-items-center text-center">
          <div>
            <div className={cn("font-semibold leading-none", compact ? "text-4xl sm:text-5xl lg:text-[3.4rem]" : "text-6xl sm:text-7xl")}>{kana.hiragana}</div>
            <div className="mt-2 translate-y-2 opacity-0 transition duration-200 group-hover:translate-y-0 group-hover:opacity-100">
              <div className={cn("font-medium", compact ? "text-2xl" : "text-3xl")}>{kana.katakana}</div>
              <div className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-primary sm:text-sm">{kana.romaji}</div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="min-w-0 truncate pr-2">{kana.examples[0]?.word}</span>
          <Button type="button" variant="ghost" size="icon" className="h-8 w-8" onClick={(event) => { event.stopPropagation(); speak(kana.hiragana); }} aria-label={`Play ${kana.romaji}`}><Volume2 className="h-4 w-4" /></Button>
        </div>
      </div>
    </motion.div>
  );
}
export const KanaCard = memo(KanaCardBase);
