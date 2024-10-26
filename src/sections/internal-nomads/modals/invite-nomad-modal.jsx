import React from "react";

import { useForm } from "react-hook-form";
import { useAuthContext } from "@/src/providers/auth/context/auth-context";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { RHFFormProvider, RHFInput } from "@/src/components/hook-form";

import Modal from "@/src/components/modal";
import axiosInstance, { endpoints } from "@/src/utils/axios";
import { enqueueSnackbar } from "notistack";

const InviteNomadModal = ({ isOpen, onClose }) => {
  const { user } = useAuthContext();

  const schema = yup.object({
    email: yup
      .string()
      .email("this is not a valid email")
      .required("email is required"),
  });

  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      data.hotel_id = user?.hotels?.[0]?.id;

      const request = await axiosInstance.post(
        endpoints.hotel.inviteNomads,
        data
      );
      reset();
      onClose();
      enqueueSnackbar("Invitation email send", { variant: "success" });
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Invite Nomad"
      handleSubmit={onSubmit}
      isLoading={isSubmitting}
    >
      <RHFFormProvider methods={methods}>
        <RHFInput name="email" label="Enter email" />
      </RHFFormProvider>
    </Modal>
  );
};

export default InviteNomadModal;
