import React from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Modal from "@/src/components/modal";
import RHFAutoComplete from "@/src/components/hook-form/rhf-auto-complete";
import { LocalStorageGetItem } from "@/src/utils/localstorage";

export const RoomTypeModal = ({ isOpen, onClose, setRefetch }) => {
  const schema = yup.object({
    amenities: yup.array().min(1, "at least 1 item is required"),
  });

  let mainSettings = {};
  try {
    const storedData = LocalStorageGetItem("amenities");
    mainSettings = storedData ? JSON.parse(storedData) : {};
    setRefetch(isOpen);
  } catch (error) {
    console.error("Error parsing stored data", error);
  }

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: mainSettings,
  });

  const { handleSubmit } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const storedData = LocalStorageGetItem("amenities");
      let existingData = storedData ? JSON.parse(storedData) : {};

      const updatedData = {
        ...existingData,
        amenities: [
          ...(existingData.amenities || []),
          ...(data.amenities || []),
        ],
      };

      LocalStorageSetItem("amenities", JSON.stringify(updatedData));
    } finally {
      onClose();
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
