import React from "react";
import DashboardCard from "@/src/components/dashboard-card";

const HotelCards = () => {
  return (
    // grid grid-cols-12 gap-6
    <div className="grid grid-cols-1  sm:grid-cols-2  xl:grid-cols-4 gap-6">
      <div>
        <DashboardCard
          IconName="mdi:shop-complete"
          title={"Total Booking "}
          value={"40"}
          btnTitle={"View Details"}
          
        />
      </div>
      <div>
        <DashboardCard
          IconName="ic:outline-card-membership"
          title={"Registered Nomad  "}
          value={"33"}
          btnTitle={"View Details"}
        />
      </div>
      <div>
        <DashboardCard
          IconName="mingcute:invite-line"
          title={"Invite Nomad"}
          value={"41"}
          btnTitle={"Invite Nomad"}
        />
      </div>
      <div>
        <DashboardCard
          IconName="material-symbols:meeting-room"
          title={"Create Room "}
          value={"25"}
          btnTitle={"Create Room "}
        />
      </div>

      {/* <Card className="md:col-span-3 col-span-12">
        <Typography variant="h4" className="">
          Total Bookings
        </Typography>
      </Card> */}
    </div>
  );
};

export default HotelCards;
