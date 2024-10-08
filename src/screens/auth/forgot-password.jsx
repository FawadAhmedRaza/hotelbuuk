"use client";
import React from "react";

import { useForm } from "react-hook-form";

// Components and Others...
import {
  Button,
  Iconify,
  ImgButton,
  Line,
  Pannel,
  Typography,
} from "@/src/components";
import { RHFFormProvider, RHFInput } from "@/src/components/hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { paths } from "@/src/contants";
import Link from "next/link";

const ForgotPasswordScreen = () => {
  const SignUpSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  const methods = useForm({
    resolver: yupResolver(SignUpSchema),
    defaultValues: {
      email: "",
    },
  });

  const {
    reset,
    formState: { errors },
  } = methods;

  console.log(errors);

  const handleSubmit = (data) => {
    try {
      reset();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Pannel className="flex justify-center items-center lg:justify-between gap-10 lg:gap-20 xl:gap-28 md:!py-10  !px-5 lg:!px-14 xl:!px-20 w-full h-screen sm:h-full  lg:h-screen ">
      <div
        className={`flex flex-col justify-center lg:justify-start items-center lg:items-start gap-5 w-11/12 md:w-9/12 lg:w-full h-full`}
      >
        <Typography variant="h3" className="font-bold text-primary md:mb-8">
          Hotelbuuk
        </Typography>
        <Link
          className="flex items-center gap-1 cursor-pointer"
          href={paths.auth.login}
        >
          <Iconify
            iconName="iconamoon:arrow-up-2-bold"
            className="text-primary -rotate-90 size-5 "
          />
          <Typography variant="p" className="font-medium text-sm">
            Back to login
          </Typography>
        </Link>
        <div className="flex flex-col justify-center  items-center lg:items-start lg:justify-start gap-3 mb-5 w-full">
          <Typography variant="h2" className="font-semibold">
            Forgot your password?
          </Typography>
          <Typography
            variant="p"
            className="text-secondary text-center lg:text-start"
          >
            Don’t worry, happens to all of us. Enter your email below to recover
            your password
          </Typography>
        </div>
        <RHFFormProvider
          methods={methods}
          onSubmit={methods.handleSubmit(handleSubmit)}
          className="flex flex-col gap-5"
        >
          <RHFInput
            label="Email"
            type="email"
            placeholder="john.doe@gmail.com"
            name="email"
          />

          <div className="flex flex-col gap-8 mt-5">
            <Button type="submit" className="w-full">
              Submit
            </Button>

            <Line className="my-2">Or Login with</Line>

            <ImgButton src="/assets/images/google.png" />
          </div>
        </RHFFormProvider>
      </div>
      <img
        src="/assets/images/forgot-password.png"
        alt="img"
        className=" hidden lg:flex lg:w-full h-full"
      />
    </Pannel>
  );
};

export default ForgotPasswordScreen;
