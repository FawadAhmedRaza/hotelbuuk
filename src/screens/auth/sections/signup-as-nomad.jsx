"use client";
import React from "react";

import { useForm } from "react-hook-form";

// Components and Others...
import {
  AnchorTag,
  Button,
  ImgButton,
  Line,
  Pannel,
  Typography,
} from "@/src/components";
import {
  RHFCheckbox,
  RHFFormProvider,
  RHFInput,
} from "@/src/components/hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { paths } from "@/src/contants";
import { createUser, login } from "@/src/actions/auth.actions";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/src/auth/jwt/auth-context";

const SignUpAsNomad = () => {
  const router = useRouter();

  const { register } = useAuthContext();

  const SignUpSchema = Yup.object().shape({
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phone_number: Yup.string()
      .required("Number Must be required ")
      .matches(/^\d+$/, "Phone number must be digits only"),
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
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
      password: "",
      confirm_password: "",
      terms: false,
    },
  });

  const {
    reset,
    formState: { errors },
  } = methods;

  console.log(errors);

  const handleSubmit = async (data) => {
    try {
      await register(data);
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center lg:justify-between gap-10 lg:gap-16 xl:gap-28 md:!py-10 w-full h-full">
      <div
        className={`flex flex-col justify-center lg:justify-start items-center lg:items-start gap-5 w-full h-full mt-2 xl:mt-0`}
      >
        <RHFFormProvider
          methods={methods}
          onSubmit={methods.handleSubmit(handleSubmit)}
          className="flex flex-col gap-5 "
        >
          <div className="flex flex-col sm:flex-row gap-5 ">
            <RHFInput
              label="First Name"
              type="text"
              placeholder="john.doe@gmail.com"
              name="first_name"
            />
            <RHFInput
              type="text"
              label="Last Name"
              placeholder="john.doe@gmail.com"
              name="last_name"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-5 ">
            <RHFInput
              label="Email"
              type="email"
              placeholder="john.doe@gmail.com"
              name="email"
            />
            <RHFInput
              label="Phone Number"
              type="number"
              placeholder="john.doe@gmail.com"
              name="phone_number"
            />
          </div>
          <RHFInput
            type="password"
            label="Password"
            placeholder="john.doe@gmail.com"
            name="password"
          />
          <RHFInput
            type="password"
            label="Confirm Password"
            placeholder="john.doe@gmail.com"
            name="confirm_password"
          />
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
            <Button type="submit" className="w-full">
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
              onClick={() => signIn("google")}
              src="/assets/images/google.png"
            />
          </div>
        </RHFFormProvider>
      </div>
    </div>
  );
};

export default SignUpAsNomad;
