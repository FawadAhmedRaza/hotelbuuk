"use client";
import React, { useEffect } from "react";

import { useAuthContext } from "@/src/providers/auth/context/auth-context";
import { useDispatch, useSelector } from "react-redux";

import { getGuestProfile } from "@/src/redux/guest/thunk";

import { enqueueSnackbar } from "notistack";
import Spinner from "@/src/components/ui/spinner";
import UpdateGuestProfile from "./component/update-profile";

const GuestProfile = () => {
  const { user } = useAuthContext();
  const dispatch = useDispatch();

  const { guest, isLoading } = useSelector((state) => state.guest.getById);

  const fetchGuestProfile = async () => {
    try {
      await dispatch(getGuestProfile(user?.id)).unwrap();
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error?.message, { variant: "error" });
    }
  };

  useEffect(() => {
    fetchGuestProfile();
  }, []);

  return isLoading ? <Spinner /> : <UpdateGuestProfile defaultValues={guest} />;
};

export default GuestProfile;
