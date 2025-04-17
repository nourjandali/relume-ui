"use client";

import * as React from "react";
import { Slot, Slottable } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "rounded-button inline-flex gap-3 items-center justify-center whitespace-nowrap transition-all duration-200 ease-in-out disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none",
  {
    variants: {
      variant: {
        default:
          "border-[1.5px] border-neutral-shade-7 text-neutral-shade-7 font-medium bg-chromatic1-shade-2 shadow-[inset_0_4px_0_0_var(--color-white-15),_inset_0_-5px_0_0_var(--color-neutral-shade-7-10),_0_2px_2px_0_var(--color-neutral-shade-7-10)] hover:bg-chromatic1-shade-1 hover:-translate-y-0.5 hover:shadow-[inset_0_4px_0_0_var(--color-white-15),inset_0_-5px_0_0_var(--color-neutral-shade-7-10),0_4px_4px_0_var(--color-neutral-shade-7-10)]",
        secondary:
          "border border-neutral-shade-7 bg-neutral-shade-1 text-neutral-shade-7 font-medium shadow-[inset_0_4px_0_0_var(--color-white-15),inset_0_-5px_0_0_var(--color-neutral-shade-7-10),0_2px_2px_0_var(--color-neutral-shade-7-10)] hover:bg-white hover:-translate-y-0.5",
        "secondary-alt":
          "border border-border-alternative text-text-alternative",
        tertiary: "text-text-primary",
        link: "border-0 text-text-primary gap-2 bg-transparent",
        "link-alt": "border-0 text-text-alternative gap-2",
        ghost: "hover:bg-background-alternative hover:text-text-alternative",
      },
      size: {
        default: "py-3 px-6",
        sm: "px-5 py-2",
        link: "p-0",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

type CustomProps = {
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  asChild?: boolean;
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    CustomProps,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      iconLeft,
      iconRight,
      children,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          buttonVariants({
            variant,
            size,
            className,
          })
        )}
        ref={ref}
        {...props}
      >
        {iconLeft && iconLeft}
        <Slottable>{children}</Slottable>
        {iconRight && iconRight}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
