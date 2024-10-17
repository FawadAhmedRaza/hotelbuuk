import { Typography } from "@/src/components";
import React from "react";
import RecentBookingListView from "./recent-booking-list-view";

const RecentBooking = () => {
  return (
    <div className=" my-10">
      <Typography variant="h4">Recent Booking</Typography>
      <div className="grid grid-cols-12 gap-4  mt-3">
        <div className="grid-cols-12 md:col-span-8">
          <RecentBookingListView />
        </div>

        <div className="grid-cols-12 md:col-span-4">Card</div>
      </div>
    </div>
  );
};

export default RecentBooking;
