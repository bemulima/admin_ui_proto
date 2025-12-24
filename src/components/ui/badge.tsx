import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium leading-tight whitespace-nowrap shrink-0 [&>svg]:size-3.5 [&>svg]:pointer-events-none transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]",
  {
    variants: {
      variant: {
        default:
          "border-[var(--border)] bg-[var(--surface-2)] text-[var(--text)]",
        secondary:
          "border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)]",
        primary:
          "border-[var(--primary)] bg-[var(--surface)] text-[var(--primary)]",
        success:
          "border-[var(--success)] bg-[var(--surface)] text-[var(--success)]",
        warning:
          "border-[var(--warning)] bg-[var(--surface)] text-[var(--warning)]",
        danger:
          "border-[var(--danger)] bg-[var(--surface)] text-[var(--danger)]",
        destructive:
          "border-[var(--danger)] bg-[var(--surface)] text-[var(--danger)]",
        outline:
          "border-[var(--border)] bg-transparent text-[var(--text)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

type BaseVariant = VariantProps<typeof badgeVariants>["variant"];
type BadgeVariant = BaseVariant | "status" | "role" | "tech";

const resolveStatusVariant = (status?: string): BaseVariant => {
  const normalized = status?.toLowerCase();
  switch (normalized) {
    case "active":
    case "approved":
    case "configured":
      return "success";
    case "draft":
    case "pending":
    case "not-configured":
      return "warning";
    case "inactive":
    case "archived":
      return "secondary";
    case "banned":
    case "error":
    case "changes-requested":
      return "danger";
    default:
      return "secondary";
  }
};

const resolveRoleVariant = (role?: string): BaseVariant => {
  const normalized = role?.toLowerCase();
  switch (normalized) {
    case "admin":
    case "moderator":
      return "primary";
    case "teacher":
      return "success";
    case "student":
    case "user":
    case "guest":
      return "secondary";
    default:
      return "secondary";
  }
};

const resolveVariant = (
  variant?: BadgeVariant,
  status?: string,
  role?: string,
): BaseVariant => {
  switch (variant) {
    case "status":
      return resolveStatusVariant(status);
    case "role":
      return resolveRoleVariant(role);
    case "tech":
      return "outline";
    default:
      return variant ?? "default";
  }
};

function Badge({
  className,
  variant,
  status,
  role,
  tech,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  Omit<VariantProps<typeof badgeVariants>, "variant"> & {
    variant?: BadgeVariant;
    status?: string;
    role?: string;
    tech?: string;
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "span";
  const resolvedVariant = resolveVariant(variant, status, role);

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant: resolvedVariant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
