"use client";
import React from "react";

import { useForm } from "react-hook-form";
import { useAuthContext } from "@/src/providers/auth/context/auth-context";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { signIn } from "next-auth/react";
import { paths } from "@/src/contants";

import {
  RHFCheckbox,
  RHFFormProvider,
  RHFInput,
} from "@/src/components/hook-form";

import {
  AnchorTag,
  Button,
  ImgButton,
  Line,
  Pannel,
  Typography,
} from "@/src/components";
import Link from "next/link";

const LoginScreen = () => {
  const { login } = useAuthContext();

  const SignUpSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
  });

  const methods = useForm({
    resolver: yupResolver(SignUpSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    formState: { isSubmitting },
  } = methods;

  const handleSubmit = async (data) => {
    await login(data);
  };

  return (
    <Pannel className="flex justify-center items-center lg:justify-between gap-10 lg:gap-20 xl:gap-28 md:!py-10  !px-5 lg:!px-14 xl:!px-20 w-full h-screen sm:h-full  lg:h-screen ">
      <div
        className={`flex flex-col justify-center lg:justify-start items-center lg:items-start gap-5 w-11/12 md:w-9/12 lg:w-full h-full`}
      >
        <Link href={paths.root}>
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
        </Link>
        <div className="flex flex-col justify-center  items-center lg:items-start lg:justify-start gap-3 mb-5 w-full">
          <Typography variant="h2" className="font-semibold">
            Login
          </Typography>
          <Typography variant="p" className="text-secondary ">
            Login to access your hotelbuuk account
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
          <RHFInput
            type="password"
            label="Password"
            placeholder="john.doe@gmail.com"
            name="password"
          />
          <div className="flex justify-between items-center">
            <RHFCheckbox name="terms" label="Remember me" />
            <AnchorTag
              href={paths.auth.forgotPassword}
              className="font-montserrat font-medium"
            >
              Forgot Password
            </AnchorTag>
          </div>
          <div className="flex flex-col gap-4 mt-5">
            <Button loading={isSubmitting} type="submit" className="w-full">
              Login
            </Button>
            <Typography
              variant="p"
              className=" !text-sm w-full text-center text-black font-medium font-montserrat"
            >
              Don't have an account?{" "}
              <AnchorTag href={paths.auth.signUp}>Sign up </AnchorTag>
            </Typography>

            <Line className="my-2">Or Login with</Line>

            <ImgButton
              onClick={() => signIn("google")}
              src="/assets/images/google.png"
            />
          </div>
        </RHFFormProvider>
      </div>
      <img
        src="/assets/images/login.png"
        alt="img"
        className=" hidden lg:flex lg:w-full h-full"
      />
    </Pannel>
  );
};

export default LoginScreen;
