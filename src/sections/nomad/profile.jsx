"use client";
import React, { useEffect, useRef, useState } from "react";
import * as Yup from "yup";

// Components and Others...
import {
  Button,
  CalendarInput,
  CustomPopover,
  Pannel,
  Typography,
} from "@/src/components";

import { useForm } from "react-hook-form";
import { addDays } from "date-fns";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  RHFDatePicker,
  RHFFormProvider,
  RHFInput,
  RHFProfileImgUploader,
  RHFSelect,
} from "@/src/components/hook-form";

export const NomadProfile = React.memo(() => {
  const [isDateOpen, setIsDateOpen] = useState(false);
  const datePopoverRef = useRef(null);

  // Handle date state
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 1),
      key: "selection",
    },
  ]);

  const nomadProfileSchema = Yup.object().shape({
    profile: Yup.mixed().required("Profile is required"),
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name is required"),
    phone_number: Yup.string().required("Phone number is required"),
    // .matches(/^[0-9]{10}$/, "Phone number must be 10 digits"), // Example regex for a 10-digit phone number
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email format"),
    experience: Yup.string().required("Experience is required"),
    electronics: Yup.string().required("Electronics field is required"),
    manufacturing: Yup.string().required("Manufacturing field is required"),
    fundraising: Yup.string().required("Fundraising field is required"),
    retails: Yup.string().required("Retails field is required"),
    projector: Yup.string().required("Projector field is required"),
    video: Yup.string().required("Video field is required"),
    sample: Yup.string().required("Sample field is required"),

    availability: Yup.object().shape({
      date: Yup.object().shape({
        start_date: Yup.string().required("Start date is required"),
        end_date: Yup.string().required("End date is required"),
      }),
      time: Yup.object().shape({
        start_time: Yup.string().required("Start time is required"),
        end_time: Yup.string().required("End time is required"),
      }),
    }),
  });

  const toggleDateCalender = () => setIsDateOpen(!isDateOpen);

  const methods = useForm({
    resolver: yupResolver(nomadProfileSchema),
    defaultValues: {
      profile: "",
      first_name: "",
      last_name: "",
      phone_number: "",
      email: "",
      experience: "",
      electronics: "",
      manufacturing: "",
      fundraising: "",
      retails: "",
      projector: "",
      video: "",
      availability: {
        date: {
          start_date: "",
          end_date: "",
        },
        time: {
          start_time: "",
          end_time: "",
        },
      },
    },
  });

  const {
    trigger,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = methods;

  useEffect(() => {
    setValue("availability.date.start_date", date[0].startDate.toString());
    setValue("availability.date.end_date", date[0].endDate.toString());
  }, [date]);

  const onSubmit = handleSubmit(async (data) => {
    console.log("Form submitted: ", data);
  });

  return (
    <Pannel>
      <RHFFormProvider
        methods={methods}
        onSubmit={onSubmit}
        className="flex flex-col gap-10 justify-center items-center w-full"
      >
        <RHFProfileImgUploader name="profile" />
        <div className="flex flex-col gap-5 w-full max-w-screen-lg">
          {/* Basic Information  */}

          <div className="flex flex-col sm:flex-row gap-5 w-full">
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
          <div className="flex flex-col sm:flex-row gap-5 w-full">
            <RHFInput
              name="phone_number"
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
            placeholder="  Experience "
            options={[
              { label: "Option 1", value: "option1" },
              { label: "Option 2", value: "option2" },
              { label: "Option 3", value: "option3" },
            ]}
          />
          {/* Specialty  */}
          <div className="flex flex-col gap-5">
            <Typography variant="h5" className="font-semibold">
              Specialty
            </Typography>

            <div className="flex flex-col md:flex-row gap-5 w-full">
              <RHFSelect
                name="electronics"
                label="Electronics"
                placeholder=" Electronics "
                options={[
                  { label: "Option 1", value: "option1" },
                  { label: "Option 2", value: "option2" },
                  { label: "Option 3", value: "option3" },
                ]}
              />
              <RHFSelect
                name="manufacturing"
                label="Manufacturing"
                placeholder=" Manufacturing "
                options={[
                  { label: "Option 1", value: "option1" },
                  { label: "Option 2", value: "option2" },
                  { label: "Option 3", value: "option3" },
                ]}
              />
            </div>
            <div className="flex flex-col md:flex-row gap-5 w-full">
              <RHFSelect
                name="fundraising"
                label="Fundraising"
                placeholder=" fundraising "
                options={[
                  { label: "Option 1", value: "option1" },
                  { label: "Option 2", value: "option2" },
                  { label: "Option 3", value: "option3" },
                ]}
              />
              <RHFSelect
                name="retails"
                label="Retails"
                placeholder="  Retails "
                options={[
                  { label: "Option 1", value: "option1" },
                  { label: "Option 2", value: "option2" },
                  { label: "Option 3", value: "option3" },
                ]}
              />
            </div>
          </div>
          {/* Teaching Tool  */}

          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <Typography variant="h5" className="font-semibold">
                TEACHING TOOLS
              </Typography>
              <Typography
                variant="p"
                className="font-medium !text-sm text-secondary"
              >
                What are you Teaching Tool
              </Typography>
            </div>

            <div className="flex flex-col md:flex-row gap-5 w-full">
              <RHFInput
                name="projector"
                placeholder="Projector"
                label="Projector"
              />
              <RHFInput name="video" placeholder="Video" label="Video" />
              <RHFInput name="sample" placeholder="Sample" label="Sample" />
            </div>
          </div>

          {/* AVAILABILITY  */}

          <div className="flex flex-col gap-5">
            <Typography variant="h5" className="font-semibold">
              AVAILABILITY
            </Typography>
            <div className="flex flex-col sm:flex-row gap-5 w-full">
              {/* Date Picker */}
              <div
                ref={datePopoverRef}
                className="relative flex flex-col w-full"
              >
                <CalendarInput
                  label="Date"
                  startDate={date[0].startDate.toString().slice(0, 10)}
                  endDate={date[0].endDate.toString().slice(0, 10)}
                  onClick={toggleDateCalender}
                />
                <CustomPopover
                  popoverRef={datePopoverRef}
                  isOpen={isDateOpen}
                  onClose={toggleDateCalender}
                  arrow={false}
                  className="flex flex-col overflow-hidden mt-4 w-fit"
                  parentClass="!left-0"
                >
                  <RHFDatePicker
                    name="availability"
                    onChange={(item) => setDate([item.selection])}
                    value={date}
                    rangeColors={["#852169"]}
                  />
                </CustomPopover>
              </div>

              {/* Time Picker */}
              <div className="flex flex-col md:flex-row gap-5 w-full">
                <RHFInput
                  name="availability.time.start_time"
                  placeholder="Start Time"
                  label="Start Time"
                  type="time"
                />
                <RHFInput
                  name="availability.time.end_time"
                  placeholder="End Time"
                  label="End Time"
                  type="time"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end w-full">
          <Button type="submit">Submit</Button>
        </div>
      </RHFFormProvider>
    </Pannel>
  );
});
