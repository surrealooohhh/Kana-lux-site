"use client";

import type { ComponentPropsWithoutRef } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export const Dialog = DialogPrimitive.Root;
export const DialogTitle = DialogPrimitive.Title;
export const DialogDescription = DialogPrimitive.Description;

export function DialogContent({ className, children, ...props }: ComponentPropsWithoutRef<typeof DialogPrimitive.Content>) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-background/50 backdrop-blur-md" />
      <DialogPrimitive.Content className={cn("glass fixed right-3 top-3 z-50 h-[calc(100dvh-1.5rem)] w-[min(92vw,520px)] overflow-hidden rounded-2xl p-0", className)} {...props}>
        {children}
        <DialogPrimitive.Close className="focus-ring absolute right-4 top-4 rounded-full p-2 hover:bg-muted">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}
