import React from "react";
import { Typography } from "@/src/components";

const MountChartSkeleton = () => {
  return (
    <div className="relative flex flex-col rounded-xl bg-[#E7FDF1] text-[#1F4B47] shadow-md animate-pulse">
      <div className="pt-6 px-2 pb-0">
        {/* Title Skeleton */}
        <div className="px-3 mb-4">
          <Typography variant="h4" className="font-semibold">
            <div className="h-6 bg-gray-300 rounded w-3/4 mx-auto"></div>
          </Typography>
        </div>

        {/* Dropdowns Skeleton */}
        <div className="flex gap-4 mt-4 px-3">
          <div className="w-1/3 h-10 bg-gray-300 rounded"></div>
          <div className="w-1/3 h-10 bg-gray-300 rounded"></div>
        </div>

        {/* Chart Skeleton */}
        <div className="px-3 mt-6 mb-6">
          <div className="h-48 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default MountChartSkeleton;
