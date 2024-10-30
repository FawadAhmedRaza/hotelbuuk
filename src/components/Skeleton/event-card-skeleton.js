import React from "react";

const EventCardSkeleton = () => {
  return (
    <div className="mt-5 space-y-5">
      <div className="p-0 overflow-hidden rounded-xl shadow-md border bg-gray-200 animate-pulse">
        <div className="flex flex-col md:flex-row w-full">
          {/* Skeleton for the image */}
          <div className="w-full md:w-1/3">
            <div className="w-full h-48 md:h-48 bg-gray-300 rounded-md"></div>
          </div>
          <div className="px-5 py-4 w-full md:w-2/3">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-10">
              <div className="h-6 w-2/3 bg-gray-300 rounded-md"></div>
              <div className="h-6 w-1/4 bg-gray-300 rounded-md"></div>
            </div>
            <div className="flex gap-1 items-center my-2">
              <div className="h-5 w-5 bg-gray-300 rounded-full"></div>
              <div className="h-4 w-1/2 bg-gray-300 rounded-md"></div>
            </div>
            <div className="h-4 bg-gray-300 rounded-md mt-2"></div>
            <div className="flex gap-2 items-center mt-2">
              <div className="border rounded-md text-xs border-black p-1 flex justify-center items-center bg-gray-300 h-5 w-10"></div>
              <div className="h-4 w-1/4 bg-gray-300 rounded-md"></div>
              <div className="h-4 w-1/4 bg-gray-300 rounded-md"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCardSkeleton;
