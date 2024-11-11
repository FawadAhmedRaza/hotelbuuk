"use client";

import React, { useEffect } from "react";

import { useForm, useFormContext } from "react-hook-form";
import { useAuthContext } from "@/src/providers/auth/context/auth-context";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  RHFFormProvider,
  RHFImageSelect,
  RHFInput,
  RHFRadio,
} from "@/src/components/hook-form";

import Modal from "@/src/components/modal";
import axiosInstance, { endpoints } from "@/src/utils/axios";
import { enqueueSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { getNomadsProfile } from "@/src/redux/nomad-profile/thunk";

const InviteNomadModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { user } = useAuthContext();
  const { nomads } = useSelector((state) => state.nomadProfile);

  const modifiedNomadsList = nomads?.map((item) => {
    return {
      hotel_name: item?.first_name + "" + item?.last_name,
      image: item?.profile_img,
      address: item?.email,
      value: item,
    };
  });

  const schema = yup.object({
    email: yup
      .string()
      .email("this is not a valid email")
      .when("nomad_type", {
        is: "invite",
        then: (schema) => schema.required("email can not be null"),
        otherwise: (schema) => schema.optional(),
      }),
    nomad_type: yup.string().default("registered"),
    nomad: yup.mixed().when("nomad_type", {
      is: "registered",
      then: (schema) => schema.required("nomad can not be null"),
      otherwise: (schema) => schema.optional(),
    }),
  });

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      nomad_type: "registered",
    },
  });

  const {
    handleSubmit,
    reset,
    watch,
    formState: { isSubmitting },
  } = methods;

  const nomadType = watch("nomad_type");

  const fetchNomads = async () => {
    try {
      await dispatch(getNomadsProfile()).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNomads();
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    try {
      data.hotel_id = user?.hotels?.[0]?.id;

      const request = await axiosInstance.post(
        endpoints.hotel.inviteNomads,
        data
      );
      reset();
      onClose();
      enqueueSnackbar("Invitation sended successfully", { variant: "success" });
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error?.message, { variant: "warning" });
    }
  });

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Invite Nomad"
      handleSubmit={onSubmit}
      isLoading={isSubmitting}
      className="!h-auto"
    >
      <RHFFormProvider methods={methods}>
        <div className="flex flex-col gap-5">
          <div className="flex gap-5">
            <RHFRadio
              id="registered"
              name="nomad_type"
              value="registered"
              label="Registered"
              className=""
            />
            <RHFRadio
              id="non_registered"
              name="nomad_type"
              value="invite"
              label="Invite"
            />
          </div>

          {nomadType === "registered" ? (
            <RHFImageSelect
              name="nomad"
              placeholder="Select registered nomads"
              label="Nomads"
              options={modifiedNomadsList}
              className={"!mt-2"}
            />
          ) : (
            <RHFInput name="email" label="Enter email" className={"!mt-2"} />
          )}
        </div>
      </RHFFormProvider>
    </Modal>
  );
};

export default InviteNomadModal;
