"use client";

import { useForm } from "react-hook-form";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { RHFFormProvider } from "@/src/components/hook-form";
import { Button, Card, Iconify, Pannel, Typography } from "@/src/components";
import { useAuthContext } from "@/src/providers/auth/context/auth-context";

const SetupUserType = () => {
  const schema = yup.object({
    user_type: yup.string().required("Please select one"),
  });

  const { setupUserType } = useAuthContext();

  const methods = useForm({ resolver: yupResolver(schema) });

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitting },
  } = methods;

  const type = watch("user_type");

  const onSubmit = handleSubmit(async (data) => {
    await setupUserType(data.user_type);
  });

  const handleCardClick = (value) => {
    setValue("user_type", value);
  };

  return (
    <RHFFormProvider methods={methods} onSubmit={onSubmit}>
      <Pannel className="flex justify-center items-center lg:justify-between gap-10 lg:gap-16 xl:gap-20 md:!py-10 !px-5 lg:!px-14 xl:!px-20 w-full h-full">
        <img
          src="/assets/images/account-type-img.jpg"
          alt="img"
          className="hidden xl:block w-[400px] xl:w-[500px] h-full"
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
            <Typography variant="h3" className="font-semibold">
              Account type
            </Typography>
            <Typography
              variant="p"
              className="text-secondary text-center lg:text-start"
            >
              Select account type to create tours for business guests.
            </Typography>
          </div>

          <div className="w-full grid md:grid-cols-3 lg:grid-cols-3 grid-cols-1 gap-4 mt-2">
            {userTypes?.map((item, index) => (
              <Card
                onClick={() => handleCardClick(item?.value)}
                key={index}
                className={`w-full flex flex-col justify-center items-center gap-y-4 
                    ${
                      type === item?.value
                        ? "border-[3px] border-primary border-dashed bg-gray-200"
                        : "hover:cursor-pointer transition-all duration-500 hover:border hover:border-dashed hover:border-primary hover:bg-opacity-50"
                    }`}
              >
                <Iconify
                  iconName={item.icon}
                  className="!text-primary size-16"
                />
                <Typography variant="h5" className="!font-semibold">
                  {item.label}
                </Typography>
              </Card>
            ))}
          </div>

          <div className="flex justify-end items-end w-full mt-4">
            <Button
              type="submit"
              disabled={!Boolean(type)}
              loading={isSubmitting}
            >
              Submit
            </Button>
          </div>
        </div>
      </Pannel>
    </RHFFormProvider>
  );
};

export default SetupUserType;

let userTypes = [
  { label: "Signup as Hotel", icon: "fa-solid:hotel", value: "HOTEL" },
  { label: "Signup as Nomad", icon: "fa6-solid:building-user", value: "NOMAD" },
  { label: "Signup as Guest", icon: "fluent:guest-12-filled", value: "GUEST" },
];
