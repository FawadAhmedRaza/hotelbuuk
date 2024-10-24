"use client";
import React, { useEffect, useRef, useState } from "react";
import * as Yup from "yup";

// Components and Others...
import {
  Breadcrumb,
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
  RHFUploadAvatar,
} from "@/src/components/hook-form";
import { useDispatch, useSelector } from "react-redux";
import { enqueueSnackbar } from "notistack";
import { useAuthContext } from "@/src/providers/auth/context/auth-context";
import axiosInstance, { endpoints } from "@/src/utils/axios";
import { useRouter } from "next/navigation";

export const NomadProfile = React.memo(({ defaultValues, isEdit }) => {
  const { user, setUser } = useAuthContext();
  const router = useRouter();
  console.log("ise Edit", isEdit);

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
    profile_img: Yup.mixed().required("Profile is required"),
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().optional("Last name is required"),
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
        console.log("create triggered");
        let updatedData = {
          ...data,
          user_id: user?.id,
        };
        const formData = new FormData();

        for (const key in updatedData) {
          if (updatedData[key] !== null && updatedData[key] !== undefined) {
            if (
              typeof updatedData[key] === "object" &&
              !(updatedData[key] instanceof File)
            ) {
              // If the value is an object and not a File, stringify it
              formData.append(key, JSON.stringify(updatedData[key]));
            } else {
              // Otherwise, append the value as it is
              formData.append(key, updatedData[key]);
            }
          }
        }

        const response = await axiosInstance.post(
          endpoints.nomad.create,
          formData
        );
        if (response?.status === 201) {
          enqueueSnackbar("Success", { variant: "success" });
          setUser(response?.data?.user, response?.data?.accessToken);
          router.push("/nomad-dashboard");
        }
      } catch (error) {
        console.log(error);
        enqueueSnackbar(error?.message, { variant: "error" });
      }
    }
    // update handling
    else {
      try {
        console.log("truggred", data);

        const formData = new FormData();

        for (const key in data) {
          if (data[key] !== null && data[key] !== undefined) {
            if (typeof data[key] === "object" && !(data[key] instanceof File)) {
              formData.append(key, JSON.stringify(data[key]));
            } else {
              formData.append(key, data[key]);
            }
          }
        }

        const response = await axiosInstance.put(
          endpoints.nomad.updateProfile(defaultValues?.id),
          formData
        );
        if (response?.status === 201) {
          setUser(response?.data?.user, response?.data?.accessToken);
          enqueueSnackbar("updated successfully", { variant: "success" });
          router.push("/nomad-dashboard");
        }
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
        <div
          className={`flex ${
            isEdit ? "justify-between" : "justify-start"
          } items-center w-full`}
        >
          <Breadcrumb title={"Nomad Profile"} />

          {isEdit && (
            <Typography variant="h5">{`Profile ID: ${user.id.slice(
              -6
            )}`}</Typography>
          )}
        </div>
        <RHFUploadAvatar isEdit={isEdit} name="profile_img" />
        <div className="flex flex-col gap-5 w-full max-w-screen-lg">
          <Typography variant="h5" className="font-semibold">
            Basic
          </Typography>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* <div className="flex flex-col sm:flex-row gap-5 w-full"> */}
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
            {/* </div> */}
            {/* <div className="flex flex-col sm:flex-row gap-5 w-full"> */}
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
            {/* </div> */}
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
          </div>

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
                Teaching Tools
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
              Availability
            </Typography>
            <div className="flex flex-col sm:flex-row gap-5 w-full">
              {/* Date Picker */}
              <div
                ref={datePopoverRef}
                className="relative flex flex-col w-full md:w-1/2 "
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
              {/* <div className="flex flex-col md:flex-row gap-5 w-full">
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
              </div> */}
            </div>
          </div>
        </div>
        <div className="flex justify-end w-full">
          <Button type="submit" loading={isSubmitting}>
            {isEdit ? "Save" : "Submit"}
          </Button>
        </div>
      </RHFFormProvider>
    </Pannel>
  );
});
