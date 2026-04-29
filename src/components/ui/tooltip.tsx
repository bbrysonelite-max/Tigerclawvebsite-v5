/* eslint-disable react-refresh/only-export-components */
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import type { ReactNode } from "react";

export const TooltipProvider = ({
  children,
  delayDuration = 200,
}: {
  children: ReactNode;
  delayDuration?: number;
}) => (
  <TooltipPrimitive.Provider delayDuration={delayDuration}>
    {children}
  </TooltipPrimitive.Provider>
);

export const Tooltip = TooltipPrimitive.Root;
export const TooltipTrigger = TooltipPrimitive.Trigger;

export const TooltipContent = ({
  children,
  side = "top",
}: {
  children: ReactNode;
  side?: "top" | "right" | "bottom" | "left";
}) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      side={side}
      className="z-50 rounded-md bg-card text-card-foreground px-3 py-1.5 text-sm border border-border shadow-md"
    >
      {children}
    </TooltipPrimitive.Content>
  </TooltipPrimitive.Portal>
);
