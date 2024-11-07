import { useForm } from "react-hook-form";
import { useAuthContext } from "@/src/providers/auth/context/auth-context";
import { useDispatch, useSelector } from "react-redux";
import { useBoolean } from "@/src/hooks";
import { useRouter } from "next/navigation";

import { deleteNomadProfile } from "@/src/redux/nomad-profile/thunk";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  RHFFormProvider,
  RHFInput,
  RHFUploadAvatar,
} from "@/src/components/hook-form";

import {
  Breadcrumb,
  Button,
  DeleteModal,
  Pannel,
  Typography,
} from "@/src/components";


import { enqueueSnackbar } from "notistack";
import axiosInstance, { endpoints } from "@/src/utils/axios";
import { paths } from "@/src/contants";

// ----------------------------------------------------------

const UpdateGuestProfile = ({ defaultValues }) => {
  const schema = yup.object({
    profile_img: yup.mixed().required("Profile is required"),
    first_name: yup.string().required("First name is required"),
    last_name: yup.string().optional("Last name is required"),
    phone_number: yup.string().required("Phone number is required"),
    email: yup
      .string()
      .required("Email is required")
      .email("Invalid email format"),
  });

  const { user, setUser, logout } = useAuthContext();
  const router = useRouter();
  const dispatch = useDispatch();

  const { isOpen, setIsOpen, toggleDrawer } = useBoolean();

  const { isLoading } = useSelector((state) => state.nomadProfile.deleteById);

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const formData = new FormData();

      for (const key in data) {
        if (data[key] !== null && data[key] !== undefined) {
          if (typeof data[key] === "object" && !(data[key] instanceof File)) {
            formData.append(key, JSON.stringify(data[key]));
          } else {
            formData.append(key, data[key]);
          }
        }
      }

      const request = await axiosInstance.put(
        endpoints.guest.update_profile(defaultValues?.id),
        formData
      );

      if (request?.status === 201) {
        const { accessToken, user } = request?.data;
        setUser(user, accessToken);
        enqueueSnackbar("Updated successfully", { variant: "success" });
        router.push(paths.guestDashboard.root);
      }
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error?.message, { variant: "success" });
    }
  });

  const handleDelete = async () => {
    try {
      await dispatch(deleteNomadProfile(user?.id)).unwrap();
      logout();
      router.push("/login");
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error?.message, { variant: "error" });
    }
  };

  return (
    <Pannel>
      <RHFFormProvider
        methods={methods}
        onSubmit={onSubmit}
        className="flex flex-col gap-10 justify-center items-center w-full"
      >
        <div className={`flex justify-between items-center w-full`}>
          <Breadcrumb title={"Guest Profile"} />

          <Typography variant="h5">{`Profile ID: ${user?.id?.slice(
            -6
          )}`}</Typography>
        </div>
        <RHFUploadAvatar isEdit={true} name="profile_img" />
        <div className="flex flex-col gap-5 w-full max-w-screen-lg">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <RHFInput
              name="first_name"
              placeholder="Enter your First Name"
              label="First Name"
            />
            <RHFInput
              name="last_name"
              placeholder="Enter your Last Name"
              label="Last Name"
            />
            <RHFInput
              name="phone_number"
              type="number"
              placeholder="Enter your Phone Number"
              label="Phone Number"
            />
            <RHFInput
              name="email"
              placeholder="Enter your Email"
              label="Email"
            />
          </div>
        </div>
        <div className="flex justify-end w-full gap-3">
          <Button
            type="button"
            className="!bg-red-600"
            onClick={() => setIsOpen(!isOpen)}
          >
            Delete profile
          </Button>
          <Button type="submit" loading={isSubmitting}>
            Save
          </Button>
        </div>
      </RHFFormProvider>
      {isOpen && (
        <DeleteModal
          isLoading={isLoading}
          title="Delete Profile"
          isOpen={isOpen}
          onClose={toggleDrawer}
          handleDelete={handleDelete}
        >
          <Typography variant="p">
            Are you sure you want to delete your profile ? this action will
            delete all of your data?
          </Typography>
        </DeleteModal>
      )}
    </Pannel>
  );
};

export default UpdateGuestProfile;
