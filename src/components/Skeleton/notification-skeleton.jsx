import React from "react";
import { cn } from "@/src/libs/cn";

const NotificationSkeleton = () => {
  return (
    <div className="flex flex-col justify-start gap-4 p-4 border border-gray-200 rounded-md shadow-sm animate-pulse">
      {/* Top section for Badge and Date */}
      <div className="flex justify-between items-center w-full">
        {/* Skeleton for Badge */}
        <span
          className={cn(
            "px-2 py-1 rounded text-sm font-semibold bg-gray-200 w-32 h-5"
          )}
        />
        {/* Skeleton for Date */}
        <div className="bg-gray-200 w-20 h-5 rounded"></div>
      </div>
      {/* Skeleton for Message */}
      <div className="flex flex-col gap-2 mt-2">
        <div className="bg-gray-200 w-full h-4 rounded"></div>
        <div className="bg-gray-200 w-5/6 h-4 rounded"></div>
      </div>
    </div>
  );
};

export default NotificationSkeleton;
