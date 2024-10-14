import React from "react";

// Components and Others...
import {
  RHFFormProvider,
  RHFInput,
  RHFRadio,
  RHFSelect,
  RHFTextArea,
} from "@/src/components/hook-form";
import { useForm } from "react-hook-form";
import { Typography } from "@/src/components";

export const BussinessMeeting = () => {
  return (
    <div className="flex justify-between items-start gap-10 w-full h-full">
      {/* left  */}
      <div className="flex flex-col gap-5 w-full">
        <RHFInput
          name="title"
          label="Title"
          placeholder="Title of your Listing"
        />
        <RHFTextArea
          name="description"
          label="Description"
          placeholder="Enter Short Description "
        />
        <RHFInput
          name="offcial_name"
          label="Offcial Name"
          placeholder="Official Name"
        />
      </div>
      {/* Right  */}
      <div className="flex flex-col justify-between items-start gap-10 w-full h-full">
        <RHFSelect
          name="category"
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
            <RHFRadio name="accommodation_type" value="hotel" label="Hotel" />
            <RHFRadio name="accommodation_type" value="bnb" label="B&B" />
          </div>
        </div>

        <div className="flex flex-col gap-3 w-full">
          <Typography variant="h5" className="font-semibold">
            Location
          </Typography>
          <div className="flex items-center gap-5 w-full">
            <RHFSelect
              name="country"
              placeholder="Select your Country"
              label="Country"
              options={[
                { label: "Option 1", value: "option1" },
                { label: "Option 2", value: "option2" },
                { label: "Option 3", value: "option3" },
              ]}
            />
            <RHFSelect
              name="city"
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
          name="street_name"
          label="Street Address"
          placeholder="Enter your Street Address"
        />
      </div>
    </div>
  );
};
