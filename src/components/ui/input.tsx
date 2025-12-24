import * as React from "react";

import { cn } from "./utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-[var(--text)] placeholder:text-[var(--text-muted)] selection:bg-[var(--primary)] selection:text-[var(--surface)] flex h-9 w-full min-w-0 rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-base text-[var(--text)] transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-[var(--focus-ring)] focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]",
        "aria-invalid:border-[var(--danger)] aria-invalid:ring-2 aria-invalid:ring-[var(--danger)]",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
