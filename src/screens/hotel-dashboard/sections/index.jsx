"use client";
import React, { useEffect, useState } from "react";

import { useAuthContext } from "@/src/providers/auth/context/auth-context";

import { Pannel } from "@/src/components";
import HotelCards from "./components/cards";
import RecentBooking from "./components/recent-booking";
import MountChart from "./components/chart/mount-chart";
import ThisMonthBooking from "./components/chart/this-mount-bookin";
import { CheckInChart } from "./components/chart/check-In";
import { CheckOutChart } from "./components/chart/check-out";
import ProfileAlert from "./components/profile-alert";
import { useDispatch } from "react-redux";
import { getRecentBookings } from "@/src/redux/bookings/thunk";
import { enqueueSnackbar } from "notistack";

const HotelDashboardSections = () => {
  const { user } = useAuthContext();

  const [showAlert, setShowAlert] = useState(true);

  const dispatch = useDispatch();

  const fetchRecentBookings = async () => {
    try {
      await dispatch(
        getRecentBookings({ id: user?.id, type: "HOTEL" })
      ).unwrap();
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error?.message, { variant: "error" });
    }
  };

  useEffect(() => {
    fetchRecentBookings();
  }, []);

  return (
    <Pannel>
      {!user?.is_user_profile_completed && (
        <ProfileAlert setShowAlert={setShowAlert} />
      )}
      <HotelCards />
      <RecentBooking />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <MountChart />
        </div>
        <div>
          <ThisMonthBooking />
        </div>
        <div>
          <CheckInChart />
        </div>
        <div>
          <CheckOutChart />
        </div>
      </div>
    </Pannel>
  );
};

export default HotelDashboardSections;
