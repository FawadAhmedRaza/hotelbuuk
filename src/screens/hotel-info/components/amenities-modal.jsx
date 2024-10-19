import React from "react";
import * as yup from "yup";
import Modal from "@/src/components/modal";
import { useForm } from "react-hook-form";
import RHFAutoComplete from "@/src/components/hook-form/rhf-auto-complete";
import { yupResolver } from "@hookform/resolvers/yup";
import { RHFFormProvider } from "@/src/components/hook-form";
import axiosInstance, { endpoints } from "@/src/utils/axios";
import { useAuthContext } from "@/src/providers/auth/context/auth-context";
import { useDispatch, useSelector } from "react-redux";
import { createHotelFacilities } from "@/src/redux/hotel-facilities/thunk";

const AmenitiesModal = ({ isOpen, onClose, setRefetch }) => {
  const { user } = useAuthContext();

  const dispatch = useDispatch();

  const { isLoading } = useSelector((state) => state.hotelFacilities.create);

  const schema = yup.object({
    facilities: yup.array().min(1, "at least 1 item is required"),
  });

  const methods = useForm({
    resolver: yupResolver(schema),
    // defaultValues: initialFacilities,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const updatedArr = [...initialFacilities, ...data.facilities];

      let updatedData = {
        facilites: updatedArr,
        user_id: user?.id,
      };

      await dispatch(createHotelFacilities(updatedData)).unwrap();

      onClose();
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Facilities"
      handleSubmit={onSubmit}
      isLoading={isLoading}
    >
      <RHFFormProvider methods={methods}>
        <RHFAutoComplete name="facilities" label="Enter facilities" />
      </RHFFormProvider>
    </Modal>
  );
};

export default AmenitiesModal;

const initialFacilities = [
  { name: "Free WI-FI", value: "freeWI-FI" },
  { name: "Parking", value: "parking" },
  { name: "Pool", value: "pool" },
  { name: "Gym", value: "gym" },
  { name: "Restaurant", value: "restaurant" },
];
