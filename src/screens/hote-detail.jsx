"use client";
import React, { useEffect, useState } from "react";

import { useParams, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import { getEventById } from "../redux/all-events/thunk";

import { enqueueSnackbar } from "notistack";
import Spinner from "../components/ui/spinner";
import { HotelDetailScreen } from ".";
import { getUserBooking } from "../redux/bookings/thunk";
import { useAuthContext } from "../providers/auth/context/auth-context";

const HotelDetail = () => {
  const params = useSearchParams();
  const { id } = useParams();

  const type = params.get("type");

  const dispatch = useDispatch();

  const { isLoading, event } = useSelector((state) => state.allEvents.getById);
  const { user } = useAuthContext();
  const fetchEventById = async () => {
    try {
      await dispatch(getEventById({ id: id, type: type })).unwrap();
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error?.message, { variant: "error" });
    }
  };

  useEffect(() => {
    (async () => {
      try {
        await dispatch(getUserBooking({ eventId: id, userId: user?.guest?.[0].id, type })).unwrap();
      } catch (err) {
        console.log(err);
      }
    })();
  }, [user, id, event]);

  useEffect(() => {
    fetchEventById();
  }, []);

  return isLoading ? <Spinner /> : <HotelDetailScreen type={type} id={id} />;
};

export default HotelDetail;
