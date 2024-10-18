"use client";
import { Button, Card, Typography } from "@/src/components";
import React, { useState } from "react";
import { RecentBookingListView } from "./recent-booking-list-view";
import Image from "next/image";
import { recommended_nomad } from "@/src/_mock/_recommended_nomad";
recommended_nomad;
const RecentBooking = () => {
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <div className=" my-10">
      <div className="lg:grid grid-cols-12 gap-4  ">
        <div className="grid-cols-12 md:col-span-8">
          <Typography variant="h4">Recent Booking</Typography>
          <RecentBookingListView />
        </div>

        <div className="grid-cols-12 md:col-span-4 ">
          <Typography variant="h4">Recommended Nomad</Typography>
          <Card className="p-5 flex flex-col gap-5 mt-5">
            {/* Container with fixed height and scrollable content */}
            <div
              className={`space-y-4 custom-scrollbar ${
                showMore ? "overflow-y-auto" : ""
              } h-[24rem]`}
            >
              {recommended_nomad
                .slice(0, showMore ? recommended_nomad.length : 3)
                .map((person) => (
                  <div key={person.id}>
                    <Card className="!shadow-custom-shadow-xs !p-3 border-l-4 border-primary !rounded-md">
                      <div className="flex gap-4">
                        <Image
                          src={person.imageSrc}
                          height={80}
                          width={80}
                          className="border-primary border-2 h-16 w-16 rounded-full object-cover"
                          alt={person.name}
                        />
                        <div>
                          <Typography variant="h6" className="font-semibold">
                            {person.name}
                          </Typography>
                          <Typography variant="p" className="!text-xs">
                            {person.description}
                          </Typography>
                        </div>
                      </div>
                    </Card>
                  </div>
                ))}
            </div>

            <div className="mt-1">
              <Button className="text-sm" onClick={toggleShowMore}>
                {showMore ? "Show Less" : "Show More"}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RecentBooking;
