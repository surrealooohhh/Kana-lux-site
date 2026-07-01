import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function PageShell({ children, className }: { children: ReactNode; className?: string }) {
  return <main className={cn("mx-auto min-h-dvh w-full max-w-7xl px-4 pb-20 pt-40 sm:px-6 md:pt-28", className)}>{children}</main>;
}
