"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { Pannel } from "..";

const HotelDetailsSkeleton = ({ className }) => {
  return (
    <Pannel
      className={cn(
        "flex flex-col sm:flex-row justify-between items-center sm:items-start gap-6 sm:gap-3",
        className
      )}
    >
      {/* Main Information Skeleton */}
      <div className="flex flex-col justify-center items-center sm:justify-start sm:items-start gap-2 grow">
        {/* Hotel Name / City */}
        <div className="w-3/4 h-8 bg-gray-200 rounded-md mb-2"></div>

        {/* Address and Contact Information */}
        <div className="flex gap-5 md:flex-row flex-col text-start flex-wrap items-center w-full">
          {/* Location Icon and Address */}
          <span className="flex items-center gap-3 w-full">
            <div className="bg-gray-300 rounded-full w-6 h-6"></div>
            <div className="w-2/3 h-6 bg-gray-200 rounded-md"></div>
          </span>

          {/* Phone Icon and Number */}
          <span className="flex items-center gap-3 w-full mt-2">
            <div className="bg-gray-300 rounded-full w-6 h-6"></div>
            <div className="w-1/3 h-6 bg-gray-200 rounded-md"></div>
          </span>
        </div>
      </div>

      {/* Social Media Links */}
      <div className="flex gap-3">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="w-12 h-12 bg-gray-200 rounded-lg border border-primary flex items-center justify-center"
          />
        ))}
      </div>
    </Pannel>
  );
};

export default HotelDetailsSkeleton;
