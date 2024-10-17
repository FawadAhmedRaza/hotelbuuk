import React from "react";

import * as yup from "yup";

import Modal from "@/src/components/modal";
import { RHFFormProvider } from "@/src/components/hook-form";
import { useForm } from "react-hook-form";
import RHFAutoComplete from "@/src/components/hook-form/rhf-auto-complete";
import { yupResolver } from "@hookform/resolvers/yup";

const AmenitiesModal = ({ isOpen, onClose }) => {
  const schema = yup.object({
    amenities: yup.array().optional(),
  });

  const methods = useForm({ resolver: yupResolver(schema) });

  const { handleSubmit } = methods;

  const onSubmit = handleSubmit(async (data) => {
    console.log("data amenities", data);
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Amenities">
      <RHFFormProvider methods={methods} onSubmit={onSubmit}>
        <div className="">
          <RHFAutoComplete name="amenities" label="Enter Amenities" />
        </div>
      </RHFFormProvider>
    </Modal>
  );
};

export default AmenitiesModal;
