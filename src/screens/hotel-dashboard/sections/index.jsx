"use client";
import React, { useEffect, useState } from "react";

import { useAuthContext } from "@/src/providers/auth/context/auth-context";
import { useDispatch } from "react-redux";

import { getRecentBookings } from "@/src/redux/bookings/thunk";
import {
  getHotelMonthlyRevenue,
  getHotelTotalCheckIns,
  getHotelTotalCheckOuts,
  getTotalBookings,
} from "@/src/actions/hotel-dashboard-actions";

import { enqueueSnackbar } from "notistack";

import { Pannel } from "@/src/components";
import HotelCards from "./components/cards";
import RecentBooking from "./components/recent-booking";
import MountChart from "./components/chart/mount-chart";
import ThisMonthBooking from "./components/chart/this-mount-bookin";
import { CheckInChart } from "./components/chart/check-In";
import { CheckOutChart } from "./components/chart/check-out";
import ProfileAlert from "./components/profile-alert";

const HotelDashboardSections = () => {
  const { user } = useAuthContext();

  const [showAlert, setShowAlert] = useState(true);

  const dispatch = useDispatch();

  // const [monthlyRevenue, setMonthlyRevenue] = useState([]);
  const [totalBookings, setTotalBookings] = useState([]);
  const [totalCheckIns, setTotalCheckIns] = useState([]);
  const [totalCheckOuts, setTotalCheckOuts] = useState([]);

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

  // const fetchMonthlyRevenue = async () => {
  //   const revenue = await getHotelMonthlyRevenue(user?.id);
  //   setMonthlyRevenue(revenue);
  // };

  // const fetchTotalBookings = async () => {
  //   const totalBookings = await getTotalBookings(user?.id);
  //   setTotalBookings(totalBookings || []);
  // };

  // const fetchTotalCheckIns = async () => {
  //   let total = await getHotelTotalCheckIns(user?.id);
  //   setTotalCheckIns(total);
  // };

  // const fetchTotalCheckOuts = async () => {
  //   let total = await getHotelTotalCheckOuts(user?.id);
  //   setTotalCheckOuts(total);
  // };

  useEffect(() => {
    fetchRecentBookings();
    // fetchMonthlyRevenue();
    // fetchTotalBookings();
    // fetchTotalCheckIns();
    // fetchTotalCheckOuts();
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
          {/* <MountChart revenue={monthlyRevenue} /> */}
          <MountChart userId={user?.id} />
        </div>
        <div>
          {/* <ThisMonthBooking bookingsArr={totalBookings} /> */}
          <ThisMonthBooking userId={user?.id} />
        </div>
        <div>
          <CheckInChart userId={user?.id} />
        </div>
        <div>
          <CheckOutChart userId={user?.id} />
        </div>
      </div>
    </Pannel>
  );
};

export default HotelDashboardSections;
