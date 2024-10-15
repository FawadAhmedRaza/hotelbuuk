import React from "react";

// Components and Others...
import {
  RHFInput,
  RHFRadio,
  RHFSelect,
  RHFTextArea,
} from "@/src/components/hook-form";
import { Button, Typography } from "@/src/components";

export const BussinessMeeting = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-start gap-5 lg:gap-10 w-full h-full">
      {/* left  */}
      <div className="flex flex-col gap-5 w-full">
        <RHFInput
          name="business_meeting.title"
          name="business_meeting.title"
          label="Title"
          placeholder="Title of your Listing"
        />
        <RHFTextArea
          name="business_meeting.description"
          name="business_meeting.description"
          label="Description"
          required={true}
          placeholder="Enter Short Description "
        />
        <RHFInput
          name="business_meeting.official_name"
          label="Official Name"
          placeholder="Official Name"
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
            Accommodation Type
          </Typography>
          <div className="flex items-center gap-5 w-full">
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
          name="business_meeting.location.street"
          label="Street Address"
          placeholder="Enter your Street Address"
        />
      </div>
    </div>
  );
};
