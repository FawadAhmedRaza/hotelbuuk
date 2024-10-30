"use client";
import { Typography } from "@/src/components";
import { RHFRadio, RHFSelect } from "@/src/components/hook-form";
import { CheckBoxButton } from "@/src/components/ui/check-box-button";
import React, { useState } from "react";

const SideFilterSection = () => {
  const [rangeValue, setRangeValue] = useState(40); // Initialize with 40

  const handleChange = (event) => {
    setRangeValue(event.target.value); // Update state with slider value
  };
  return (
    <div className=" ">
      <div className="flex flex-col items-center space-y-4 ">
        <div className="w-full px-5 space-y-8">
          <div>
            <Typography variant="h6" className="font-semibold">
              Filter
            </Typography>
            <div className=" mt-4">
              <Typography variant="p">Price Range</Typography>
              <div className="relative w-full">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={rangeValue}
                  onChange={handleChange}
                  className="range range-primary w-full h-2 rounded-lg appearance-none cursor-pointer accent-black"
                  style={{
                    background: `linear-gradient(to right, #000000 ${rangeValue}%, #d1d5db ${rangeValue}%)`,
                  }}
                />
                <div
                  className="absolute top-0 left-0 transform -translate-x-1/2 -translate-y-8 bg-black text-white text-xs font-bold py-1 px-2 rounded-md"
                  style={{
                    left: `${rangeValue}%`,
                  }}
                >
                  {rangeValue}
                </div>
              </div>
              <p className="text-gray-700 text-xs font-medium">
                Selected price: {rangeValue}
              </p>
            </div>
          </div>

          <div>
            <Typography variant="h6" className="font-semibold">
              Refine Your Search
            </Typography>
            <div className=" space-y-3 mt-4">
              <CheckBoxButton label="Show Active Tasks" />
              <CheckBoxButton label="Hide Completed Items" />
              <CheckBoxButton label="Show Overdue Tasks" />
              <CheckBoxButton label="Include Archived Items" />
              <CheckBoxButton label="Filter By Priority" />
            </div>
          </div>
          <div>
            <Typography variant="h6" className="font-semibold">
              Task Filter Options
            </Typography>

            <div className=" mt-4 space-y-3">
              <CheckBoxButton label="Filter By Active" />
              <CheckBoxButton label="SSort By Date" />
              <CheckBoxButton label="Display My Items" />
              <CheckBoxButton label="Limit By Category" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideFilterSection;
