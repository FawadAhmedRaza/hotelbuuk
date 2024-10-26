import React, { useEffect } from "react";

import { useForm } from "react-hook-form";
import { useAuthContext } from "@/src/providers/auth/context/auth-context";
import { useDispatch, useSelector } from "react-redux";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { RHFFormProvider, RHFImageSelect } from "@/src/components/hook-form";

import Modal from "@/src/components/modal";
import { getNomadsProfile } from "@/src/redux/nomad-profile/thunk";
import axiosInstance, { endpoints } from "@/src/utils/axios";

const InviteNomadModal = ({ isOpen, onClose }) => {
  const { user } = useAuthContext();

  const dispatch = useDispatch();

  const { nomads } = useSelector((state) => state.nomadProfile);
  const modifiedNomadsList = nomads?.map((item) => {
    return {
      hotel_name: item?.first_name + "" + item?.last_name,
      image: item?.profile_img,
      address: item?.email,
      value: item?.id,
    };
  });

  const schema = yup.object({
    nomad: yup.string().required("nomad is required"),
  });

  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  const fetchNomads = async () => {
    try {
      await dispatch(getNomadsProfile()).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNomads();
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    try {
      data.user_id = user?.id;

      const request = await axiosInstance.post(
        endpoints.hotel.inviteNomads,
        data
      );
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
      title="Invite Nomad"
      handleSubmit={onSubmit}
      isLoading={isSubmitting}
    >
      <RHFFormProvider methods={methods}>
        <RHFImageSelect
          name="nomad"
          label="Select nomad"
          options={modifiedNomadsList}
        />
      </RHFFormProvider>
    </Modal>
  );
};

export default InviteNomadModal;
