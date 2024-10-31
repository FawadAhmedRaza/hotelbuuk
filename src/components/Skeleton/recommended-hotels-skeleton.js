"use client";
import React from "react";
import { Card, Button, Typography } from "..";

const RecommendedHotelsSkeleton = ({ className, showMore, toggleShowMore }) => {
  return (
    <div className={`${className} grid-cols-12 md:col-span-4`}>
      <Typography variant="h4">Recommended Hotels</Typography>
      
      <Card className="p-2.5 md:p-5 flex flex-col gap-5 mt-5">
        {/* Container with fixed height and scrollable content */}
        <div
          className={`space-y-4 custom-scrollbar w-full ${
            showMore ? "overflow-y-auto" : ""
          } h-[27rem] sm:h-[10rem] md:h-[25rem] overflow-hidden`}
        >
          {[...Array(showMore ? 6 : 4)].map((_, index) => (
            <div key={index} className="w-full">
              <Card className="!shadow-custom-shadow-xs !p-1.5 md:!p-3 border-l-4 border-primary !rounded-md !w-full">
                <div className="flex gap-4 w-full">
                  {/* Placeholder for hotel image/avatar */}
                  <div className="border-primary border-2 h-16 w-16 bg-gray-300 rounded-full"></div>
                  
                  <div className="flex flex-1 flex-col grow">
                    <div className="flex grow mr-3 justify-between items-center w-full">
                      {/* Hotel name placeholder */}
                      <div className="w-1/2 h-5 bg-gray-200 rounded-md"></div>
                      
                      <div className="flex flex-col items-end">
                        {/* Create List button placeholder */}
                        <Button
                          disabled
                          className="rounded-md px-3 text-[10px] mb-1 py-[6px] bg-gray-300"
                        >
                          &nbsp;
                        </Button>
                        {/* Contact button placeholder */}
                        <Button
                          disabled
                          className="rounded-md px-3 text-[10px] mb-1 py-[6px] bg-gray-300"
                        >
                          &nbsp;
                        </Button>
                      </div>
                    </div>
                    {/* Hotel description placeholder */}
                    <div className="w-3/4 h-4 bg-gray-200 rounded-md mt-2"></div>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>

        {/* Show More / Show Less Button */}
        <div className="mt-1 border-dashed border-t flex justify-center items-center border-primary w-full pt-[20px]">
          <Button className="text-sm bg-gray-200 text-transparent" disabled>
            {showMore ? "Show Less" : "Show More"}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default RecommendedHotelsSkeleton;
