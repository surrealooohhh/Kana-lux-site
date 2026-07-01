"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const variants = cva("focus-ring inline-flex h-10 items-center justify-center gap-2 rounded-lg px-4 text-sm font-medium transition active:scale-[0.98] disabled:opacity-50", {
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground shadow-glow hover:brightness-110",
      secondary: "glass text-foreground hover:bg-white/70 dark:hover:bg-white/10",
      ghost: "hover:bg-muted",
      outline: "border border-border bg-background/40 hover:bg-muted"
    },
    size: { default: "h-10 px-4", sm: "h-9 px-3", icon: "h-10 w-10 px-0", lg: "h-12 px-6 text-base" }
  },
  defaultVariants: { variant: "default", size: "default" }
});

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof variants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, asChild, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return <Comp ref={ref} className={cn(variants({ variant, size, className }))} {...props} />;
});
Button.displayName = "Button";
