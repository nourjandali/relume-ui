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
        primary:
          "border border-border-primary bg-background-alternative text-text-alternative",
        secondary:
          "border border-border-primary text-text-primary bg-background-primary",
        "secondary-alt":
          "border border-border-alternative text-text-alternative",
        tertiary: "text-text-primary",
        link: "border-0 text-text-primary gap-2 bg-transparent",
        "link-alt": "border-0 text-text-alternative gap-2",
        ghost: "hover:bg-background-alternative hover:text-text-alternative",
      },
      size: {
        primary: "px-6 py-3",
        sm: "px-5 py-2",
        link: "p-0",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "primary",
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
