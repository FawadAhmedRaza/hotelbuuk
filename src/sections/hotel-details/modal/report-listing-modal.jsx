"use client";

import React from "react";

import { useForm } from "react-hook-form";
import { useAuthContext } from "@/src/providers/auth/context/auth-context";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  RHFFormProvider,
  RHFInput,
  RHFTextArea,
} from "@/src/components/hook-form";

import Modal from "@/src/components/modal";
import { enqueueSnackbar } from "notistack";
import { useParams, useSearchParams } from "next/navigation";
import axiosInstance, { endpoints } from "@/src/utils/axios";

const ReportListingModal = ({ isOpen, onClose }) => {
  const { user } = useAuthContext();
  const { id } = useParams();
  const params = useSearchParams();
  let event_type = params.get("type");

  const schema = yup.object({
    topic: yup.string().required("topic is required"),
    description: yup.string().required("description is required"),
  });

  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = methods;

  console.log(errors);

  const onSubmit = handleSubmit(async (data) => {
    try {
      data.event_id = id;
      data.user_id = user?.id;
      data.event_type = event_type;
      console.log("report data", data);

      const request = await axiosInstance.post("/report-listing", data);
      if (request?.status === 201) {
        reset();
        onClose();
        enqueueSnackbar("Reported successfully", {
          variant: "success",
        });
      }
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error?.message, { variant: "warning" });
    }
  });

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Report Event"
      handleSubmit={onSubmit}
      isLoading={isSubmitting}
      className="!h-auto"
    >
      <RHFFormProvider methods={methods}>
        <div className="flex flex-col gap-5">
          <RHFInput name="topic" label="Topic" />
          <RHFTextArea name="description" label="description" />
        </div>
      </RHFFormProvider>
    </Modal>
  );
};

export default ReportListingModal;
