"use client";

import { useEffect, useState } from "react";

import { useAuthContext } from "@/src/providers/auth/context/auth-context";

import {
  getTotalBookingsNomad,
  getTotalHotels,
  getTotalNomadRevenue,
} from "@/src/actions/nomad-dashboard-actions";

import DashboardCard from "@/src/components/dashboard-card";
import { paths } from "@/src/contants";

const HotelCards = () => {
  const { user } = useAuthContext();

  const [bookingsCount, setBookingsCount] = useState(0);
  const [hotelCount, setHotelsCount] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);

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
      title: "Booking ",
      value: bookingsCount,
      btnTitle: "View Details",
      path: paths.nomadDashboard.bookings.root,
    },
    {
      id: 2,
      icon: "ic:outline-card-membership",
      title: "Hotel",
      value: hotelCount,
      btnTitle: "View Details",
      path: paths.nomadDashboard.hotels,
    },
    {
      id: 3,
      icon: "mingcute:invite-line",
      title: "Revenue ",
      value: `$ ${totalRevenue}`,
      btnTitle: "View Details",
      path: paths.nomadDashboard.bookings.root,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-3">
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
