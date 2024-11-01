import React from "react";
import { cn } from "@/lib/utils";

export const HotelCardSkeleton = ({ className }) => {
  return (
    <div className={cn("relative w-full animate-pulse", className)}>
      <div className="w-full h-full relative">
        {/* Image Placeholder */}
        <div className="h-80 relative bg-gray-100 rounded-3xl overflow-hidden">
          <div className="absolute rounded-3xl inset-0 bg-gray-100 "></div>
        </div>

        {/* Main Overlay with Title, City, and Country */}
        <div className="absolute top-0 w-full h-full flex flex-col gap-1.5 px-3 justify-center items-center">
          <div className="w-full h-8 bg-gray-50 rounded-md"></div>
          <div className="w-full h-8 bg-gray-50 rounded-md mt-2"></div>
          <div className="w-full h-6 bg-gray-50 rounded-md mt-2"></div>
        </div>

        {/* Price and Category at the Bottom Left */}
        <div className="absolute bottom-2 left-3 w-full h-full flex flex-col justify-end items-start pb-5">
          <div className="w-1/3 h-5 bg-gray-50 rounded-md"></div>
          <div className="w-1/4 h-5 bg-gray-50 rounded-md mt-1"></div>
        </div>
      </div>

      {/* Card Details Section */}
      <div className="flex flex-col mt-2 px-2">
        <div className="w-3/4 h-6 bg-gray-50 rounded-md mb-2"></div>
        <div className="w-1/2 h-5 bg-gray-50 rounded-md mb-2"></div>
        <div className="w-1/4 h-4 bg-gray-50 rounded-md mt-1"></div>
      </div>
    </div>
  );
};

export default HotelCardSkeleton;
