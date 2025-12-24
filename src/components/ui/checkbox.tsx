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
      className={cn(
        "peer border border-[var(--border)] bg-[var(--surface)] data-[state=checked]:bg-[var(--primary)] data-[state=checked]:text-[var(--primary-contrast)] data-[state=checked]:border-[var(--primary)] size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:border-[var(--focus-ring)] focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] aria-invalid:border-[var(--danger)] aria-invalid:ring-2 aria-invalid:ring-[var(--danger)] disabled:cursor-not-allowed disabled:opacity-50",
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
