"use client";
import React from "react";
import { Breadcrumb, Pannel } from "..";

const RoomListSkeleton = () => {
  return (
    <Pannel className="flex flex-col gap-10 w-full">
      <div className=" relative overflow-x-auto hide-scrollbar w-full">
        <table className="min-w-full table-auto rtl:text-right divide-y divide-dashed divide-gray-200   rounded-t-xl overflow-hidden ">
          <tbody className="divide-y divide-gray-200 divide-dashed  ">
            <div className=" flex items-center justify-between">
              <div className="h-12 bg-gray-200 rounded-md w-1/5 "></div>
              <div className="h-12 bg-gray-200 rounded-md w-40 "></div>
            </div>

            <div className="border border-gray-200 rounded-xl  mt-7">
              {/* Table Skeleton Header */}
              <div className="px-4 py-5 border-b-2 border-gray-200 flex justify-between bg-gray-50 gap-7">
                <div className="h-5 bg-gray-200 rounded-md w-44"></div>
                <div className="h-5 bg-gray-200 rounded-md w-44"></div>
                <div className="h-5 bg-gray-200 rounded-md w-44"></div>
                <div className="h-5 bg-gray-200 rounded-md w-44"></div>
                <div className="h-5 bg-gray-200 rounded-md w-44"></div>
              </div>

              {/* Table Skeleton Rows */}
              <div className="px-4 space-y-4">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div key={index} className=" py-2 flex justify-between mt-6 gap-7">
                    <div className="h-5 bg-gray-200 rounded-md w-44"></div>
                    <div className="h-5 bg-gray-200 rounded-md w-44"></div>
                    <div className="h-5 bg-gray-200 rounded-md w-44"></div>
                    <div className="h-5 bg-gray-200 rounded-md w-44"></div>
                    <div className="h-5 bg-gray-200 rounded-md w-44"></div>
                  </div>
                ))}
              </div>

              {/* Skeleton for Pagination */}
              <div className="flex justify-between items-center px-6 py-4 mt-5">
                <div className="h-10 bg-gray-200 rounded-md w-1/12"></div>
                <div className="h-10 bg-gray-200 rounded-md w-1/12"></div>
              </div>
            </div>
          </tbody>
        </table>
      </div>
    </Pannel>
  );
};

export default RoomListSkeleton;
