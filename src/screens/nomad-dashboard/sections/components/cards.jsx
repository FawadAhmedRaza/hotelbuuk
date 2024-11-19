"use client";

import { useEffect, useState } from "react";

import { useAuthContext } from "@/src/providers/auth/context/auth-context";

import {
  getTotalBookingsNomad,
  getTotalHotels,
  getTotalNomadRevenue,
} from "@/src/actions/nomad-dashboard-actions";

import DashboardCard from "@/src/components/dashboard-card";
import SummaryCardSkeleton from "@/src/components/Skeleton/summary-card-skeleton";
import { paths } from "@/src/contants";

const HotelCards = () => {
  const { user } = useAuthContext();

  const [bookingsCount, setBookingsCount] = useState(null);
  const [hotelCount, setHotelsCount] = useState(null);
  const [totalRevenue, setTotalRevenue] = useState(null);

  const fetchBookings = async () => {
    const totalBookings = await getTotalBookingsNomad(user?.id);
    setBookingsCount(totalBookings?.length || 0);
  };

  const fetchNomads = async () => {
    const totalNomads = await getTotalHotels();
    setHotelsCount(totalNomads?.length || 0);
  };

  const fetchTotalRevenue = async () => {
    const total = await getTotalNomadRevenue(user?.id);
    setTotalRevenue(total.toFixed(0, 2) || 0);
  };

  useEffect(() => {
    fetchBookings();
    fetchNomads();
    fetchTotalRevenue();
  }, [user?.id]);

  const cardsData = [
    {
      id: 1,
      icon: "mdi:shop-complete",
      title: "Booking",
      value: bookingsCount ?? null,
      btnTitle: "View Details",
      path: paths.nomadDashboard.bookings.root,
      bgColor: "#fee2e2",
    },
    {
      id: 2,
      icon: "ic:outline-card-membership",
      title: "Hotel",
      value: hotelCount ?? null,
      btnTitle: "View Details",
      path: paths.nomadDashboard.hotels,
      bgColor: "#dbeafe",
    },
    {
      id: 3,
      icon: "mingcute:invite-line",
      title: "Revenue",
      value: totalRevenue ?? null,
      btnTitle: "View Details",
      path: paths.nomadDashboard.bookings.root,
      bgColor: "#dcfce7",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-3">
      {cardsData.map((data) => (
        <div key={data.id} className="">
          {data.value === undefined || data?.value === null ? (
            <SummaryCardSkeleton />
          ) : (
            <DashboardCard
              IconName={data.icon}
              title={data.title}
              value={data.value}
              btnTitle={data.btnTitle}
              path={data.path}
              bgColor={data.bgColor}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default HotelCards;
