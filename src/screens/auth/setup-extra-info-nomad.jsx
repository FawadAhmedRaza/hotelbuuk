"use client";

import { useForm } from "react-hook-form";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  RHFFormProvider,
  RHFSelect,
  RHFUploadAvatar,
} from "@/src/components/hook-form";
import { Button, Pannel, Typography } from "@/src/components";
import { useAuthContext } from "@/src/providers/auth/context/auth-context";
import { useRouter } from "next/navigation";
import {
  electronics,
  fundraising,
  manufacturing,
  retails,
} from "@/src/_mock/_speciality";

const SetupExtraInfoNomad = () => {
  const schema = yup.object({
    profile_img: yup.mixed().optional("Profile is required"),
    experience: yup.string().optional("Experience is required"),
    electronics: yup.string().optional("Electronics field is required"),
    manufacturing: yup.string().optional("Manufacturing field is required"),
    fundraising: yup.string().optional("Fundraising field is required"),
    retails: yup.string().optional("Retails field is required"),
  });

  const router = useRouter();

  const { completeProfile, user } = useAuthContext();

  const methods = useForm({ resolver: yupResolver(schema) });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      data.user_id = user?.id;
      await completeProfile("NOMAD", data);
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
              Profile Details
            </Typography>
            <Typography
              variant="p"
              className="text-secondary text-center lg:text-start"
            >
              Provide Information for pofile details.
            </Typography>
          </div>

          <div className="flex flex-col justify-center items-center gap-x-4 gap-y-2 mt-2 w-full">
            <RHFUploadAvatar isEdit={false} name="profile_img" />

            <RHFSelect
              name="experience"
              label="Experience"
              placeholder="Experience"
              className="mt-2"
              options={[
                { label: "Entry level", value: "entry_level" },
                { label: "Junior level", value: "junior_level" },
                { label: "Mid-level", value: "mid_level" },
                { label: "Senior level", value: "senior_level" },
                { label: "Principle level", value: "principle_level" },
              ]}
            />

            <div className="gap-y-4 w-full">
              {/* Specialty  */}
              <div className="flex flex-col gap-x-2 gap-y-4">
                <Typography variant="h5" className="font-semibold">
                  Specialty
                </Typography>

                <div className="flex flex-col md:flex-row gap-4 w-full">
                  <RHFSelect
                    name="electronics"
                    label="Electronics"
                    placeholder="Electronics"
                    options={electronics}
                  />
                  <RHFSelect
                    name="manufacturing"
                    label="Manufacturing"
                    placeholder=" Manufacturing "
                    options={manufacturing}
                  />
                </div>
                <div className="flex flex-col md:flex-row gap-4 w-full">
                  <RHFSelect
                    name="fundraising"
                    label="Fundraising"
                    placeholder=" Fundraising "
                    options={fundraising}
                  />
                  <RHFSelect
                    name="retails"
                    label="Retails"
                    placeholder="Retails"
                    options={retails}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end items-end w-full mt-4 gap-x-2">
            <Button
              type="button"
              onClick={() => router.push("/nomad-dashboard")}
            >
              Skip
            </Button>
            <Button type="submit" loading={isSubmitting}>
              Submit
            </Button>
          </div>
        </div>
      </Pannel>
    </RHFFormProvider>
  );
};

export default SetupExtraInfoNomad;
