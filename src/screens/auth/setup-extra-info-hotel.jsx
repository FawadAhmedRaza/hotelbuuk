"use client";

import { useForm } from "react-hook-form";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  RHFFormProvider,
  RHFInput,
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
import { RHFStarsRating } from "@/src/components/hook-form/rhf-stars-rating";
import { useEffect, useState } from "react";
import { getCities, getCountries } from "@/src/libs/helper";

const SetupExtraInfoHotel = () => {
  const schema = yup.object({
    profile_img: yup.mixed().optional("Profile is required"),
    address: yup.string().optional("address is required"),
    country: yup.string().optional("country is required"),
    city: yup.string().optional("city is required"),
    stars: yup.mixed().optional().default(4),
  });

  const router = useRouter();

  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);

  const { completeProfile, user } = useAuthContext();

  const methods = useForm({ resolver: yupResolver(schema) });

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
    watch,
    setValue,
  } = methods;

  const country = watch("country");
  console.log(errors);

  useEffect(() => {
    async function fetchCountries() {
      const allCountries = await getCountries();
      setCountries(allCountries);
    }
    fetchCountries();
  }, []);

  useEffect(() => {
    setValue("city", "");
    async function fetchCities() {
      const allCities = await getCities(country);
      setCities(allCities);
    }
    fetchCities();
  }, [country]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      data.user_id = user?.id;
      await completeProfile("HOTEL", data);
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
          <Typography variant="h3" className="font-bold text-primary">
            Hotelbuuk
          </Typography>
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

          <div className="flex flex-col justify-center items-center gap-x-4 gap-y-4 mt-2 w-full">
            <div className="flex flex-col w-full h-full justify-center items-center content-center mt-0">
              <RHFUploadAvatar name="profile_img" />
              <RHFStarsRating
                name="stars"
                label="Stars Rating"
                className="mt-3"
              />
            </div>

            <RHFSelect
              name="country"
              placeholder="Select your Country"
              label="Country"
              options={countries}
            />
            <RHFSelect
              name="city"
              label="City"
              placeholder="Select your City"
              options={cities}
            />
            <RHFInput
              name="address"
              label="Address"
              placeholder="Enter full Address"
            />
          </div>

          <div className="flex justify-end items-end w-full mt-4 gap-x-2">
            <Button
              type="button"
              onClick={() => router.push("/hotel-dashboard")}
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

export default SetupExtraInfoHotel;
