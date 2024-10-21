"use client";
import React from "react";

import { useForm } from "react-hook-form";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Modal from "@/src/components/modal";
import RHFAutoComplete from "@/src/components/hook-form/rhf-auto-complete";

export const RoomTypeModal = ({ isOpen, onClose, setRefetch }) => {
  const schema = yup.object({
    room_types: yup.array().min(1, "at least 1 item is required"),
  });

  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const { handleSubmit } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      console.log("data", data);
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Amenities"
      handleSubmit={onSubmit}
    >
      {/* <RHFFormProvider methods={methods}> */}
      <RHFAutoComplete name="amenities" label="Enter Amenities" />
      {/* </RHFFormProvider> */}
    </Modal>
  );
};
