"use client";

import DashboardCard from "@/src/components/dashboard-card";
import SummaryCardSkeleton from "@/src/components/Skeleton/summary-card-skeleton";
import { paths } from "@/src/contants";
import { useRouter } from "next/navigation";

const HotelCards = () => {
  const router = useRouter();

  const cardsData = [
    {
      id: 1,
      icon: "mdi:shop-complete",
      title: "Booking",
      value: "40",
      btnTitle: "View Details",
      path: "#",
    },
    {
      id: 2,
      icon: "mingcute:invite-line",
      title: "Listing",
      value: "41",
      btnTitle: "View Details",
      path: "#",
    },
    {
      id: 3,
      icon: "ic:outline-card-membership",
      title: "Nomad ",
      value: "33",
      btnTitle: "View Details",
      path: paths.hotelDashboard.internalNomads,
    },
    {
      id: 4,
      icon: "mingcute:invite-line",
      title: "Revenue ",
      value: "41",
      btnTitle: "View Details",
      path: "#",
    },
    {
      id: 5,
      icon: "material-symbols:meeting-room",
      title: "Rooms ",
      value: "25",
      btnTitle: "View Details",
      path: paths.hotelDashboard.rooms,
    },
  ];

  return (
    // grid grid-cols-12 gap-6
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3">
      {/* {[1, 2, 3, 4, 5].map(() => (
        <SummaryCardSkeleton />
      ))} */}

      {cardsData.map((data) => (
        <div key={data.id} className="">
          <DashboardCard
            IconName={data.icon}
            title={data.title}
            value={data.value}
            btnTitle={data.btnTitle}
            path={data.path}
          />
        </div>
      ))}
    </div>
  );
};

export default HotelCards;
