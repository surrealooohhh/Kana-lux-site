"use client";

import { useMemo, useState } from "react";
import { Clock, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/components/providers/language-provider";
import { kanaData } from "@/data/kana";
import { shuffle } from "@/lib/utils";

export function TestPanel() {
  const { language } = useLanguage();
  const isZh = language === "zh";
  const [count, setCount] = useState(20);
  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [start, setStart] = useState(Date.now());
  const [wrong, setWrong] = useState<string[]>([]);
  const [questions, setQuestions] = useState(() => shuffle(kanaData).slice(0, 20));
  const current = questions[index];
  const done = index >= questions.length;
  const choices = useMemo(() => current ? shuffle([current, ...shuffle(kanaData.filter((item) => item.id !== current.id)).slice(0, 3)]) : [], [current]);
  function reset(nextCount = count) { setCount(nextCount); setIndex(0); setCorrect(0); setWrong([]); setStart(Date.now()); setQuestions(shuffle(kanaData).slice(0, Math.min(nextCount, kanaData.length))); }
  function answer(value: string) { if (!current) return; if (value === current.romaji) setCorrect((score) => score + 1); else setWrong((items) => [...items, `${current.hiragana} = ${current.romaji}`]); setIndex((value) => value + 1); }
  if (done) { const seconds = Math.round((Date.now() - start) / 1000); const accuracy = Math.round((correct / questions.length) * 100); return <div className="glass mx-auto max-w-3xl rounded-3xl p-8"><h2 className="text-3xl font-semibold">{isZh ? "测试完成" : "Test Complete"}</h2><div className="mt-6 grid gap-4 sm:grid-cols-3"><Metric label={isZh ? "正确率" : "Accuracy"} value={`${accuracy}%`} /><Metric label={isZh ? "错误率" : "Error Rate"} value={`${100 - accuracy}%`} /><Metric label={isZh ? "耗时" : "Time"} value={`${seconds}s`} /></div><div className="mt-6 rounded-2xl bg-background/50 p-5"><h3 className="font-semibold">{isZh ? "错误分析" : "Mistake Review"}</h3><p className="mt-2 text-muted-foreground">{wrong.length ? wrong.join(isZh ? "、" : ", ") : (isZh ? "没有错误，节奏很好。" : "No mistakes. Great rhythm.")}</p></div><Button className="mt-6" onClick={() => reset()}>{isZh ? "重新测试" : "Restart Test"}</Button></div>; }
  return <div className="glass mx-auto max-w-3xl rounded-3xl p-8"><div className="mb-6 flex flex-wrap items-center justify-between gap-3"><div className="flex gap-2">{[20, 50, 100].map((size) => <Button key={size} variant={count === size ? "default" : "secondary"} onClick={() => reset(size)}>{size}{isZh ? "题" : ""}</Button>)}</div><div className="flex items-center gap-2 text-sm text-muted-foreground"><Clock className="h-4 w-4" />{isZh ? "自动计时" : "Timed"}</div></div><Progress value={(index / questions.length) * 100} /><div className="my-8 grid place-items-center rounded-3xl bg-background/45 p-12"><div className="text-8xl font-semibold">{current?.hiragana}</div></div><div className="grid gap-3 sm:grid-cols-2">{choices.map((choice) => <Button key={choice.id} variant="secondary" size="lg" onClick={() => answer(choice.romaji)}><Target className="h-4 w-4" />{choice.romaji}</Button>)}</div></div>;
}
function Metric({ label, value }: { label: string; value: string }) { return <div className="rounded-2xl bg-background/50 p-5"><div className="text-3xl font-semibold">{value}</div><div className="mt-1 text-sm text-muted-foreground">{label}</div></div>; }
