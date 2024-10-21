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
import { useDispatch, useSelector } from "react-redux";
import { enqueueSnackbar } from "notistack";
import { useAuthContext } from "@/src/providers/auth/context/auth-context";
import axiosInstance, { endpoints } from "@/src/utils/axios";
import { useRouter } from "next/navigation";

export const NomadProfile = React.memo(({ defaultValues, isEdit }) => {
  const { user, setUser } = useAuthContext();
  const router = useRouter();
  console.log("ise Edit",isEdit)

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
    first_name: Yup.string().optional("First name is required"),
    last_name: Yup.string().optional("Last name is required"),
    phone_number: Yup.string().optional("Phone number is required"),
    // .matches(/^[0-9]{10}$/, "Phone number must be 10 digits"), // Example regex for a 10-digit phone number
    email: Yup.string()
      .optional("Email is required")
      .email("Invalid email format"),
    experience: Yup.string().optional("Experience is required"),
    electronics: Yup.string().optional("Electronics field is required"),
    manufacturing: Yup.string().optional("Manufacturing field is required"),
    fundraising: Yup.string().optional("Fundraising field is required"),
    retails: Yup.string().optional("Retails field is required"),
    projector: Yup.string().optional("Projector field is required"),
    video: Yup.string().optional("Video field is required"),
    sample: Yup.string().optional("Sample field is required"),

    availability: Yup.object().shape({
      date: Yup.object().shape({
        start_date: Yup.string().optional("Start date is required"),
        end_date: Yup.string().optional("End date is required"),
      }),
      time: Yup.object().shape({
        start_time: Yup.string().optional("Start time is required"),
        end_time: Yup.string().optional("End time is required"),
      }),
    }),
  });

  const toggleDateCalender = () => setIsDateOpen(!isDateOpen);

  const methods = useForm({
    resolver: yupResolver(nomadProfileSchema),
    defaultValues: isEdit && defaultValues,
  });

  const {
    setValue,
    handleSubmit,
    watch,
    formState: { isSubmitting, errors },
  } = methods;

  console.log("errors", errors);

  useEffect(() => {
    setValue("availability.date.start_date", date[0].startDate.toString());
    setValue("availability.date.end_date", date[0].endDate.toString());
  }, [date]);

  const onSubmit = handleSubmit(async (data) => {
    if (!defaultValues) {
      // create handling
      try {
        console.log("create triggrred");
        let updatedData = {
          ...data,
          user_id: user?.id,
        };
        const formData = new FormData();

        for (const key in updatedData) {
          if (updatedData[key] !== null && updatedData[key] !== undefined) {
            formData.append(key, updatedData[key]);
          }
        }

        const response = await axiosInstance.post(
          endpoints.nomad.create,
          formData
        );
        if (response?.status === 201) {
          // setUser(response?.data?.user, response?.data?.accessToken);
          enqueueSnackbar("success", { variant: "success" });
          // router.push("/nomad-dashboard");
        }
      } catch (error) {
        console.log(error);
        enqueueSnackbar(error?.message, { variant: "error" });
      }
    }
    // update handling
    else {
      try {
        console.log("truggred");
        // const response = await axiosInstance.put(
        //   endpoints.nomad.updateProfile(defaultValues?.id),
        //   data
        // );
        // if (response?.status === 201) {
        //   setUser(response?.data?.user, response?.data?.accessToken);
        //   enqueueSnackbar("updated successfully", { variant: "success" });
        // }
      } catch (error) {
        console.log(error);
        enqueueSnackbar(error?.message, { variant: "error" });
      }
    }
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
                placeholder="Retails"
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
          <Button type="submit" loading={isSubmitting}>
            Submit
          </Button>
        </div>
      </RHFFormProvider>
    </Pannel>
  );
});
