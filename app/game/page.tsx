"use client";

import { useMemo, useState } from "react";
import { PartyPopper, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PageShell } from "@/components/page-shell";
import { SectionHeading } from "@/components/section-heading";
import { kanaData } from "@/data/kana";
import { shuffle } from "@/lib/utils";

const targetScore = 100;
export default function Page() {
  const [score, setScore] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [finished, setFinished] = useState(false);
  const [target, setTarget] = useState(() => shuffle(kanaData)[0]);
  const tiles = useMemo(() => shuffle([target, ...shuffle(kanaData.filter((item) => item.id !== target.id)).slice(0, 8)]), [target]);
  function restart() { setScore(0); setMistakes(0); setFinished(false); setTarget(shuffle(kanaData)[0]); }
  function hit(id: string) { if (finished) return; const ok = id === target.id; const nextScore = ok ? score + 10 : Math.max(0, score - 3); if (!ok) setMistakes((v) => v + 1); setScore(nextScore); if (nextScore >= targetScore) setFinished(true); else setTarget(shuffle(kanaData)[0]); }
  return <PageShell><SectionHeading eyebrow="Games" title="小游戏中心" description="快速点击正确假名，达到目标分数后自动结束本轮。" /><div className="glass mx-auto max-w-4xl rounded-3xl p-6"><div className="mb-6 flex items-center justify-between"><div><p className="text-sm text-muted-foreground">快速点击目标</p><h2 className="text-4xl font-semibold">{finished ? "完成挑战" : target.romaji}</h2></div><div className="rounded-full bg-foreground px-4 py-2 font-semibold text-background">{score}</div></div><Progress value={Math.min(100, (score / targetScore) * 100)} className="mb-6" />{finished ? <div className="rounded-3xl bg-background/45 p-8 text-center"><PartyPopper className="mx-auto h-9 w-9 text-primary" /><h3 className="mt-4 text-3xl font-semibold">本轮结束</h3><p className="mt-3 text-muted-foreground">得分 {score} / {targetScore}，错误点击 {mistakes} 次。</p><Button className="mt-6" onClick={restart}><RotateCcw className="h-4 w-4" />再玩一轮</Button></div> : <div className="grid grid-cols-3 gap-4">{tiles.map((tile) => <button key={tile.id} onClick={() => hit(tile.id)} className="aspect-square rounded-2xl border border-border bg-background/50 text-4xl font-semibold transition hover:-translate-y-1 hover:border-primary hover:shadow-glow active:scale-95 sm:text-5xl">{tile.hiragana}</button>)}</div>}</div></PageShell>;
}
