"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const inputVariants = cva(
  "rounded-input flex size-full min-h-11 py-2 align-middle transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "border border-neutral-darkest-15 bg-neutral-darkest-5 text-neutral-black hover:bg-neutral-darkest-15 placeholder:text-neutral-darkest-60",
      },
      size: {
        default: "min-h-11 px-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

type CustomProps = {
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  prefix?: string;
  prefixPosition?: "left" | "right";
};

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    CustomProps,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      icon,
      iconPosition = "left",
      prefix,
      prefixPosition = "left",
      variant,
      size,
      ...props
    },
    ref
  ) => {
    return (
      <div className="relative flex w-full items-center">
        {icon && iconPosition === "left" && (
          <div className="absolute left-3">{icon}</div>
        )}
        {prefix && prefixPosition === "left" && (
          <div className="min-h-11 shrink-0 border-y border-l border-border-primary px-3 py-2">
            {prefix}
          </div>
        )}
        <input
          type={type}
          className={cn(
            inputVariants({ variant, size }),
            icon && (iconPosition === "left" ? "pr-3 pl-11" : "pr-11 pl-3"),
            prefix && "grow-1",
            className
          )}
          ref={ref}
          {...props}
        />
        {icon && iconPosition === "right" && (
          <div className="absolute right-3">{icon}</div>
        )}
        {prefix && prefixPosition === "right" && (
          <div className="min-h-11 shrink-0 border-y border-r border-border-primary px-3 py-2">
            {prefix}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
