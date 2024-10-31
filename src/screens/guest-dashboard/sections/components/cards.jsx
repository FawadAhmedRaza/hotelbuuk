"use client";

import { useEffect, useState } from "react";

import { useAuthContext } from "@/src/providers/auth/context/auth-context";

import { getTotalHotels } from "@/src/actions/nomad-dashboard-actions";
import { getTotalNomads } from "@/src/actions/hotel-dashboard-actions";
import { getGuestTotalBookings } from "@/src/actions/guest-dashboard-action";

import DashboardCard from "@/src/components/dashboard-card";
import SummaryCardSkeleton from "@/src/components/Skeleton/summary-card-skeleton";
import { paths } from "@/src/contants";

const GuestCards = () => {
  const { user } = useAuthContext();

  const [bookingsCount, setBookingsCount] = useState(null);
  const [hotelCount, setHotelsCount] = useState(null);
  const [nomadsCount, setNomadsCount] = useState(null);

  const fetchHotels = async () => {
    const totalHotels = await getTotalHotels();
    setHotelsCount(totalHotels?.length || 0);
  };

  const fetchNomads = async () => {
    const totalNomads = await getTotalNomads();
    setNomadsCount(totalNomads?.length || 0);
  };

  const fetchTotalBookings = async () => {
    const total = await getGuestTotalBookings(user?.guest?.[0]?.id);
    setBookingsCount(total?.length || 0);
  };

  useEffect(() => {
    fetchHotels();
    fetchNomads();
    fetchTotalBookings();
  }, [user?.id]);

  const cardsData = [
    {
      id: 2,
      icon: "ic:outline-card-membership",
      title: "Hotel",
      value: hotelCount ?? null,
      btnTitle: "View Details",
      path: paths.guestDashboard.hotels,
    },
    {
      id: 2,
      icon: "ic:outline-card-membership",
      title: "Nomad",
      value: nomadsCount,
      btnTitle: "View Details",
      path: paths.guestDashboard.nomads,
    },
    {
      id: 1,
      icon: "mdi:shop-complete",
      title: "Booking",
      value: bookingsCount,
      btnTitle: "View Details",
      path: paths.guestDashboard.bookings,
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
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default GuestCards;
