"use client";


import DashboardCard from "@/src/components/dashboard-card";

const HotelCards = () => {
  return (
    // grid grid-cols-12 gap-6
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3">
      <div className="">
        <DashboardCard
          IconName="mdi:shop-complete"
          title={" Booking "}
          value={"40"}
          btnTitle={"View Details"}
        />
      </div>
      <div className="">
        <DashboardCard
          IconName="mingcute:invite-line"
          title={" Listing"}
          value={"41"}
          btnTitle={"Invite Nomad"}
        />
      </div>
      <div className="">
        <DashboardCard
          IconName="ic:outline-card-membership"
          title={"Nomad"}
          value={"33"}
          btnTitle={"View Details"}
        />
      </div>

      <div className="">
        <DashboardCard
          IconName="mingcute:invite-line"
          title={" Revenue"}
          value={"41"}
          btnTitle={"Invite Nomad"}
        />
      </div>
      <div className="">
        <DashboardCard
          IconName="material-symbols:meeting-room"
          title={" Income "}
          value={"25"}
          btnTitle={"Create Room "}
        />
      </div>

      {/* <Card className="md:col-span-3 col-span-12">
        <Typography variant="h4" className="">
           Bookings
        </Typography>
      </Card> */}
    </div>
  );
};

export default HotelCards;
