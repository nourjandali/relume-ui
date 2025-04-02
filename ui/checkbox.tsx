"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { BiCheck, BiMinus } from "react-icons/bi";

import { cn } from "@/lib/utils";

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "size-[1.125rem] border border-scheme-1-border transition-all duration-200 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-neutral-darkest data-[state=checked]:text-white data-[state=indeterminate]:bg-scheme-1-background data-[state=indeterminate]:text-scheme-1-text",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-current")}
    >
      {props.checked === "indeterminate" ||
      props.defaultChecked === "indeterminate" ? (
        <BiMinus className="size-4" />
      ) : (
        <BiCheck className="size-4" />
      )}
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
