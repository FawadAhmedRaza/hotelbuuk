"use client";

import { useForm } from "react-hook-form";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  RHFFormProvider,
  RHFInput,
  RHFTextArea,
  RHFUploadAvatar,
} from "@/src/components/hook-form";
import { Button, Pannel, Typography } from "@/src/components";
import { useAuthContext } from "@/src/providers/auth/context/auth-context";

const SetupBasicInfoGuest = () => {
  const schema = yup.object({
    profile_img: yup.mixed().optional(),
    first_name: yup.string().required("name is required"),
    last_name: yup.string().optional(),
    phone_number: yup
      .string()
      .required("Phone number is required")
      .matches(/^\d{11}$/, "Phone number must be 11 digits"),
  });

  const { setupBasicInfo, user } = useAuthContext();

  const methods = useForm({ resolver: yupResolver(schema) });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      data.user_id = user?.id;
      await setupBasicInfo("GUEST", data);
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <RHFFormProvider methods={methods} onSubmit={onSubmit}>
      <Pannel className="flex justify-center items-center lg:justify-between gap-10 lg:gap-16 xl:gap-20 md:!py-10 !px-5 lg:!px-14 xl:!px-20 w-full h-full">
        <img
          src="/assets/images/set-basic-info-img.png"
          alt="img"
          className="hidden lg:block w-[600px] xl:w-[500px] h-full"
        />
        <div className="flex flex-col justify-center lg:justify-start items-center lg:items-start gap-5 w-11/12 md:w-9/12 lg:w-full h-full mt-2 xl:mt-0">
          <div className="flex items-center gap-2">
            <img
              src="/assets/images/transperent-logo/transperent/PINK.png"
              alt="log"
              className=" w-16"
            />
            <Typography variant="h3" className="font-bold text-primary">
              Hotelbuuk
            </Typography>
          </div>
          <div className="flex flex-col justify-center items-center lg:justify-start lg:items-start gap-3">
            <Typography variant="h2" className="font-semibold">
              Basic Information
            </Typography>
            <Typography
              variant="p"
              className="text-secondary text-center lg:text-start"
            >
              Provide Basic info for profile.
            </Typography>
          </div>

          <div className="flex flex-col gap-x-4 gap-y-6 mt-2 w-full">
            <RHFUploadAvatar name="profile_img" />

            <RHFInput
              label="Fist name"
              name="first_name"
              placeholder="Enter first name"
            />
            <RHFInput
              label="Last name"
              name="last_name"
              placeholder="Enter last name"
            />
            <RHFInput
              label="Phone number"
              name="phone_number"
              type="number"
              placeholder="Enter phone number"
            />
          </div>

          <div className="flex justify-end items-end w-full mt-4">
            <Button type="submit" loading={isSubmitting}>
              Submit
            </Button>
          </div>
        </div>
      </Pannel>
    </RHFFormProvider>
  );
};

export default SetupBasicInfoGuest;
