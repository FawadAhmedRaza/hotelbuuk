"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuthContext } from "@/src/providers/auth/context/auth-context";

import { getGuestBookingsList } from "@/src/redux/bookings/thunk";

import { enqueueSnackbar } from "notistack";

import { Breadcrumb, Pannel } from "@/src/components";
import RoomListSkeleton from "@/src/components/Skeleton/room-list-skeleton";
import GuestBookingList from "./list/guest-booking-list";
import BookingsOverViewCards from "../hotel-bookings/overview-cards/bookings-over-view-cards";

const GuestBookingListOverview = () => {
  const { user } = useAuthContext();
  const dispatch = useDispatch();

  const { isLoading } = useSelector((state) => state.bookings.getGuestBookings);
  const { guestBookings } = useSelector((state) => state.bookings);

  const fetchAllBookings = async () => {
    try {
      await dispatch(getGuestBookingsList(user?.id)).unwrap();
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
      value: guestBookings?.length || 0,
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
      bgColor: "bg-[#FFE9D5]",
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
          <Breadcrumb title="My Bookings List" />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {overViewData?.map((item) => (
              <BookingsOverViewCards
                key={item?.id}
                IconName={item?.icon}
                title={item?.title}
                subTitle={item?.subTitle}
                value={item?.value}
                bgColor={item.bgColor}
              />
            ))}
          </div>

          <GuestBookingList />
        </>
      )}
    </Pannel>
  );
};

export default GuestBookingListOverview;
