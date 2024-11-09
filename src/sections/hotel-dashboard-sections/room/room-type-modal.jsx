"use client";
import React from "react";

import { useForm } from "react-hook-form";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Modal from "@/src/components/modal";
import RHFAutoComplete from "@/src/components/hook-form/rhf-auto-complete";
import { useAuthContext } from "@/src/providers/auth/context/auth-context";
import { useDispatch } from "react-redux";
import { RHFFormProvider } from "@/src/components/hook-form";
import { createRoomTypes } from "@/src/redux/hotel-rooms/thunk";

export const RoomTypeModal = ({ isOpen, onClose, setRefetch }) => {
  const schema = yup.object({
    room_types: yup.array().min(1, "at least 1 item is required"),
  });

  const { user } = useAuthContext();
  const dispatch = useDispatch();

  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    reset
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      data.user_id = user?.id;
      await dispatch(createRoomTypes(data)).unwrap();
      reset();
      onClose();
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create new room types"
      handleSubmit={onSubmit}
      isLoading={isSubmitting}
    >
      <RHFFormProvider methods={methods}>
        <RHFAutoComplete name="room_types" label="Enter room types" />
      </RHFFormProvider>
    </Modal>
  );
};
