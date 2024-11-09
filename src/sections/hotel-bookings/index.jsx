"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuthContext } from "@/src/providers/auth/context/auth-context";

import { getAllBookings } from "@/src/redux/bookings/thunk";

import { enqueueSnackbar } from "notistack";

import { Breadcrumb, Pannel } from "@/src/components";
import HotelBookingList from "./list/hotel-booking-list";
import RoomListSkeleton from "@/src/components/Skeleton/room-list-skeleton";
import BookingsOverViewCards from "./overview-cards/bookings-over-view-cards";

const HotelBookingsListOverview = () => {
  const { user } = useAuthContext();
  const dispatch = useDispatch();

  const { isLoading, allBookings } = useSelector((state) => state.bookings);

  const fetchAllBookings = async () => {
    try {
      await dispatch(getAllBookings({ id: user?.id, type: "HOTEL" })).unwrap();
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error?.message, { variant: "error" });
    }
  };

  let overViewData = [
    {
      id: 1,
      icon: "tabler:sum",
      title: "TOTAL",
      subTitle: "",
      value: allBookings?.length || 0,
    },
    {
      id: 2,
      icon: "carbon:pending",
      title: "PENDING",
      subTitle: "Pending",
      value:
        allBookings?.filter((item) => item?.booking_status === "PENDING")
          ?.length || 0,
    },
    {
      id: 1,
      icon: "fluent-mdl2:completed",
      title: "ACCEPTED",
      subTitle: "Accepted",
      value:
        allBookings?.filter((item) => item?.booking_status === "ACCEPTED")
          ?.length || 0,
    },
    {
      id: 1,
      icon: "material-symbols:paid-outline",
      title: "PAID",
      subTitle: "Paid",
      value:
        allBookings?.filter((item) => item?.booking_status === "PAID")
          ?.length || 0,
    },
    {
      id: 1,
      icon: "material-symbols:cancel-outline",
      title: "REJECTED",
      subTitle: "Rejected",
      value:
        allBookings?.filter((item) => item?.booking_status === "REJECTED")
          ?.length || 0,
    },
  ];

  useEffect(() => {
    fetchAllBookings();
  }, []);

  return (
    <Pannel className="flex flex-col gap-10">
      {isLoading ? (
        <RoomListSkeleton />
      ) : (
        <>
          <Breadcrumb title="Bookings" />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3">
            {overViewData?.map((item) => (
              <BookingsOverViewCards
                key={item?.id}
                IconName={item?.icon}
                title={item?.title}
                subTitle={item?.subTitle}
                value={item?.value}
              />
            ))}
          </div>

          <HotelBookingList />
        </>
      )}
    </Pannel>
  );
};

export default HotelBookingsListOverview;
