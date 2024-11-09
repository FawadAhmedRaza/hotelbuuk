"use client";

import { useEffect, useState } from "react";

import { useAuthContext } from "@/src/providers/auth/context/auth-context";
import { useDispatch, useSelector } from "react-redux";

import { getGuestBookingsList } from "@/src/redux/bookings/thunk";

import { enqueueSnackbar } from "notistack";

import SummaryCardSkeleton from "@/src/components/Skeleton/summary-card-skeleton";
import { paths } from "@/src/contants";
import BookingsOverViewCards from "@/src/sections/hotel-bookings/overview-cards/bookings-over-view-cards";

const GuestCards = () => {
  const { user } = useAuthContext();

  const dispatch = useDispatch();

  const { guestBookings } = useSelector((state) => state.bookings);

  const fetchAllBookings = async () => {
    try {
      await dispatch(getGuestBookingsList(user?.id)).unwrap();
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error?.message, { variant: "error" });
    }
  };

  let cardsData = [
    {
      id: 1,
      icon: "tabler:sum",
      title: "TOTAL",
      subTitle: "",
      value: guestBookings?.length || 0,
      path: paths.guestDashboard.bookings,
      bgColor: "bg-[#F9FAFB]",
    },
    {
      id: 2,
      icon: "carbon:pending",
      title: "PENDING",
      subTitle: "Pending",
      value:
        guestBookings?.filter((item) => item?.booking_status === "PENDING")
          ?.length || 0,
      path: paths.guestDashboard.bookings,
      bgColor: "bg-[#FFF5CC]",
    },
    {
      id: 3,
      icon: "fluent-mdl2:completed",
      title: "ACCEPTED",
      subTitle: "Accepted",
      value:
        guestBookings?.filter((item) => item?.booking_status === "ACCEPTED")
          ?.length || 0,
      path: paths.guestDashboard.bookings,
      bgColor: "bg-[#D3FCD2]",
    },
    {
      id: 4,
      icon: "material-symbols:paid-outline",
      title: "PAID",
      subTitle: "Paid",
      value:
        guestBookings?.filter((item) => item?.booking_status === "PAID")
          ?.length || 0,
      bgColor: "bg-[#CAFDF5]",
    },

    {
      id: 5,
      icon: "material-symbols:cancel-outline",
      title: "REJECTED",
      subTitle: "Rejected",
      value:
        guestBookings?.filter((item) => item?.booking_status === "REJECTED")
          ?.length || 0,
      path: paths.guestDashboard.bookings,
      bgColor: "bg-[#FFE9D5]",
    },
  ];

  useEffect(() => {
    fetchAllBookings();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
      {cardsData.map((item) => (
        <div key={item.id} className="">
          {item.value === undefined || item?.value === null ? (
            <SummaryCardSkeleton />
          ) : (
            <BookingsOverViewCards
              key={item?.id}
              IconName={item?.icon}
              title={item?.title}
              subTitle={item?.subTitle}
              value={item?.value}
              bgColor={item.bgColor}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default GuestCards;
