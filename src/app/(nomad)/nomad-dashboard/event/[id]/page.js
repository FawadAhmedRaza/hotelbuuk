"use client";

import { LoadingScreen } from "@/src/components/loading-screen";
import { getEventById } from "@/src/redux/events/thunk";
import { EventStepperView } from "@/src/sections/event/stepper-view";
import axiosInstance, { endpoints } from "@/src/utils/axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const page = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { event, isLoading } = useSelector(
    (state) => state.nomadEvents.getById
  );

  console.log("full event",event);

  const fetchEvent = async () => {
    try {
      await dispatch(getEventById(id)).unwrap;
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEvent();
  }, [id]);

  return isLoading ? (
    <LoadingScreen />
  ) : (
    <EventStepperView defaultValues={event} isEdit={true} />
  );
};

export default page;
