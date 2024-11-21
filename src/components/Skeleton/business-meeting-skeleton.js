import React from "react";

export const BusinessMeetingSkeleton = () => {
  return (
    <div className="flex flex-col gap-10 animate-pulse">
      <div className="flex flex-col justify-between items-start gap-5 lg:gap-10 w-full h-full">
        {/* Left Section */}
        <div className="flex flex-col gap-5 w-full">
          <div className="flex justify-center">
            {/* Profile Card Skeleton */}
            <div className="flex justify-center items-center w-fit bg-gray-100 rounded-xl shadow-md overflow-hidden border border-gray-200">
              <div className="flex flex-col items-center p-4">
                <div className="flex-shrink-0">
                  <div className="h-28 w-28 rounded-full bg-gray-200"></div>
                </div>
                <div className="ml-4">
                  <div className="h-6 bg-gray-200 rounded-md w-32 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded-md w-24"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Input Fields Skeleton */}
          <div className="h-10 bg-gray-200 rounded-md"></div>
          <div className="h-10 bg-gray-200 rounded-md"></div>
          <div className="h-20 bg-gray-200 rounded-md"></div>

          {/* Accommodation Type Section Skeleton */}
          <div className="flex flex-col gap-3 w-full">
            <div className="h-6 bg-gray-200 rounded-md w-48"></div>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-1">
                <div className="h-4 bg-gray-200 rounded-md w-36"></div>
                <div className="h-4 bg-gray-200 rounded-md w-64"></div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="h-4 bg-gray-200 rounded-md w-36"></div>
                <div className="h-4 bg-gray-200 rounded-md w-64"></div>
              </div>
            </div>
          </div>

          {/* Location or Hotel Section */}
          <div className="flex flex-col gap-5">
            <div className="h-6 bg-gray-200 rounded-md w-48"></div>
            <div className="flex flex-col md:flex-row gap-4 w-full">
              <div className="h-10 bg-gray-200 rounded-md w-full"></div>
              <div className="h-10 bg-gray-200 rounded-md w-full"></div>
            </div>
          </div>

          {/* About/Room Section Skeleton */}
          <div className="h-20 bg-gray-200 rounded-md"></div>
          <div className="h-10 bg-gray-200 rounded-md"></div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col justify-between items-start gap-10 w-full h-full">
          <div className="h-10 bg-gray-200 rounded-md w-full"></div>
        </div>
      </div>

      {/* Amenities Section Skeleton */}
      <div className="flex flex-col gap-5">
        <div className="h-6 bg-gray-200 rounded-md w-48"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 py-5 lg:py-0">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="h-4 w-4 rounded-xl bg-gray-200"></div>
              <div className="h-4 bg-gray-200 rounded-md w-24"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
