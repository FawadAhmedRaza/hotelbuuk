// "use client";

// import React, { useEffect } from "react";

// import { useForm, useFormContext } from "react-hook-form";
// import { useAuthContext } from "@/src/providers/auth/context/auth-context";

// import * as yup from "yup";
// import { yupResolver } from "@hookform/resolvers/yup";
// import {
//   RHFFormProvider,
//   RHFImageSelect,
//   RHFInput,
//   RHFRadio,
// } from "@/src/components/hook-form";

// import Modal from "@/src/components/modal";
// import axiosInstance, { endpoints } from "@/src/utils/axios";
// import { enqueueSnackbar } from "notistack";
// import { useDispatch, useSelector } from "react-redux";
// import { getNomadsProfile } from "@/src/redux/nomad-profile/thunk";

// const InviteNomadModal = ({ isOpen, onClose }) => {
//   const dispatch = useDispatch();
//   const { user } = useAuthContext();
//   const { nomads } = useSelector((state) => state.nomadProfile);

//   const modifiedNomadsList = nomads?.map((item) => {
//     return {
//       hotel_name: item?.first_name + "" + item?.last_name,
//       image: item?.profile_img,
//       address: item?.email,
//       value: item,
//     };
//   });

//   const schema = yup.object({
//     email: yup
//       .string()
//       .email("this is not a valid email")
//       .when("nomad_type", {
//         is: "invite",
//         then: (schema) => schema.required("email can not be null"),
//         otherwise: (schema) => schema.optional(),
//       }),
//     nomad_type: yup.string().default("registered"),
//     nomad: yup.mixed().when("nomad_type", {
//       is: "registered",
//       then: (schema) => schema.required("nomad can not be null"),
//       otherwise: (schema) => schema.optional(),
//     }),
//   });

//   const methods = useForm({
//     resolver: yupResolver(schema),
//     defaultValues: {
//       email: "",
//       nomad_type: "registered",
//     },
//   });

//   const {
//     handleSubmit,
//     reset,
//     watch,
//     formState: { isSubmitting },
//   } = methods;

//   const nomadType = watch("nomad_type");

//   const fetchNomads = async () => {
//     try {
//       await dispatch(getNomadsProfile()).unwrap();
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchNomads();
//   }, []);

//   const onSubmit = handleSubmit(async (data) => {
//     try {
//       data.hotel_id = user?.hotels?.[0]?.id;
//       data.invite_status = "PENDING";

//       console.log("final data for invitation", data);

//       const request = await axiosInstance.post(
//         endpoints.hotel.inviteNomads,
//         data
//       );
//       reset();
//       onClose();
//       enqueueSnackbar("Invitation sent Successfully", { variant: "success" });
//     } catch (error) {
//       console.log(error);
//       enqueueSnackbar(error?.message, { variant: "warning" });
//     }
//   });

//   return (
//     <Modal
//       isOpen={isOpen}
//       onClose={onClose}
//       title="Invite Business Consultants"
//       handleSubmit={onSubmit}
//       isLoading={isSubmitting}
//       className="!h-auto"
//     >
//       <RHFFormProvider methods={methods}>
//         <div className="flex flex-col gap-5">
//           <div className="flex gap-5">
//             <RHFRadio
//               id="registered"
//               name="nomad_type"
//               value="registered"
//               label="Registered"
//               className=""
//             />
//             <RHFRadio
//               id="non_registered"
//               name="nomad_type"
//               value="invite"
//               label="Invite"
//             />
//           </div>

//           {nomadType === "registered" ? (
//             <RHFImageSelect
//               name="nomad"
//               placeholder="Select registered Business Consultants"
//               label="Business Consultants"
//               options={modifiedNomadsList}
//               className={"!mt-2"}
//             />
//           ) : (
//             <RHFInput name="email" label="Enter email" className={"!mt-2"} />
//           )}
//         </div>
//       </RHFFormProvider>
//     </Modal>
//   );
// };

// export default InviteNomadModal;

// SECOND**********************************************************

"use client";

import React, { useEffect, useState } from "react";

import { useForm, useFormContext } from "react-hook-form";
import { useAuthContext } from "@/src/providers/auth/context/auth-context";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  RHFFormProvider,
  RHFImageSelect,
  RHFInput,
  RHFRadio,
} from "@/src/components/hook-form";

