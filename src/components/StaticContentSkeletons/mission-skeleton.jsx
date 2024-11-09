import { Pannel } from "@/src/components";
import React from "react";

export const MissionStatementSkeleton = () => {
  return (
    <Pannel className="grid lg:grid-cols-2 gap-5 md:flex-row w-full items-center sm:gap-3 h-full animate-pulse">
      {/* Left Side - Skeleton for Images */}
      <div className="relative flex">
        <div className="h-64 md:h-96 w-full md:w-[80%] lg:w-[80%] bg-gray-200 rounded-md"></div>
        <div className="absolute hidden md:flex justify-end items-center w-full h-full -ml-5">
          <div className="hidden md:block w-60 h-48 bg-gray-200 rounded-md object-cover"></div>
        </div>
      </div>

      {/* Right Side - Skeleton for Text */}
      <div className="flex flex-col justify-center gap-5">
        {/* Title Skeleton */}
        <div className="h-8 w-3/4 bg-gray-300 rounded-md"></div>

        {/* Description Skeleton */}
        <div className="space-y-3">
          <div className="h-4 w-full bg-gray-200 rounded-md"></div>
          <div className="h-4 w-5/6 bg-gray-200 rounded-md"></div>
          <div className="h-4 w-4/6 bg-gray-200 rounded-md"></div>
        </div>
      </div>
    </Pannel>
  );
};
