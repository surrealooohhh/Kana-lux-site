"use client";

import { useMemo, useRef, useState } from "react";
import { CheckCircle2, Keyboard, PartyPopper, RotateCcw, Shuffle, Volume2, XCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/components/providers/language-provider";
import { kanaData } from "@/data/kana";
import { useKanaProgress } from "@/hooks/use-kana-progress";
import { shuffle, speak } from "@/lib/utils";
import type { KanaItem } from "@/types/kana";

type Mode = "kana-romaji" | "audio-kana" | "romaji-kana" | "input" | "spelling";
const questionCount = 20;
const createQuestions = () => shuffle(kanaData).slice(0, questionCount);
const expected = (mode: Mode, item: KanaItem) => {
  if (mode === "kana-romaji") return item.romaji;
  if (mode === "input") return item.katakana;
  return item.hiragana;
};

export function PracticePanel() {
  const { language } = useLanguage();
  const isZh = language === "zh";
  const [mode, setMode] = useState<Mode>("kana-romaji");
  const [questions, setQuestions] = useState<KanaItem[]>(() => createQuestions());
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [mistakes, setMistakes] = useState<string[]>([]);
  const [done, setDone] = useState(false);
  const [feedback, setFeedback] = useState<"ok" | "no" | null>(null);
  const [celebrate, setCelebrate] = useState(false);
  const [input, setInput] = useState("");
  const locked = useRef(false);
  const { addRecord } = useKanaProgress();
  const current = questions[Math.min(index, questions.length - 1)];
  const choices = useMemo(() => shuffle([current, ...shuffle(kanaData.filter((item) => item.id !== current.id)).slice(0, 3)]), [current]);
  const progress = done ? 100 : (index / questions.length) * 100;
  const accuracy = Math.round((score / questions.length) * 100);

  function reset(nextMode = mode) {
    locked.current = false;
    setMode(nextMode);
    setQuestions(createQuestions());
    setIndex(0);
    setScore(0);
    setMistakes([]);
    setDone(false);
    setFeedback(null);
    setCelebrate(false);
    setInput("");
  }
  function requestModeChange(nextMode: string) {
    if (nextMode === mode) return;
    if ((index > 0 || score > 0 || input) && !done && !window.confirm(isZh ? "这样做会结束当前练习，是否确认？" : "This will end the current round. Continue?")) return;
    reset(nextMode as Mode);
  }
  function answer(value: string) {
    if (locked.current || done) return;
    locked.current = true;
    const ok = value.trim().toLowerCase() === expected(mode, current).toLowerCase();
    const nextScore = score + (ok ? 1 : 0);
    const nextMistakes = ok ? mistakes : [...mistakes, `${current.hiragana} = ${expected(mode, current)}`];
    setFeedback(ok ? "ok" : "no");
    if (ok) {
      setScore(nextScore);
      setCelebrate(true);
      setTimeout(() => setCelebrate(false), 900);
    } else setMistakes(nextMistakes);
    setTimeout(() => {
      const nextIndex = index + 1;
      setIndex(nextIndex);
      locked.current = false;
      if (nextIndex >= questions.length) {
        setDone(true);
        setCelebrate(true);
        addRecord({ id: `practice:${mode}`, correct: nextScore, total: questions.length });
      } else {
        setFeedback(null);
        setInput("");
      }
    }, 700);
  }
  return (
    <div className="mx-auto max-w-4xl">
      <Tabs value={mode} onValueChange={requestModeChange}><TabsList className="mb-8 flex w-full overflow-x-auto"><TabsTrigger value="kana-romaji">{isZh ? "看假名选读音" : "Kana To Sound"}</TabsTrigger><TabsTrigger value="audio-kana">{isZh ? "听发音选假名" : "Audio To Kana"}</TabsTrigger><TabsTrigger value="romaji-kana">{isZh ? "看罗马音选假名" : "Romaji To Kana"}</TabsTrigger><TabsTrigger value="input">{isZh ? "看平假名输入片假名" : "Hiragana To Katakana"}</TabsTrigger><TabsTrigger value="spelling">{isZh ? "拼写练习" : "Spelling"}</TabsTrigger></TabsList></Tabs>
      <div className="glass relative overflow-hidden rounded-3xl p-6 sm:p-8">
        <Celebration active={celebrate} />
        <div className="mb-6 flex items-center justify-between gap-4"><div><p className="text-sm text-muted-foreground">{isZh ? "题目" : "Question"} {Math.min(index + 1, questions.length)} / {questions.length}</p><h2 className="mt-1 text-2xl font-semibold">{done ? (isZh ? "本轮练习完成" : "Round Complete") : (isZh ? "即时评分练习" : "Instant Practice")}</h2></div><div className="rounded-full bg-foreground px-4 py-2 text-sm font-semibold text-background">{score} {isZh ? "分" : "pts"}</div></div>
        <Progress value={progress} className="mb-8" />
        {done ? <div className="rounded-3xl bg-background/45 p-6 text-center"><PartyPopper className="mx-auto h-8 w-8 text-primary" /><h3 className="mt-4 text-3xl font-semibold">{isZh ? "练习结果" : "Practice Results"}</h3><div className="mt-6 grid gap-4 sm:grid-cols-3"><Metric label={isZh ? "正确题数" : "Correct"} value={`${score}/${questions.length}`} /><Metric label={isZh ? "正确率" : "Accuracy"} value={`${accuracy}%`} /><Metric label={isZh ? "错误题数" : "Incorrect"} value={`${questions.length - score}`} /></div><div className="mt-5 rounded-2xl bg-background/55 p-4 text-left"><h4 className="font-semibold">{isZh ? "错误回顾" : "Review"}</h4><p className="mt-2 text-sm leading-6 text-muted-foreground">{mistakes.length ? mistakes.join(isZh ? "、" : ", ") : (isZh ? "本轮没有错误，保持这个节奏。" : "No mistakes this round. Keep the rhythm.")}</p></div><Button className="mt-6" onClick={() => reset()}><RotateCcw className="h-4 w-4" />{isZh ? "再练一轮" : "Practice Again"}</Button></div> : <>
          <div className="grid place-items-center rounded-3xl bg-background/45 p-10 text-center">{mode === "audio-kana" ? <Button size="lg" onClick={() => speak(current.hiragana)}><Volume2 className="h-5 w-5" /> {isZh ? "播放发音" : "Play Audio"}</Button> : mode === "romaji-kana" || mode === "spelling" ? <div className="text-6xl font-semibold">{current.romaji}</div> : <div className="text-8xl font-semibold">{current.hiragana}</div>}</div>
          {mode === "input" || mode === "spelling" ? <div className="mt-6 flex gap-3"><input value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => event.key === "Enter" && answer(input)} className="focus-ring h-12 flex-1 rounded-xl border border-border bg-background/60 px-4 text-lg" placeholder={mode === "input" ? (isZh ? "输入对应片假名" : "Enter the matching katakana") : (isZh ? "输入正确假名" : "Enter the correct kana")} /><Button onClick={() => answer(input)}><Keyboard className="h-4 w-4" />{isZh ? "提交" : "Submit"}</Button></div> : <div className="mt-6 grid gap-3 sm:grid-cols-2">{choices.map((choice) => <Button key={choice.id} variant="secondary" size="lg" onClick={() => answer(mode === "kana-romaji" ? choice.romaji : choice.hiragana)}>{mode === "kana-romaji" ? choice.romaji : choice.hiragana}</Button>)}</div>}
          <div className="mt-5 flex h-8 items-center justify-center gap-2 text-sm font-medium">{feedback === "ok" ? <><CheckCircle2 className="h-5 w-5 text-emerald-500" />{isZh ? "正确" : "Correct"}</> : feedback === "no" ? <><XCircle className="h-5 w-5 text-rose-500" />{isZh ? "正确答案：" : "Answer: "}{expected(mode, current)}</> : <><Shuffle className="h-4 w-4 text-muted-foreground" />{isZh ? "系统已随机混合题目" : "Questions are shuffled"}</>}</div>
        </>}
      </div>
    </div>
  );
}
function Metric({ label, value }: { label: string; value: string }) { return <div className="rounded-2xl bg-background/55 p-4"><div className="text-3xl font-semibold">{value}</div><div className="mt-1 text-sm text-muted-foreground">{label}</div></div>; }
function Celebration({ active }: { active: boolean }) { return active ? <div className="pointer-events-none absolute inset-x-0 top-4 z-10 flex justify-center">{[0, 1, 2, 3, 4].map((item) => <motion.span key={item} initial={{ opacity: 0, y: 8, scale: 0.6 }} animate={{ opacity: [0, 0.8, 0], y: -36, scale: [0.6, 1, 0.9] }} transition={{ duration: 0.9, delay: item * 0.05 }} className="mx-1 h-2 w-2 rounded-full bg-primary" />)}</div> : null; }
