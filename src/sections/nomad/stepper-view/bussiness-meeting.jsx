"use client";
import React, { useEffect, useState } from "react";

// Components and Others...
import {
  RHFInput,
  RHFRadio,
  RHFSelect,
  RHFTextArea,
} from "@/src/components/hook-form";
import { useForm, useFormContext } from "react-hook-form";
import { Button, Typography } from "@/src/components";

export const BussinessMeeting = () => {
  const { watch } = useFormContext();
  const accomodationType = watch("business_meeting.accomodation_type");

  // State to force re-render on accomodationType change
  const [type, setType] = useState(accomodationType);

  useEffect(() => {
    setType(accomodationType); // Update local state when type changes
  }, [accomodationType]);

  console.log(accomodationType);

  return (
    <div className="flex flex-col lg:flex-row justify-between items-start gap-5 lg:gap-10 w-full h-full">
      {/* left  */}
      <div className="flex flex-col gap-5 w-full">
        <RHFInput
          name="business_meeting.title"
          label="Title"
          placeholder="Tesla Factory Tour "
        />
        <RHFTextArea
          name="business_meeting.description"
          label="Description"
          required={true}
          placeholder="Describe your Business Tour "
        />
        <RHFInput
          name="business_meeting.official_name"
          label="Official Name"
          placeholder="John Tesla Factory Tour"
        />
      </div>
      {/* Right  */}
      <div className="flex flex-col justify-between items-start gap-10 w-full h-full">
        <RHFSelect
          name="business_meeting.business_category"
          placeholder="Select Bussiness Category"
          label="Bussiness Category"
          options={[
            { label: "Option 1", value: "option1" },
            { label: "Option 2", value: "option2" },
            { label: "Option 3", value: "option3" },
          ]}
        />
        <div className="flex flex-col gap-3 w-full">
          <Typography variant="h5" className="font-semibold">
            Accommodation Type (Where Guests will Sleep)
          </Typography>
          <div className="flex flex-col  gap-5 w-full">
            <RHFRadio
              id="hotel"
              name="business_meeting.accomodation_type"
              value="hotel"
              label="Hotel"
            />
            <RHFRadio
              id="bnb"
              name="business_meeting.accomodation_type"
              value="bnb"
              label="B&B"
            />
          </div>
        </div>

        {type === "bnb" ? (
          <>
            <div className="flex flex-col gap-3 w-full">
              <Typography variant="h5" className="font-semibold">
                Location
              </Typography>
              <div className="flex items-center gap-5 w-full">
                <RHFSelect
                  name="business_meeting.location.country"
                  placeholder="Select your Country"
                  label="Country"
                  options={[
                    { label: "Option 1", value: "option1" },
                    { label: "Option 2", value: "option2" },
                    { label: "Option 3", value: "option3" },
                  ]}
                />
                <RHFSelect
                  name="business_meeting.location.city"
                  placeholder="Select your City"
                  label="City"
                  options={[
                    { label: "Option 1", value: "option1" },
                    { label: "Option 2", value: "option2" },
                    { label: "Option 3", value: "option3" },
                  ]}
                />
              </div>
            </div>
            <RHFInput
              name="business_meeting.location.street_name"
              label="Street Address"
              placeholder="Address of your B&B"
            />
          </>
        ) : (
          <RHFSelect
            name="business_meeting.hotels"
            placeholder="Select Hotels"
            label="Hotels"
            options={[
              { label: "Option 1", value: "option1" },
              { label: "Option 2", value: "option2" },
              { label: "Option 3", value: "option3" },
            ]}
          />
        )}
      </div>
    </div>
  );
};
