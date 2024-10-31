"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { Card, Button, Typography } from "..";

const RecommendedNomadSkeleton = ({ className, showMore, toggleShowMore }) => {
  return (
    <div className={cn("grid-cols-12 md:col-span-4", className)}>
      <Typography variant="h4">Recommended Nomad</Typography>

      <Card className="p-2.5 md:p-5 flex flex-col gap-5 mt-5">
        {/* Container with fixed height and scrollable content */}
        <div
          className={`space-y-4 custom-scrollbar w-full ${
            showMore ? "overflow-y-auto" : ""
          } h-[27rem] sm:h-[10rem] md:h-[25rem] overflow-hidden`}
        >
          {[...Array(showMore ? 6 : 4)].map((_, index) => (
            <div key={index} className="w-full">
              <Card className="!shadow-custom-shadow-xs !p-1.5 md:!p-3 border-l-4 border-primary !rounded-md w-full">
                <div className="flex gap-4 w-full">
                  {/* Profile Avatar Placeholder */}
                  <div className="h-16 w-16 bg-gray-200 rounded-full"></div>

                  {/* Name and Email Placeholders */}
                  <div className="flex flex-1 flex-col grow">
                    <div className="flex grow mr-3 justify-between items-center w-full">
                      <div className="w-1/2 h-5 bg-gray-200 rounded-md"></div>
                      <Button
                        disabled
                        className="rounded-md px-3 text-[10px] mb-1 py-[6px] bg-gray-300"
                      >
                        &nbsp;
                      </Button>
                    </div>
                    <div className="w-3/4 h-4 bg-gray-200 rounded-md mt-2"></div>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>

        {/* Show More / Show Less Button */}
        <div className="mt-1">
          <Button className="text-sm bg-gray-200 text-transparent" disabled>
            {showMore ? "Show Less" : "Show More"}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default RecommendedNomadSkeleton;
