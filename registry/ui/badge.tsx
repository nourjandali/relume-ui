"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-badge px-2 py-1 text-sm font-semibold focus:outline-none",
  {
    variants: {
      variant: {
        default:
          "border border-transparent bg-background-secondary text-text-primary",
        outline: "border border-border-primary text-text-primary",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        badgeVariants({
          variant,
        }),
        className
      )}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
