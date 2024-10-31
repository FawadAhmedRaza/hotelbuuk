"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/src/providers/auth/context/auth-context";

import {
  getTotalBookings,
  getTotalHotelRevenue,
  getTotalNomads,
  getTotalRooms,
} from "@/src/actions/hotel-dashboard-actions";

import DashboardCard from "@/src/components/dashboard-card";
import { paths } from "@/src/contants";

const HotelCards = () => {
  const { user } = useAuthContext();

  const [bookingsCount, setBookingsCount] = useState(0);
  const [nomadsCount, setNomadsCount] = useState(0);
  const [roomsCount, setRoomsCount] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);

  const fetchBookings = async () => {
    const totalBookings = await getTotalBookings(user?.id);
    setBookingsCount(totalBookings?.length || 0);
  };

  const fetchNomads = async () => {
    const totalNomads = await getTotalNomads();
    setNomadsCount(totalNomads?.length || 0);
  };

  const fetchRooms = async () => {
    const totalRooms = await getTotalRooms(user?.id);
    setRoomsCount(totalRooms?.length || 0);
  };

  const fetchTotalRevenue = async () => {
    const total = await getTotalHotelRevenue(user?.id);
    setTotalRevenue(total.toFixed(0, 2) || 0);
  };

  useEffect(() => {
    fetchBookings();
    fetchNomads();
    fetchRooms();
    fetchTotalRevenue();
  }, [user?.id]);

  const cardsData = [
    {
      id: 1,
      icon: "mdi:shop-complete",
      title: "Booking",
      value: bookingsCount,
      btnTitle: "View Details",
      path: paths.hotelDashboard.bookings.root,
    },
    {
      id: 3,
      icon: "ic:outline-card-membership",
      title: "Nomad ",
      value: nomadsCount,
      btnTitle: "View Details",
      path: paths.hotelDashboard.nomads.root,
    },
    {
      id: 4,
      icon: "mingcute:invite-line",
      title: "Revenue ",
      value: `$ ${totalRevenue}`,
      btnTitle: "View Details",
      path: paths.hotelDashboard.bookings.root,
    },
    {
      id: 5,
      icon: "material-symbols:meeting-room",
      title: "Rooms ",
      value: roomsCount,
      btnTitle: "View Details",
      path: paths.hotelDashboard.rooms,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
      {cardsData.map((data) => (
        <div key={data.id}>
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
