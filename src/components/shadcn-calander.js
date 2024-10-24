"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { cn } from "@/lib/utils";
import { shadcnButtonVariants } from "./shadcn-button";

function ShadCnCalendar({ className, classNames, showOutsideDays = true, ...props }) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3  w-fit rounded-xl", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4 ",
        caption: "flex justify-center py-1 relative items-center",
        caption_label: "text-2xl font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          shadcnButtonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1 ",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse  ",
        head_row: "flex text-2xl  gap-4 ",
        head_cell: "text-muted-foreground rounded-md w-11 font-normal text-[0.8rem]",
        row: "flex w-full mt-1  gap-1 ",
        // Updated cell class for border
        cell: "h-14 w-14   text-center text-sm  p-1 relative flex justify-center   items-center border border border-gray-200 [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          shadcnButtonVariants({ variant: "ghost" }),
          "h-full w-full p-0 font-normal aria-selected:opacity-100     text-[15px]"
        ),
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary text-white mt-0.5 hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: () => <ChevronLeft className="h-4 w-4" />,
        IconRight: () => <ChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  );
}

ShadCnCalendar.displayName = "ShadCnCalendar";

export { ShadCnCalendar };
