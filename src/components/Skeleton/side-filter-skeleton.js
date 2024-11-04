import React from "react";
import { Pannel } from "..";

const SideFilterSectionSkeleton = () => {
  return (
    <Pannel>
      <div className="flex flex-col items-center ">
        <div className="w-full ">
          {/* Filter Title */}
          <div>
            <div className="h-6 bg-gray-200 rounded-md w-24"></div>
            <div className="flex flex-col gap-3 mt-4">
              {/* Search Input Skeleton */}
              <div className="flex items-center rounded bg-white h-12 px-2 gap-2 border border-custom-neutral">
                <div className="h-5 w-5 bg-gray-200 rounded-full"></div>
                <div className="h-8 w-full bg-gray-200 rounded-md"></div>
              </div>

              {/* Price Range Skeleton */}
              <div className="mt-4">
                <div className="h-4 bg-gray-200 rounded-md w-32"></div>
                <div className="relative w-full">
                  <input
                    type="range"
                    disabled
                    className="range range-primary w-full h-2 rounded-lg appearance-none cursor-pointer accent-black opacity-50"
                  />
                </div>
                <p className="text-gray-700 text-xs font-medium h-4 bg-gray-200 rounded-md w-40"></p>
              </div>
            </div>
          </div>

          {/* Rating Filter Skeleton */}
          <div>
            <div className="h-6 bg-gray-200 rounded-md w-32"></div>
            <div className="space-y-3 mt-4">
              {[5, 4, 3, 2, 1].map((_, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="h-4 w-4 bg-gray-200 rounded-md"></div>
                  <div className="h-4 bg-gray-200 rounded-md w-16"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Location Filter Skeleton */}
          <div>
            <div className="h-6 bg-gray-200 rounded-md w-32"></div>
            <div className="space-y-3 mt-4">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="h-4 w-4 bg-gray-200 rounded-md"></div>
                  <div className="h-4 bg-gray-200 rounded-md w-32"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Nomads Filter Skeleton */}
          <div>
            <div className="h-6 bg-gray-200 rounded-md w-32"></div>
            <div className="mt-4 space-y-3">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="h-4 w-4 bg-gray-200 rounded-md"></div>
                  <div className="h-4 bg-gray-200 rounded-md w-40"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Pannel>
  );
};

export default SideFilterSectionSkeleton;
