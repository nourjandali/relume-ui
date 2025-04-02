"use client";

import * as React from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { DayPicker, CustomComponents } from "react-day-picker";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./button";

interface ExtendedCustomComponents extends CustomComponents {
  PrevButton?: React.ElementType;
  NextButton?: React.ElementType;
}

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "secondary" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell: "text-text-secondary w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-outside)]:bg-neutral-darkest/50 [&:has([aria-selected])]:bg-neutral-darkest focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
        ),
        day_range_end: "day-range-end",
        day_selected:
          "bg-scheme-1-background text-white hover:bg-scheme-1-background hover:text-white focus:bg-scheme-1-background focus:text-white",
        day_today: "bg-neutral-darkest/70 text-white",
        day_outside:
          "day-outside text-text-secondary aria-selected:bg-neutral-darkest/50 aria-selected:text-text-secondary",
        day_disabled: "text-text-secondary opacity-50",
        day_range_middle:
          "aria-selected:bg-neutral-darkest aria-selected:text-neutral-darkest-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={
        {
          PrevButton: ({ ...props }) => (
            <BiChevronLeft className="h-4 w-4" {...props} />
          ),
          NextButton: ({ ...props }) => (
            <BiChevronRight className="h-4 w-4" {...props} />
          ),
        } as Partial<ExtendedCustomComponents>
      }
      {...props}
    />
  );
}

Calendar.displayName = "Calendar";

export { Calendar };
