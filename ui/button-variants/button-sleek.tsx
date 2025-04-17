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
          "border border-chromatic1-shade-4 bg-chromatic1-shade-4 text-primary-button font-medium hover:border-chromatic1-shade-5 hover:bg-chromatic1-shade-5 primary-alt:border-neutral-shade-7 primary-alt:bg-neutral-shade-7 primary-alt:text-white primary-alt:hover:border-neutral-shade-6 primary-alt:hover:bg-neutral-shade-6",
        secondary:
          "border border-neutral-shade-7-10 bg-transparent font-medium hover:bg-neutral-shade-7-5 alternate:border-white-15 alternate:hover:bg-white-10",
        "secondary-alt":
          "border border-border-alternative text-text-alternative",
        tertiary: "text-text-primary",
        link: "border-0 text-text-primary gap-2 bg-transparent",
        "link-alt": "border-0 text-text-alternative gap-2",
        ghost: "hover:bg-background-alternative hover:text-text-alternative",
      },
      size: {
        default: "py-2 px-3",
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