import Modal from "@/src/components/modal";
import axiosInstance, { endpoints } from "@/src/utils/axios";
import { enqueueSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import {
  getAvailableNomads,
  getNomadsProfile,
} from "@/src/redux/nomad-profile/thunk";
import { ProfileAvatar } from "@/src/components";

const InviteNomadModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { user } = useAuthContext();
  const { nomads } = useSelector((state) => state.nomadProfile.availableNomads);

  console.log("Filtered Nomads", nomads);

  const [query, setQuery] = useState("");
  const [filteredNomads, setFilteredNomads] = useState([]);

  const schema = yup.object({
    email: yup
      .string()
      .email("This is not a valid email")
      .when("nomad_type", {
        is: "invite",
        then: (schema) => schema.required("Email cannot be null"),
        otherwise: (schema) => schema.optional(),
      }),
    nomad_type: yup.string().default("registered"),
  });

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      nomad_type: "registered",
    },
  });

  const {
    handleSubmit,
    reset,
    watch,
    formState: { isSubmitting },
  } = methods;

  const nomadType = watch("nomad_type");

  const fetchNomads = async () => {
    try {
      await dispatch(getAvailableNomads(user?.hotels?.[0]?.id)).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNomads();
  }, []);

  useEffect(() => {
    const result = nomads?.filter((nomad) =>
      `${nomad.first_name} ${nomad.last_name}`
        .toLowerCase()
        .includes(query.toLowerCase())
    );
    setFilteredNomads(result);
  }, [query, nomads]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      data.hotel_id = user?.hotels?.[0]?.id;
      data.invite_status = "PENDING";

      console.log("final data for invitation", data);

      const request = await axiosInstance.post(
        endpoints.hotel.inviteNomads,
        data
      );
      reset();
      onClose();
      enqueueSnackbar("Invitation sent Successfully", { variant: "success" });
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error?.message, { variant: "warning" });
    }
  });

  const handleInvite = async (nomad) => {
    try {
      const inviteData = {
        hotel_id: user?.hotels?.[0]?.id,
        invite_status: "PENDING",
        nomad_type: "registered", // Explicitly specify the type
        nomad: { id: nomad.id }, // Include the nomad's ID for the backend
      };

      await axiosInstance.post(endpoints.hotel.inviteNomads, inviteData);

      // Remove the invited nomad from the lists
      setFilteredNomads((prev) => prev.filter((n) => n.id !== nomad.id));
      dispatch({
        type: "nomadProfile/getAvailableNomads",
        payload: nomads.filter((n) => n.id !== nomad.id),
      });

      enqueueSnackbar("Invitation sent Successfully", { variant: "success" });
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error?.message, { variant: "warning" });
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Invite Business Consultants"
      handleSubmit={onSubmit}
      isLoading={isSubmitting}
      className="!h-auto"
      disableActions={nomadType === "registered"}
    >
      <RHFFormProvider methods={methods}>
        <div className="flex flex-col gap-5">
          <div className="flex gap-5">
            <RHFRadio
              id="registered"
              name="nomad_type"
              value="registered"
              label="Registered"
              className=""
            />
            <RHFRadio
              id="non_registered"
              name="nomad_type"
              value="invite"
              label="Invite"
            />
          </div>

          {nomadType === "registered" ? (
            <div>
              <input
                type="text"
                placeholder="Search for Business Consultants"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="border rounded-md p-2 w-full"
              />
              <div className="mt-2 max-h-60 overflow-y-auto">
                {filteredNomads?.map((nomad) => (
                  <div
                    key={nomad.id}
                    className="flex items-center justify-between p-2 border-b"
                  >
                    <div className="flex items-center gap-3">
                      <ProfileAvatar
                        src={nomad.profile_img}
                        alt={`${nomad.first_name} ${nomad.last_name}`}
                        effect="blur"
                        iconSize="!size-10"
                        type={"server"}
                        className="w-10 h-10 object-cover rounded-full"
                      />
                      <div>
                        <p className="font-semibold">{`${nomad.first_name} ${nomad.last_name}`}</p>
                        <p className="text-sm text-gray-500">{nomad.email}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleInvite(nomad)}
                      className="bg-blue-500 text-white px-3 py-1 rounded-md"
                    >
                      Invite
                    </button>
                  </div>
                ))}
                {filteredNomads?.length === 0 && (
                  <p className="text-center text-gray-500">No results found</p>
                )}
              </div>
            </div>
          ) : (
            <RHFInput name="email" label="Enter email" className={"!mt-2"} />
          )}
        </div>
      </RHFFormProvider>
    </Modal>
  );
};

export default InviteNomadModal;
