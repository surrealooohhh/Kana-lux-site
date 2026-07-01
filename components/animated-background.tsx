"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export function AnimatedBackground() {
  const root = useRef<HTMLDivElement>(null);
  const frame = useRef<number | null>(null);
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".particle", { y: "random(-44, 44)", x: "random(-44, 44)", opacity: "random(0.2, 0.55)", duration: "random(5, 9)", repeat: -1, yoyo: true, ease: "sine.inOut", stagger: 0.12 });
    }, root);
    const onMove = (event: MouseEvent) => {
      pointer.current = { x: (event.clientX / window.innerWidth - 0.5) * 14, y: (event.clientY / window.innerHeight - 0.5) * 14 };
      if (frame.current) return;
      frame.current = requestAnimationFrame(() => {
        root.current?.style.setProperty("--mx", `${pointer.current.x}px`);
        root.current?.style.setProperty("--my", `${pointer.current.y}px`);
        frame.current = null;
      });
    };
    window.addEventListener("pointermove", onMove);
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frame.current) cancelAnimationFrame(frame.current);
      ctx.revert();
    };
  }, []);

  return (
    <div ref={root} aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.20),transparent_34%),radial-gradient(circle_at_80%_10%,rgba(168,85,247,0.18),transparent_32%),linear-gradient(180deg,hsl(var(--background)),hsl(var(--background)))] [--mx:0px] [--my:0px]">
      <div className="absolute left-1/2 top-24 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-cyan-300/16 blur-3xl animate-aurora dark:bg-cyan-400/12" />
      <div className="absolute bottom-10 right-0 h-[26rem] w-[26rem] rounded-full bg-fuchsia-300/16 blur-3xl animate-aurora [animation-delay:-8s] dark:bg-fuchsia-400/10" />
      <div className="absolute inset-0 translate-x-[var(--mx)] translate-y-[var(--my)] transform-gpu">
        {Array.from({ length: 18 }).map((_, index) => <span key={index} className="particle absolute h-1 w-1 rounded-full bg-foreground/35" style={{ left: `${(index * 37) % 100}%`, top: `${(index * 53) % 100}%` }} />)}
      </div>
    </div>
  );
}
