import { useAuthContext } from "@/src/providers/auth/context/auth-context";
import React from "react";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import Modal from "@/src/components/modal";
import { RHFFormProvider } from "@/src/components/hook-form";
import RHFAutoComplete from "@/src/components/hook-form/rhf-auto-complete";
import { useForm } from "react-hook-form";
import { createEventRules } from "@/src/redux/event-things-to-know/thunk";

const CreateEditEventRules = ({ isOpen, onClose }) => {
  const { user } = useAuthContext();

  const dispatch = useDispatch();

  const { createLoading: isLoading } = useSelector(
    (state) => state.eventThings.eventRules
  );

  const schema = yup.object({
    rules: yup.array().min(1, "at least 1 item is required"),
  });

  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const { handleSubmit } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const updatedArr = [...data.rules];

      let updatedData = {
        rules: updatedArr,
        user_id: user?.id,
      };
      await dispatch(createEventRules(updatedData)).unwrap();
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
      title="Add House rules"
      handleSubmit={onSubmit}
      isLoading={isLoading}
    >
      <RHFFormProvider methods={methods}>
        <RHFAutoComplete name="rules" label="Enter house rules" />
      </RHFFormProvider>
    </Modal>
  );
};

export default CreateEditEventRules;
