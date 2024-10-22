import React from "react";
import { Pannel } from "..";

const HotelInfoSkeleton = () => {
  return (
    <Pannel>
      <div>
        <div className="flex items-center justify-between w-full ">
          <div className="flex flex-col items-center relative  ">
            <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-gray-200"></div>
            <span className="mt-2 text-sm sm:text-base h-5 w-28 bg-gray-200 rounded-md absolute -bottom-6  "></span>
          </div>

          <div className="flex-grow h-1  bg-gray-300  z-50"></div>

          <div className="flex flex-col items-center relative  ">
            <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-gray-200"></div>
            <span className="mt-2 text-sm sm:text-base h-5 w-28 bg-gray-200 rounded-md absolute -bottom-6  "></span>
          </div>
        </div>

        <div className=" mt-20">
          <div className=" flex justify-center gap-3 items-center mt-14 flex-col">
            <div className=" h-40 w-40 border-dashed border border-gray-300 rounded-full p-1 flex items-center justify-center">
              <div className=" h-36 w-36 bg-gray-200 rounded-full"></div>
            </div>
            <div className=" h-4 rounded-md w-40  bg-gray-200"></div>
            <div className=" h-4 rounded-md w-56  bg-gray-200"></div>
          </div>
        </div>

        <div className=" mt-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
            <div>
              <div className="grid grid-cols-1  gap-5 w-full">
                <div className="h-10 bg-gray-200 rounded w-full"></div>
                <div className="h-28 bg-gray-200 rounded w-full"></div>
                <div className=" flex gap-4">
                  <div className="h-8 bg-gray-200 rounded w-40"></div>
                  <div className="h-8 bg-gray-200 rounded w-32"></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2  gap-5 w-full">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <div className=" flex gap-3">
                      <div className="h-6 bg-gray-200 rounded w-6"></div>
                      <div className="h-6 bg-gray-200 rounded w-48"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <div className="grid grid-cols-1  gap-5 w-full">
                <div className="h-10 bg-gray-200 rounded w-full"></div>
                <div className="h-10 bg-gray-200 rounded w-full"></div>
                <div className="h-10 bg-gray-200 rounded w-full"></div>
                <div className="h-10 bg-gray-200 rounded w-full"></div>
                <div className="h-10 bg-gray-200 rounded w-full"></div>
                <div className="h-10 bg-gray-200 rounded w-full"></div>
              </div>
            </div>
          </div>
        </div>

        <div className=" flex justify-end mt-5">
          <div className="h-10 bg-gray-200 rounded w-36"></div>
        </div>
      </div>
    </Pannel>
  );
};

export default HotelInfoSkeleton;
