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
import { useTranslation } from "react-i18next";

const GuestBookingListOverview = () => {
  const { user } = useAuthContext();
  const dispatch = useDispatch();
  const {t} = useTranslation()
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
      title: t("widgets.tot"),
      subTitle: "",
      value: guestBookings?.length || 0,
    },
    {
      id: 2,
      icon: "carbon:pending",
      title: t("widgets.pend"),
      subTitle: t("widgets.capitalize.pend"),
      value:
        guestBookings?.filter((item) => item?.booking_status === "PENDING")
          ?.length || 0,
    },
    {
      id: 1,
      icon: "fluent-mdl2:completed",
      title: t("widgets.acpt"),
      subTitle: t("widgets.capitalize.acpt"),
      value:
        guestBookings?.filter((item) => item?.booking_status === "ACCEPTED")
          ?.length || 0,
    },
    {
      id: 1,
      icon: "material-symbols:cancel-outline",
      title:  t("widgets.rej"),
      subTitle: t("widgets.capitalize.rej"),
      value:
        guestBookings?.filter((item) => item?.booking_status === "REJECTED")
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
          <Breadcrumb title="My Bookings List" />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
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

          <GuestBookingList />
        </>
      )}
    </Pannel>
  );
};

export default GuestBookingListOverview;
