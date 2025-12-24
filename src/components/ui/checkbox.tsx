"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "lucide-react";

import { cn } from "./utils";

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      data-ui="checkbox-v3"
      className={cn(
        "group peer border border-solid size-4 shrink-0 rounded-[4px] shadow-xs transition-shadow outline-none focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50 [--cb-bg:hsl(var(--surface))] [--cb-border:hsl(var(--border))] [--cb-ring:hsl(var(--border))] [--cb-fg:hsl(var(--primary-contrast))] hover:[--cb-bg:hsl(var(--surface-2))] data-[state=checked]:[--cb-bg:hsl(var(--primary))] data-[state=checked]:[--cb-border:hsl(var(--primary))] data-[state=checked]:[--cb-ring:hsl(var(--primary))] data-[state=checked]:[--cb-fg:hsl(var(--primary-contrast))] data-[state=checked]:hover:[--cb-bg:hsl(var(--primary))] disabled:[--cb-bg:hsl(var(--surface-2))] disabled:[--cb-border:hsl(var(--border))] disabled:[--cb-ring:hsl(var(--border))] disabled:[--cb-fg:hsl(var(--text-muted))] ![background:var(--cb-bg)] ![border-color:var(--cb-border)] ![color:var(--cb-fg)] ![--tw-ring-color:var(--cb-ring)] focus-visible:![--tw-ring-color:hsl(var(--focus-ring))]",
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-current transition-none"
      >
        <CheckIcon className="size-3.5" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
