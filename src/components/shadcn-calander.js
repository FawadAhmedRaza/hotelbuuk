"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { format, differenceInDays } from "date-fns";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/src/components/ui/shadCn-button";

function ShadCnCalendar({
  selected,
  onSelect,
  disabled,
  className,
  classNames,
  showOutsideDays = true,
  ...props
}) {
  return (
    <DayPicker
      mode="range"
      selected={selected}
      onSelect={onSelect}
      showOutsideDays={showOutsideDays}
      disabled={disabled}
      className={cn(
        "p-10 bg-white text-black border-2 border-red-600  !rounded-none shadow-lg transition-all duration-300",
        className
      )}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-6 sm:space-x-6 sm:space-y-0",
        month: "space-y-6",
        caption: "flex justify-center py-2 relative items-center bg-gray-100",
        caption_label: "text-lg font-medium bg-gray-100 text-black",
        nav: "space-x-2 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-9 w-9 bg-black text-white p-0 opacity-70 hover:opacity-100 transition-opacity duration-300"
        ),
        nav_button_previous: "absolute left-2 bg-white",
        nav_button_next: "absolute right-2 bg-white",
        table: "w-full border-collapse space-y-2",
        head_row: "flex",
        head_cell:
          "text-muted-foreground !rounded=none w-12 font-normal text-[1rem] text-black",
        row: "flex w-full mt-3",
        cell: "h-12 w-12 text-center text-base p-0 relative transition-all duration-200 ease-in-out transform hover:scale-105",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-12 w-12 p-0 font-medium aria-selected:opacity-100 transition-all duration-200 ease-in-out"
        ),
        day_selected:
          "bg-black text-primary-foreground hover:bg-gray-100 !hover:text-gray-300-foreground !focus:bg-gray-100 focus:text-primary-foreground",
        day_range_start: "!bg-black text-white !rounded-full", // Rounded style with white text for start date
        day_range_end: "!bg-black text-white !rounded-full", // Rounded style with white text for end date
        day_range_middle: "bg-gray-200 text-black", // Gray background for dates between start and end
        day_today: "text-black font-semibold", // Today's date style
        day_outside: "text-muted-foreground opacity-50",
        day_disabled: "text-muted-foreground opacity-50",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: (props) => <ChevronLeft className="h-5 w-5 text-black" />,
        IconRight: (props) => <ChevronRight className="h-5 w-5 text-black" />,
      }}
      {...props}
    />
  );
}

export function DateRangeSelector() {
  const [range, setRange] = React.useState({ from: null, to: null });

  const handleSelect = (newRange) => {
    // Check if a new range has been selected from the start
    if (newRange?.from && newRange?.from !== range.from) {
      setRange({ from: newRange.from, to: null }); // Reset range to start from new date
    } else if (newRange?.to) {
      // Set the range only when the end date is selected
      setRange(newRange);
    } else {
      // If only one date is selected, set it as the start date
      setRange(newRange);
    }
  };

  const clearDates = () => {
    setRange({ from: null, to: null });
  };

  const nights =
    range.from && range.to ? differenceInDays(range.to, range.from) : 0;

  return (
    <div className="flex flex-col items-center space-y-4">
      <h2 className="text-lg font-bold">
        {nights > 0 ? `${nights} nights in Sohna` : "Select your stay"}
      </h2>
      {range.from && range.to && (
        <p className="text-gray-700">
          {format(range.from, "MMM d, yyyy")} -{" "}
          {format(range.to, "MMM d, yyyy")}
        </p>
      )}
      <ShadCnCalendar selected={range} onSelect={handleSelect} />
      <button onClick={clearDates} className="mt-4 text-blue-600 underline">
        Clear dates
      </button>
    </div>
  );
}

ShadCnCalendar.displayName = "ShadCnCalendar";

export { ShadCnCalendar };
