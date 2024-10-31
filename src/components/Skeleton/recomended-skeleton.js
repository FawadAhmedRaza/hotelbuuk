import React from "react";

const RecommendedNomadSkeleton = ({ showMore = false }) => {
  return (
    <div className="grid-cols-12 md:col-span-4">
      <div className="h-8 w-1/3 bg-gray-300 rounded-md mb-4 animate-pulse"></div>
      <div className="p-2.5 md:p-5 flex flex-col gap-5 mt-5 border rounded-lg shadow-md animate-pulse">
        <div
          className={`space-y-4 custom-scrollbar w-full ${
            showMore ? "overflow-y-auto" : ""
          } max-h-[27rem] sm:max-h-[10rem] md:max-h-[25rem] overflow-hidden`}
        >
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="w-full">
              <div className="p-1.5 md:p-3 border-l-4 rounded-md shadow-sm bg-gray-200 animate-pulse w-full">
                <div className="flex gap-4 w-full">
                  {/* Skeleton for profile avatar */}
                  <div className="h-16 w-16 bg-gray-300 rounded-full"></div>
                  <div className="flex flex-1 flex-col grow">
                    <div className="flex justify-between items-center w-full">
                      {/* Skeleton for name */}
                      <div className="h-4 w-1/2 bg-gray-300 rounded-md"></div>
                      {/* Skeleton for button */}
                      <div className="h-6 w-20 bg-gray-300 rounded-md"></div>
                    </div>
                    {/* Skeleton for email */}
                    <div className="h-3 w-3/4 bg-gray-300 rounded-md mt-1"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-1">
          <div className="h-6 w-24 bg-gray-300 rounded-md"></div>
        </div>
      </div>
    </div>
  );
};

export default RecommendedNomadSkeleton;
