import React from "react";

import { useForm } from "react-hook-form";
import { useAuthContext } from "@/src/providers/auth/context/auth-context";
import { useDispatch, useSelector } from "react-redux";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import RHFAutoComplete from "@/src/components/hook-form/rhf-auto-complete";
import { RHFFormProvider } from "@/src/components/hook-form";

import Modal from "@/src/components/modal";

import { createRoomFacilities } from "@/src/redux/room-facilities/thunk";

const CreateNewRoomFacilites = ({ isOpen, onClose }) => {
  const { user } = useAuthContext();

  const dispatch = useDispatch();

  const { isLoading } = useSelector((state) => state.roomFacilities.create);

  const schema = yup.object({
    facilities: yup.array().min(1, "at least 1 item is required"),
  });

  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const updatedArr = [...data.facilities];

      let updatedData = {
        facilites: updatedArr,
        user_id: user?.id,
      };

      await dispatch(createRoomFacilities(updatedData)).unwrap();

      onClose();
      reset();
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add Room facilities"
      handleSubmit={onSubmit}
      isLoading={isLoading}
    >
      <RHFFormProvider methods={methods}>
        <RHFAutoComplete name="facilities" label="Enter facilities" />
      </RHFFormProvider>
    </Modal>
  );
};

export default CreateNewRoomFacilites;
