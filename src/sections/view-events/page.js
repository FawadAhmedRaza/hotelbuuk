"use client";
import React, { useEffect } from "react";

import { useParams, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import { enqueueSnackbar } from "notistack";
import { getEventById } from "@/src/redux/all-events/thunk";
import Spinner from "@/src/components/ui/spinner";
import EventDetailScreen from "./details-screen";

const ViewEvents = () => {
  const params = useSearchParams();
  const { id } = useParams();

  const type = params.get("type");

  const dispatch = useDispatch();

  const { isLoading } = useSelector((state) => state.allEvents.getById);

  const fetchEventById = async () => {
    try {
      await dispatch(getEventById({ id: id, type: type })).unwrap();
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error?.message, { variant: "error" });
    }
  };

  useEffect(() => {
    fetchEventById();
  }, []);

  return isLoading ? <Spinner /> : <EventDetailScreen type={type} />;
};

export default ViewEvents;
