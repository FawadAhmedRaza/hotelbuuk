import { useAuthContext } from "@/src/providers/auth/context/auth-context";
import React from "react";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import Modal from "@/src/components/modal";
import { RHFFormProvider } from "@/src/components/hook-form";
import RHFAutoComplete from "@/src/components/hook-form/rhf-auto-complete";
import { useForm } from "react-hook-form";
import {
  createEventRules,
  createSafetyAndProperty,
} from "@/src/redux/event-things-to-know/thunk";

const CreateEditEventSafetyPolicy = ({ isOpen, onClose }) => {
  const { user } = useAuthContext();

  const dispatch = useDispatch();

  const { createLoading: isLoading } = useSelector(
    (state) => state.eventThings.safety
  );

  const schema = yup.object({
    safety: yup.array().min(1, "at least 1 item is required"),
  });

  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const { handleSubmit } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const updatedArr = [...data.safety];

      let updatedData = {
        safety: updatedArr,
        user_id: user?.id,
      };
      await dispatch(createSafetyAndProperty(updatedData)).unwrap();
    } catch (error) {
      console.log(error);
    } finally {
      onClose();
    }
  });

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add Safety & Property"
      handleSubmit={onSubmit}
      isLoading={isLoading}
    >
      <RHFFormProvider methods={methods}>
        <RHFAutoComplete name="safety" label="Enter safety & property" />
      </RHFFormProvider>
    </Modal>
  );
};

export default CreateEditEventSafetyPolicy;
