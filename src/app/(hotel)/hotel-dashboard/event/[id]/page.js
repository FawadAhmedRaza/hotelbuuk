"use client";

import { LoadingScreen } from "@/src/components/loading-screen";
import Spinner from "@/src/components/ui/spinner";
import { useAuthContext } from "@/src/providers/auth/context/auth-context";
import { getHotelEventById } from "@/src/redux/hotel-event/thunk";
import { HotelEventStepper } from "@/src/sections/hotel-event/hotel-event-stepper";
import { useParams } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const page = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { isLoading, hotelEvent } = useSelector(
    (state) => state.hotelEvent.getById
  );

  console.log("Hotel event", hotelEvent);
  const fetchHotelEvent = async () => {
    try {
      await dispatch(getHotelEventById(id)).unwrap();
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error?.message, { variant: "success" });
    }
  };

  useEffect(() => {
    fetchHotelEvent();
  }, []);

  return isLoading ? (
    <Spinner />
  ) : (
    <HotelEventStepper defaultValues={hotelEvent} isEdit={true} />
  );
};

export default page;
