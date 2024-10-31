"use client";
import React from "react";
import { Card, Typography } from "..";

const SummaryCardSkeleton = ({ className }) => {
  return (
    <div className={className}>
      <Card className="md:col-span-3 col-span-12 flex-col flex gap-1 py-5 px-4">
        {/* Icon and Title Section */}
        <div className="flex gap-4 items-center w-full flex-auto md:flex-initial">
          <div className="rounded-full border-2 w-min h-min p-1.5 border-primary">
            {/* Icon Placeholder */}
            <div className="bg-gray-300 rounded-full w-8 h-8"></div>
          </div>
          <div className="flex gap-7 items-center">
            <div>
              {/* Title Placeholder */}
              <div className="w-20 h-5 bg-gray-200 rounded-md mb-1"></div>
              {/* Subtitle Placeholder */}
              <div className="w-12 h-3 bg-gray-300 rounded-md"></div>
            </div>
            {/* Value Placeholder */}
            <div className="w-12 h-6 bg-gray-200 rounded-md"></div>
          </div>
        </div>

        {/* Button Placeholder */}
        <div className="w-full text-center py-2 mt-5 bg-gray-100 rounded-md">
          <div className="w-1/3 h-4 bg-gray-300 rounded-md mx-auto"></div>
        </div>
      </Card>
    </div>
  );
};

export default SummaryCardSkeleton;
