"use client";
import React from "react";
import { Pannel } from "..";

const NomadProfileSkeleton = () => {
  return (
    <Pannel>
      <div className="animate-pulse flex flex-col gap-10 items-center w-full">
        {/* Profile Image */}
        <div className="w-40 h-40 bg-gray-300 rounded-full" />

        <div className="flex flex-col gap-5 w-full max-w-screen-lg">
          {/* First Name & Last Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
            <div className="h-10 bg-gray-300 rounded w-full"></div>
            <div className="h-10 bg-gray-300 rounded w-full"></div>
          </div>

          {/* Phone Number & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
            <div className="h-10 bg-gray-300 rounded w-full"></div>
            <div className="h-10 bg-gray-300 rounded w-full"></div>
          </div>

          {/* Experience */}
          <div className="h-10 bg-gray-300 rounded w-full"></div>

          {/* Specialty */}
          <div className="flex flex-col gap-5">
            <div className="h-10 bg-gray-300 rounded w-1/5"></div>
            <div className="flex flex-col md:flex-row gap-5 w-full">
              <div className="h-10 bg-gray-300 rounded w-full"></div>
              <div className="h-10 bg-gray-300 rounded w-full"></div>
            </div>
            <div className="flex flex-col md:flex-row gap-5 w-full">
              <div className="h-10 bg-gray-300 rounded w-full"></div>
              <div className="h-10 bg-gray-300 rounded w-full"></div>
            </div>
          </div>

          {/* Teaching Tools */}
          <div className="flex flex-col gap-5">
            <div className="h-10 bg-gray-300 rounded w-1/5"></div>
            <div className="h-6 bg-gray-300 rounded w-1/3"></div>
            <div className="flex flex-col md:flex-row gap-5 w-full">
              <div className="h-10 bg-gray-300 rounded w-full"></div>
              <div className="h-10 bg-gray-300 rounded w-full"></div>
              <div className="h-10 bg-gray-300 rounded w-full"></div>
            </div>
          </div>

          {/* Availability */}
          <div className="flex flex-col gap-5">
            <div className="h-10 bg-gray-300 rounded w-1/5"></div>
            <div className="flex flex-col sm:flex-row gap-5 w-full">
              {/* Date Picker */}
              <div className="h-10 bg-gray-300 rounded w-full"></div>
              {/* Time Pickers */}
              <div className="flex flex-col md:flex-row gap-5 w-full">
                <div className="h-10 bg-gray-300 rounded w-full"></div>
                <div className="h-10 bg-gray-300 rounded w-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end w-full">
          <div className="w-32 h-10 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    </Pannel>
  );
};

export default NomadProfileSkeleton;
