import React from "react";

import { useForm } from "react-hook-form";
import { useAuthContext } from "@/src/providers/auth/context/auth-context";
import { useDispatch, useSelector } from "react-redux";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import RHFAutoComplete from "@/src/components/hook-form/rhf-auto-complete";
import { RHFFormProvider } from "@/src/components/hook-form";

import Modal from "@/src/components/modal";

import { bnb_amenities } from "@/src/_mock/_popolar-amentities";
import { createAmenities } from "@/src/redux/amenities/thunk";

const CreateEditAmenities = ({ isOpen, onClose }) => {
  const { user } = useAuthContext();

  const dispatch = useDispatch();

  const { isLoading } = useSelector((state) => state.eventAmenities.create);

  const schema = yup.object({
    amenities: yup.array().min(1, "at least 1 item is required"),
  });

  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const { handleSubmit, resetField } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const updatedArr = [...data.amenities];

      let updatedData = {
        amenities: updatedArr,
        user_id: user?.id,
      };
      await dispatch(createAmenities(updatedData)).unwrap();

      resetField("amenities");
      onClose();
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add Amenities"
      handleSubmit={onSubmit}
      isLoading={isLoading}
    >
      <RHFFormProvider methods={methods}>
        <RHFAutoComplete name="amenities" label="Enter amenities" />
      </RHFFormProvider>
    </Modal>
  );
};

export default CreateEditAmenities;
