import React from "react";

const CustomSkeletonLoader = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="p-4 border rounded-lg shadow-md animate-pulse bg-white"
        >
          <div className="flex">
            {/* Skeleton for the image */}
            <div className="h-24 w-24 bg-gray-200 rounded-md"></div>

            <div className="flex-1 ml-4">
              {/* Skeleton for the title */}
              <div className="h-6 w-3/4 bg-gray-200 rounded-md mb-2"></div>

              {/* Skeleton for the description */}
              <div className="h-4 w-full bg-gray-200 rounded-md mb-1"></div>
              <div className="h-4 w-5/6 bg-gray-200 rounded-md"></div>
            </div>
          </div>

          <div className="mt-4">
            {/* Skeleton for bullet points */}
            <div className="space-y-2 mb-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-4 w-3/4 bg-gray-200 rounded-md"></div>
              ))}
            </div>

            {/* Skeleton for price */}
            <div className="h-5 w-1/3 bg-gray-200 rounded-md mb-4"></div>

            {/* Skeleton for the button */}
            <div className="flex justify-end">
              <div className="h-10 w-24 bg-gray-200 rounded-md"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CustomSkeletonLoader;
