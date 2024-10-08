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

const SignUpScreen = () => {
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

  const handleSubmit = (data) => {
    try {
      reset();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Pannel
      className={` flex gap-28 md:!py-10  md:px-20 w-full border ${
        errors ? "h-[870px]" : "h-[800px]"
      } `}
    >
      <img
        src="/assets/images/signup.png"
        alt="img"
        className="w-[500px] h-auto"
      />
      <div className={`flex flex-col gap-8 w-1/2 h-full`}>
        <Typography variant="h3" className="font-bold text-primary">
          Hotelbuuk
        </Typography>
        <div className="flex flex-col gap-3">
          <Typography variant="h2" className="font-semibold">
            Sign up
          </Typography>
          <Typography variant="p" className="text-secondary ">
            Setup your account to access millions of business hotels
          </Typography>
        </div>
        <RHFFormProvider
          methods={methods}
          onSubmit={methods.handleSubmit(handleSubmit)}
          className="flex flex-col gap-5 "
        >
          <div className="flex gap-5 ">
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
          <div className="flex gap-5 ">
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
                I agree to all the <AnchorTag href="#">Terms</AnchorTag> and
                <AnchorTag href="#"> Privacy Policies</AnchorTag>
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

            <ImgButton src="/assets/images/google.png" />
          </div>
        </RHFFormProvider>
      </div>
    </Pannel>
  );
};

export default SignUpScreen;
