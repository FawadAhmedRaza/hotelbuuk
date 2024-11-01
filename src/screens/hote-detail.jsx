"use client";
import React, { useEffect, useState } from "react";

import { useParams, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import { getEventById } from "../redux/all-events/thunk";

import { enqueueSnackbar } from "notistack";
import Spinner from "../components/ui/spinner";
import { HotelDetailScreen } from ".";
import { createClientSecret } from "../actions/payment.action";

const HotelDetail = () => {
  const params = useSearchParams();
  const { id } = useParams();

  const type = params.get("type");
  const [clientSecret, setClientSecret] = useState("");
  const [secretLoading, setSecretLoading] = useState(true);
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

  useEffect(() => {
    (async () => {
      setSecretLoading(true);
      try {
        const clientSecret = await createClientSecret(
          10
        );
        setClientSecret(clientSecret);
      } catch (err) {
        console.log("error", err);
      } finally {
        setSecretLoading(false);
      }
    })();
  }, []);

  return isLoading || secretLoading ? (
    <Spinner />
  ) : (
    <HotelDetailScreen
      clientSecret={clientSecret}
      secretLoading={secretLoading}
      type={type}
      id={id}
    />
  );
};

export default HotelDetail;
