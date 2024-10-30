"use client";
import React, { useEffect } from "react";

import { useParams, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import { getEventById } from "../redux/all-events/thunk";

import { enqueueSnackbar } from "notistack";
import Spinner from "../components/ui/spinner";
import { HotelDetailScreen } from ".";

const HotelDetail = () => {
  const params = useSearchParams();
  const { id } = useParams();

  const type = params.get("type");

  const dispatch = useDispatch();

  const { event, isLoading } = useSelector((state) => state.allEvents.getById);

  console.log("event", event);

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

  return isLoading ? <Spinner /> : <HotelDetailScreen type={type} />;
};

export default HotelDetail;
