"use client";
import React from "react";

// Components and Others...
import { Pannel, Typography } from "@/src/components";
import {
  RHFFormProvider,
  RHFInput,
  RHFProfileImgUploader,
  RHFSelect,
} from "@/src/components/hook-form";
import { useForm } from "react-hook-form";

export const CompleteProfileView = React.memo(() => {
  const methods = useForm();
  const onSubmit = () => {};
  return (
    <Pannel>
      <RHFFormProvider
        methods={methods}
        handleSubmit={methods.handleSubmit(onSubmit)}
        className="flex flex-col gap-10 justify-center items-center w-full "
      >
        <RHFProfileImgUploader name="profile" />
        <div className="flex flex-col gap-5 w-full max-w-screen-lg">
          <div className="flex flex-col sm:flex-row gap-5  w-full">
            <RHFInput
              name="first_name"
              placeholder="Enter your First Name"
              label="First Name"
            />
            <RHFInput
              name="last_name"
              placeholder="Enter your Last Name"
              label="Last Name"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-5  w-full">
            <RHFInput
              name="Phone Number"
              type="number"
              placeholder="Enter your Phone Number"
              label="Phone Number"
            />
            <RHFInput
              name="email"
              placeholder="Enter your Email"
              label="Email"
            />
          </div>
          <RHFSelect
            name="experience"
            label="Experience"
            placeholder="Select Experience "
            options={[
              { label: "Option 1", value: "option1" },
              { label: "Option 2", value: "option2" },
              { label: "Option 3", value: "option3" },
            ]}
          />
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <Typography variant="h5" className="font-semibold">
                TEACHING TOOLS
              </Typography>
              <Typography
                variant="p"
                className="font-medium !text-sm text-secondary"
              >
                Experience Level
              </Typography>
            </div>

            <div className="flex flex-col md:flex-row gap-5  w-full">
              <RHFInput
                name="teaching_1"
                placeholder="Enter your Experience"
                label="Experience 1"
              />
              <RHFInput
                name="teaching_2"
                placeholder="Enter your Experience"
                label="Experience 2"
              />
              <RHFInput
                name="teaching_1"
                placeholder="Enter your Experience"
                label="Experience 3"
              />
            </div>
          </div>
          <div className="flex flex-col gap-5">
              <Typography variant="h5" className="font-semibold">
              AVAILABILITY
              </Typography>
            

            <div className="flex flex-col md:flex-row gap-5  w-full">
              <RHFInput
                name="date"
                placeholder="Enter your Experience"
                label="Date"
                type="date"

              />
              <RHFInput
                name="time"
                type="Time"
                placeholder="Enter your Experience"
                label="Experience 1"
              />
              
            </div>
          </div>
        </div>
      </RHFFormProvider>
    </Pannel>
  );
});
