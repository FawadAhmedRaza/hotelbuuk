"use client";

import { useForm } from "react-hook-form";
import { useAuthContext } from "@/src/providers/auth/context/auth-context";

import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Link from "next/link";

import { RHFFormProvider, RHFInput } from "@/src/components/hook-form";
import { paths } from "@/src/contants";

import {
  AnchorTag,
  Button,
  Iconify,
  Typography,
  Pannel,
} from "@/src/components";

const SetNewPasswordScreen = () => {
  const { resetPasswordHandle } = useAuthContext();

  const SetPasswordSchema = Yup.object().shape({
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),

    confirm_password: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const methods = useForm({
    resolver: yupResolver(SetPasswordSchema),
    defaultValues: {
      password: "",
      confirm_password: "",
    },
  });

  const {
    formState: { isSubmitting },
  } = methods;

  const handleSubmit = async (data) => {
    await resetPasswordHandle(data?.password);
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
          <Typography variant="p" className="font-medium !container !text-sm">
            Back to login
          </Typography>
        </Link>
        <div className="flex flex-col justify-center items-center lg:items-start lg:justify-start gap-3 mb-5 w-full">
          <Typography variant="h2" className="font-semibold">
            Set a password
          </Typography>
          <Typography
            variant="p"
            className="text-secondary text-center lg:text-start"
          >
            Your previous password was reset. Please set a new password for your
            account.
          </Typography>
        </div>
        <RHFFormProvider
          methods={methods}
          onSubmit={methods.handleSubmit(handleSubmit)}
          className="flex flex-col gap-5"
        >
          <RHFInput
            label="Create Password"
            type="password"
            placeholder="7789BM6X@@H&$K_"
            name="password"
          />
          <RHFInput
            label="Re-enter Password"
            type="password"
            placeholder="7789BM6X@@H&$K_"
            name="confirm_password"
          />

          <div className="flex flex-col gap-8 mt-5">
            <Button type="submit" className="w-full" loading={isSubmitting}>
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

export default SetNewPasswordScreen;
