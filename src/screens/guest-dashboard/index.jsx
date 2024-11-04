"use client";

import { useEffect, useState } from "react";
import { useAuthContext } from "@/src/providers/auth/context/auth-context";
import { useDispatch, useSelector } from "react-redux";

import { getGuestBookingsList } from "@/src/redux/bookings/thunk";
import { enqueueSnackbar } from "notistack";

import { Pannel, Typography } from "@/src/components";
import GuestProfileAlert from "./sections/profile-alert";
import GuestCards from "./sections/components/cards";
import RoomListSkeleton from "@/src/components/Skeleton/room-list-skeleton";
import RecentBookingListView from "./sections/components/recent-booking-list-view";
import { useTranslation } from "react-i18next";

const GuestDashboardSection = () => {
  const { user } = useAuthContext();
  const dispatch = useDispatch();
  const {t} = useTranslation()
  const [alert, setShowAlert] = useState(false);
  const { isLoading } = useSelector((state) => state.bookings.getGuestBookings);

  const fetchAllBookings = async () => {
    try {
      await dispatch(getGuestBookingsList(user?.id)).unwrap();
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error?.message, { variant: "error" });
    }
  };

  useEffect(() => {
    fetchAllBookings();
  }, []);

  return (
    <Pannel>
      {!user?.is_user_profile_completed && (
        <GuestProfileAlert setShowAlert={setShowAlert} />
      )}
      <GuestCards />
      <div className="my-10">
        <div className="grid grid-cols-12 gap-4">
          <div className="grid-cols-12 md:col-span-12">
            {isLoading ? (
              <RoomListSkeleton />
            ) : (
              <>
                <Typography variant="h4">{t("common.upev")}</Typography>
                <RecentBookingListView />
              </>
            )}
          </div>
        </div>
      </div>
    </Pannel>
  );
};

export default GuestDashboardSection;
