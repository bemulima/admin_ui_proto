"use client";

import * as React from "react";

import { cn } from "./utils";

type CheckboxProps = Omit<
  React.ComponentPropsWithoutRef<"input">,
  "type" | "onChange"
> & {
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onCheckedChange?: (checked: boolean) => void;
};

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, onChange, onCheckedChange, ...props }, ref) => {
    const isControlled = typeof props.checked === "boolean";
    const hasChangeHandler = Boolean(onChange || onCheckedChange);
    return (
      <input
        ref={ref}
        type="checkbox"
        className={cn(
          "appearance-none relative size-4 shrink-0 rounded-[4px] border border-[hsl(var(--border))] bg-[hsl(var(--surface))] shadow-xs transition-shadow hover:bg-[hsl(var(--surface-2))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--focus-ring))] focus-visible:ring-offset-0 checked:bg-[hsl(var(--primary))] checked:border-[hsl(var(--primary))] checked:text-[hsl(var(--primary-contrast))] after:content-[''] after:absolute after:left-1/2 after:top-1/2 after:h-2.5 after:w-1.5 after:-translate-x-1/2 after:-translate-y-1/2 after:rotate-45 after:border-r-2 after:border-b-2 after:border-current after:opacity-0 checked:after:opacity-100 disabled:bg-[hsl(var(--surface-2))] disabled:border-[hsl(var(--border))] disabled:text-[hsl(var(--text-muted))] disabled:opacity-50 disabled:cursor-not-allowed disabled:checked:text-[hsl(var(--text-muted))]",
          className,
        )}
        onChange={(event) => {
          onChange?.(event);
          onCheckedChange?.(event.currentTarget.checked);
        }}
        readOnly={props.readOnly ?? (isControlled && !hasChangeHandler)}
        {...props}
      />
    );
  },
);

Checkbox.displayName = "Checkbox";

export { Checkbox };
