"use client";
import React, { useEffect } from "react";

import { useForm } from "react-hook-form";
import { useAuthContext } from "@/src/providers/auth/context/auth-context";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

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
  Typography,
} from "@/src/components";
import { paths } from "@/src/contants";
import { useSearchParams } from "next/navigation";

const SignUpAsHotel = () => {
  const { register } = useAuthContext();
  const params = useSearchParams();

  const email = params.get("email");
  const isRegistered = params.get("isRegistered");
  const hotel = params.get("hotel");
  const hotelId = params.get("hotelId")

  const SignUpSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
    terms: Yup.boolean().oneOf(
      [true],
      "You must accept the terms and conditions"
    ),
  });

  const methods = useForm({
    resolver: yupResolver(SignUpSchema),
  });

  const {
    reset,
    formState: { isSubmitting },
  } = methods;

  const handleSubmit = async (data) => {
    try {
      let invited = email && isRegistered ? true : false;
      await register(data, invited, hotel,hotelId);
    } catch (error) {
      console.log(error);
    } finally {
      reset();
    }
  };

  return (
    <div className="flex justify-center items-center lg:justify-between gap-10 lg:gap-16 xl:gap-28 md:!py-10  w-full h-full">
      <div
        className={`flex flex-col justify-center lg:justify-start items-center lg:items-start gap-5 w-full h-full mt-2 xl:mt-0`}
      >
        <RHFFormProvider
          methods={methods}
          onSubmit={methods.handleSubmit(handleSubmit)}
          className="flex flex-col gap-5 "
        >
          <div className="flex flex-col gap-y-4">
            <RHFInput
              type="email"
              label="E-mail"
              placeholder="stefan@adlonkemp.com"
              name="email"
            />
            <RHFInput
              type="password"
              label="Password"
              placeholder="Enter password"
              name="password"
            />
            <RHFInput
              type="password"
              label="Confirm password"
              placeholder="Enter confirm password"
              name="confirm_password"
            />
          </div>
          <RHFCheckbox
            name="terms"
            label={
              <span>
                I agree to the <AnchorTag href={paths.terms}>Terms</AnchorTag>{" "}
                and{" "}
                <AnchorTag href={paths.privacyPolicy}>
                  Privacy Policies
                </AnchorTag>
              </span>
            }
          />
          <div className="flex flex-col gap-4 mt-3">
            <Button loading={isSubmitting} type="submit" className="w-full">
              Create account
            </Button>
            <Typography
              variant="p"
              className=" !text-sm w-full text-center text-secondary"
            >
              Already have an account?{" "}
              <AnchorTag href={paths.auth.login}>Login</AnchorTag>
            </Typography>

            <Line>Or Sign up with</Line>

            <ImgButton
              // onClick={() => signIn("google")}
              src="/assets/images/google.png"
            />
          </div>
        </RHFFormProvider>
      </div>
    </div>
  );
};

export default SignUpAsHotel;
