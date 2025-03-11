import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const cardVariants = cva("overflow-hidden rounded-card", {
  variants: {
    variant: {
      default:
        "border border-neutral-darkest-15 bg-corvette-lighter text-neutral-darkest",

      // Relume defaults
      transparent:
        "border border-border-alternative bg-transparent text-text-alternative",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        cardVariants({
          variant,
          className,
        })
      )}
      {...props}
    />
  )
);
Card.displayName = "Card";

const BackgroundCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("rounded-card overflow-hidden", className)}
    {...props}
  />
));
BackgroundCard.displayName = "BackgroundCard";

export { Card, BackgroundCard };
