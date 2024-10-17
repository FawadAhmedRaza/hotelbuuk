import { Button, Card, Typography } from "@/src/components";
import React from "react";
import { RecentBookingListView } from "./recent-booking-list-view";
import Image from "next/image";

const RecentBooking = () => {
  return (
    <div className=" my-10">
      <div className="lg:grid grid-cols-12 gap-4  ">
        <div className="grid-cols-12 md:col-span-8">
          <Typography variant="h4">Recent Booking</Typography>
          <RecentBookingListView />
        </div>

        <div className="grid-cols-12 md:col-span-4  ">
          <Typography variant="h4">Recommended Nomad</Typography>
          <Card className="p-5 flex flex-col gap-5  mt-5">
            <div>
              <Card className="!shadow-custom-shadow-xs !p-3 border-l-4 border-primary !rounded-md">
                <div className=" flex gap-4">
                  <Image
                    src={"/assets/images/man11.jpeg"}
                    height={80}
                    width={80}
                  />
                  <div>
                    <Typography variant="h5">James</Typography>
                    <Typography
                      variant="p"
                      className="!text-xs mt-2 leading-none"
                    >
                      The printing and typesetting industry. Lorem Ipsum has
                      been The printing
                    </Typography>
                  </div>
                </div>
              </Card>
            </div>
            <div>
              <Card className="!shadow-custom-shadow-xs !p-3 border-l-4 border-primary !rounded-md">
                <div className=" flex gap-4">
                  <Image
                    src={"/assets/images/man17.png"}
                    className=" object-cover"
                    height={80}
                    width={80}
                  />
                  <div>
                    <Typography variant="h5">Harry</Typography>
                    <Typography
                      variant="p"
                      className="!text-xs mt-2 leading-none"
                    >
                      The printing and typesetting industry. Lorem Ipsum has
                      been The printing 
                    </Typography>
                  </div>
                </div>
              </Card>
            </div>
            <div>
              <Card className="!shadow-custom-shadow-xs !p-3 border-l-4 border-primary !rounded-md">
                <div className=" flex gap-4">
                  <Image
                    src={"/assets/images/man11.jpeg"}
                    className=" object-cover"
                    height={80}
                    width={80}
                  />
                  <div>
                    <Typography variant="h5">Noah</Typography>
                    <Typography
                      variant="p"
                      className="!text-xs mt-2 leading-none"
                    >
                      The printing and typesetting industry. Lorem Ipsum has
                      been The printing 
                    </Typography>
                  </div>
                </div>
              </Card>
            </div>

            <div className=" mt-3">
              <Button className={" text-sm"}>show more</Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RecentBooking;
