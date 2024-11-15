"use client";
import React, { useEffect, useRef, useState } from "react";
import * as Yup from "yup";

import {
  Breadcrumb,
  Button,
  CalendarInput,
  CustomPopover,
  DeleteModal,
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
  RHFSelect,
  RHFTextArea,
  RHFUploadAvatar,
} from "@/src/components/hook-form";
import { enqueueSnackbar } from "notistack";
import { useAuthContext } from "@/src/providers/auth/context/auth-context";
import axiosInstance, { endpoints } from "@/src/utils/axios";
import { useRouter } from "next/navigation";
import {
  electronics,
  fundraising,
  manufacturing,
  retails,
} from "@/src/_mock/_speciality";
import { getCities, getCountries } from "@/src/libs/helper";
import { useBoolean } from "@/src/hooks";
import { useDispatch, useSelector } from "react-redux";
import { deleteNomadProfile } from "@/src/redux/nomad-profile/thunk";
import { businessCategories } from "@/src/_mock/_business_categories";
import { RHFWorkPermitUploader } from "@/src/components/hook-form/rhf-work-permit-uploader";
import { RHFLocationSelect } from "@/src/components/hook-form/rhf-location-select";
import { RHFLocationInput } from "@/src/components/hook-form/rhf-location-input";

export const NomadProfile = React.memo(({ defaultValues, isEdit }) => {
  const { user, setUser, logout } = useAuthContext();
  const { isOpen, setIsOpen, toggleDrawer } = useBoolean();
  const router = useRouter();
  const dispatch = useDispatch();

  const { isLoading } = useSelector((state) => state.nomadProfile.deleteById);

  const [isDateOpen, setIsDateOpen] = useState(false);
  const datePopoverRef = useRef(null);

  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
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
    bio: Yup.string().required("bio is required"),
    linkedin: Yup.string()
      .url("Please provide a valid URL")
      .required("linked profile is required"),
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email format"),
    city: Yup.string().required("city is required"),
    country: Yup.string().required("country is required"),
    address: Yup.string().required("address is required"),

    work_permit_front_img: Yup.mixed().required("front image is required"),
    work_permit_back_img: Yup.mixed().required("back image is required"),
    work_permit_expiry_date: Yup.string().required("expiry date is required"),

    experience: Yup.string().required("Experience is required"),
    industry: Yup.string().required("industry is required"),
    electronics: Yup.string().required("Electronics field is required"),
    manufacturing: Yup.string().required("Manufacturing field is required"),
    fundraising: Yup.string().required("Fundraising field is required"),
    retails: Yup.string().required("Retails field is required"),

    projector: Yup.string().required("Projector field is required"),
    video: Yup.string().required("Video field is required"),
    sample: Yup.string().required("Sample field is required"),
    board: Yup.string().required("Retails field is required"),
    audio_system: Yup.string().required("Audio System field is required"),

    personal_competence: Yup.string().required(
      "Personal Competence field is required"
    ),
    pedagogic_competence: Yup.string().required(
      "Pedagogic Competence field is required"
    ),
    professional_competence: Yup.string().required(
      "Professional Competence field is required"
    ),
    social_competence: Yup.string().required(
      "Social Competence field is required"
    ),
    assessment_competence: Yup.string().required(
      "Assessment Competence field is required"
    ),

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

  const country = watch("country");
  const city = watch("city");
  const address = watch("address");

  useEffect(() => {
    setValue("availability.date.start_date", date?.[0]?.startDate?.toString());
    setValue("availability.date.end_date", date?.[0]?.endDate?.toString());
  }, [date]);

  useEffect(() => {
    setDate([
      {
        startDate: defaultValues.start_date || new Date(),
        endDate: defaultValues.end_date || addDays(new Date(), 1),
        key: "selection",
      },
    ]);
  }, []);

  const fetchCountries = async () => {
    try {
      const allCountries = await getCountries();
      setCountries(allCountries);
    } catch (error) {
      console.error("Failed to fetch countries:", error);
    }
  };

  const fetchCitiesForCountry = async (selectedCountry) => {
    try {
      const allCities = await getCities(selectedCountry);
      setCities(allCities);
      if (!city && allCities.length > 0) {
        setValue("city", allCities[0].value);
      }
    } catch (error) {
      console.error("Failed to fetch cities:", error);
    }
  };

  // Fetch cities when the country changes.
  useEffect(() => {
    if (country) {
      fetchCitiesForCountry(country);
    }
  }, [country]);

  // Fetch countries on initial render.
  useEffect(() => {
    fetchCountries();
  }, []);

  const handleDelete = async () => {
    try {
      await dispatch(deleteNomadProfile(user?.id)).unwrap();
      logout();
      router.push("/login");
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error?.message, { variant: "error" });
    }
  };

  const onSubmit = handleSubmit(async (data) => {
    if (!defaultValues) {
      // create handling
      try {
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
            <RHFSelect
              name="country"
              placeholder="Select your Country"
              label="Country"
              options={countries}
            />
            <RHFSelect
              name="city"
              label="City"
              options={cities}
              value={city || ""}
              onChange={(e) => setValue("city", e.target.value)}
            />
            <RHFLocationInput
              name="address"
              label="Address"
              className="w-full"
            />
            <RHFSelect
              name="experience"
              label="Experience"
              placeholder="Experience"
              options={[
                { label: "Entry level", value: "entry_level" },
                { label: "Junior level", value: "junior_level" },
                { label: "Mid-level", value: "mid_level" },
                { label: "Senior level", value: "senior_level" },
                { label: "Principle level", value: "principle_level" },
              ]}
            />
            <RHFTextArea
              name="bio"
              label="Bio"
              placeholder="Enter short bio about yourself"
            />
            <RHFInput
              name="linkedin"
              label="Linkedin"
              placeholder="https://www.linkedin.com/"
            />
          </div>

          <div className="flex flex-col gap-5">
            <Typography variant="h5" className="font-semibold">
              Work permit
            </Typography>

            <div className="flex flex-col md:flex-row gap-5 w-full">
              <div className="flex flex-row justify-between items-center gap-2 w-full">
                <RHFWorkPermitUploader
                  label="Front image"
                  name={"work_permit_front_img"}
                  className="md:w-[180px] md:h-[150px] w-[125px] h-[125px] !mx-0 !rounded-md "
                />
                <RHFWorkPermitUploader
                  label="Back image"
                  name={"work_permit_back_img"}
                  className="md:w-[180px] md:h-[150px] w-[125px] h-[125px] !mx-0 !rounded-md"
                />
              </div>
              <div className="!mt-3 w-full">
                <RHFInput
                  label="Expiry date"
                  placeholder="Work permit expiry date"
                  name="work_permit_expiry_date"
                  type="date"
                />
              </div>
            </div>
          </div>

          {/* Specialty  */}
          <div className="flex flex-col gap-5">
            <Typography variant="h5" className="font-semibold">
              Specialty
            </Typography>

            <div className="flex flex-col md:flex-row gap-5 w-full">
              <RHFSelect
                name="industry"
                label="Industry"
                placeholder="Industry"
                options={businessCategories}
              />
              <RHFSelect
                name="electronics"
                label="Electronics"
                placeholder="Electronics"
                options={electronics}
              />
            </div>
            <div className="flex flex-col md:flex-row gap-5 w-full">
              <RHFSelect
                name="manufacturing"
                label="Manufacturing"
                placeholder=" Manufacturing "
                options={manufacturing}
              />
              <RHFSelect
                name="fundraising"
                label="Fundraising"
                placeholder=" Fundraising "
                options={fundraising}
              />
            </div>
            <div className="flex flex-col md:flex-row gap-5 w-full">
              <RHFSelect
                name="retails"
                label="Retails"
                placeholder="Retails"
                options={retails}
              />
            </div>
          </div>

          {/* Teaching Tool  */}

          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <Typography variant="h5" className="font-semibold">
                Instructional Material
              </Typography>
              <Typography
                variant="p"
                className="font-medium !text-sm text-secondary"
              >
                What kind of instructional materials do you offer?
              </Typography>
            </div>

            <div className="flex flex-col md:flex-row gap-5 w-full">
              <RHFInput
                name="projector"
                placeholder="Projector"
                label="Projector"
              />
              <RHFInput name="video" placeholder="Video" label="Video" />
            </div>
            <div className="flex flex-col md:flex-row gap-5 w-full">
              <RHFInput name="sample" placeholder="Sample" label="Sample" />
              <RHFInput name="board" placeholder="Board" label="Board" />
            </div>
            <RHFInput
              name="audio_system"
              placeholder="Audio System"
              label="Audio"
            />
          </div>

          {/* Competence  */}
          <div className="flex flex-col gap-5">
            <Typography variant="h5" className="font-semibold">
              Competencies
            </Typography>

            <div className="flex flex-col md:flex-row gap-5 w-full">
              <RHFInput
                name="personal_competence"
                placeholder="Personal Competence"
                label="Personal Competence"
              />
              <RHFInput
                name="pedagogic_competence"
                placeholder="Pedagogic Competence"
                label="Pedagogic Competence"
              />
            </div>
            <div className="flex flex-col md:flex-row gap-5 w-full">
              <RHFInput
                name="professional_competence"
                placeholder="Professional Competence"
                label="Professional Competence"
              />
              <RHFInput
                name="social_competence"
                placeholder="Social Competence"
                label="Social Competence"
              />
            </div>
            <div className="flex flex-col md:flex-row gap-5 w-full">
              <RHFInput
                name="assessment_competence"
                placeholder="Assessment Competence"
                label="Assessment Competence"
              />
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
                  startDate={date?.[0]?.startDate?.toString()?.slice(0, 10)}
                  endDate={date?.[0]?.endDate?.toString()?.slice(0, 10)}
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
            </div>
          </div>
        </div>
        <div className="flex justify-end w-full gap-3">
          <Button
            type="button"
            className="!bg-red-600"
            onClick={() => setIsOpen(!isOpen)}
          >
            Delete profile
          </Button>
          <Button className="bg-slate-900" type="submit" loading={isSubmitting}>
            {isEdit ? "Save" : "Submit"}
          </Button>
        </div>
      </RHFFormProvider>

      {isOpen && (
        <DeleteModal
          isLoading={isLoading}
          title="Delete Profile"
          isOpen={isOpen}
          onClose={toggleDrawer}
          handleDelete={handleDelete}
        >
          <Typography variant="p">
            Are you sure you want to delete your profile ? this action will
            delete all of your data?
          </Typography>
        </DeleteModal>
      )}
    </Pannel>
  );
});
