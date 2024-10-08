"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Link from "next/link";

// Components and Others...
import {
  AnchorTag,
  Button,
  Iconify,
  Typography,
  Pannel,
} from "@/src/components";
import { RHFFormProvider, RHFInput } from "@/src/components/hook-form";
import { paths } from "@/src/contants";

const VerifyCodeScreen = () => {
  // Define Yup validation schema
  const VerifyCodeSchema = Yup.object().shape({
    code: Yup.string()
      .required("Code is required")
      .length(6, "Code must be exactly 6 digits"),
  });

  const methods = useForm({
    resolver: yupResolver(VerifyCodeSchema),
    defaultValues: {
      code: "",
    },
  });

  const {
    reset,
    formState: { errors },
  } = methods;

  const handleSubmit = (data) => {
    try {
      console.log(data);
      reset();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Pannel className="flex justify-center items-center lg:justify-between gap-10 lg:gap-20 xl:gap-28 md:!py-10  !px-5 lg:!px-14 xl:!px-20 w-full h-screen sm:h-full lg:h-screen">
      <div className="flex flex-col justify-center lg:justify-start items-center lg:items-start gap-5 w-11/12 md:w-9/12 lg:w-full h-full">
        <Typography variant="h3" className="font-bold text-primary md:mb-8">
          Hotelbuuk
        </Typography>
        <Link
          className="flex items-center gap-1 cursor-pointer"
          href={paths.auth.login}
        >
          <Iconify
            iconName="iconamoon:arrow-up-2-bold"
            className="text-primary -rotate-90 size-5"
          />
          <Typography variant="p" className="font-medium text-sm">
            Back to login
          </Typography>
        </Link>
        <div className="flex flex-col justify-center items-center lg:items-start lg:justify-start gap-3 mb-5 w-full">
          <Typography variant="h2" className="font-semibold">
            Verify code
          </Typography>
          <Typography
            variant="p"
            className="text-secondary text-center lg:text-start"
          >
            Don’t worry, happens to all of us. Enter the code you received to verify your identity.
          </Typography>
        </div>
        <RHFFormProvider
          methods={methods}
          onSubmit={methods.handleSubmit(handleSubmit)}
          className="flex flex-col gap-5"
        >
          {/* Input for the code with validation */}
          <RHFInput
            label="Enter Code"
            type="text"
            placeholder="7789BM6X"
            name="code"
          />

          <Typography variant="p" className="font-montserrat font-medium text-sm">
            Didn’t receive a code? <AnchorTag href="#">Resend</AnchorTag>
          </Typography>

          <div className="flex flex-col gap-8 mt-5">
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </div>
        </RHFFormProvider>
      </div>
      <img
        src="/assets/images/verfiy-code.png"
        alt="img"
        className="hidden lg:flex lg:w-full h-full"
      />
    </Pannel>
  );
};

export default VerifyCodeScreen;
