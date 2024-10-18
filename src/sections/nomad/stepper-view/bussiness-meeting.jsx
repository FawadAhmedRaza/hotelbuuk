"use client";
import React, { useEffect, useState } from "react";

// Components and Others...
import {
  RHFCheckbox,
  RHFImageSelect,
  RHFInput,
  RHFRadio,
  RHFSelect,
  RHFTextArea,
} from "@/src/components/hook-form";
import { useForm, useFormContext } from "react-hook-form";
import { Button, Typography } from "@/src/components";
import { bnb_amenities } from "@/src/_mock/_popolar-amentities";
import { businessCategories } from "@/src/_mock/_business_categories";
import { hotels } from "@/src/_mock/_hotel-qna";

export const BussinessMeeting = () => {
  const { watch, setValue } = useFormContext();
  const accomodationType = watch("business_meeting.accomodation_type");

  // State to force re-render on accomodationType change
  const [type, setType] = useState(accomodationType);

  useEffect(() => {
    setType(accomodationType); // Update local state when type changes
  }, [accomodationType]);

  return (
    <div className="flex flex-col gap-10">
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
          <div className="flex flex-col gap-5 ">
            <Typography variant="h4" className="font-semibold">
              Available Amenities in your B&B
            </Typography>
            <div className="grid grid-cols-1  md:grid-cols-3 gap-3 py-5 lg:py-0">
              {bnb_amenities.map((amenity, index) => (
                <RHFCheckbox
                  key={index}
                  name={amenity.name}
                  label={amenity.label}
                />
              ))}
            </div>
          </div>
        </div>
        {/* Right  */}
        <div className="flex flex-col justify-between items-start gap-10 w-full h-full">
          <RHFSelect
            name="business_meeting.business_category"
            placeholder="Select Bussiness Category"
            label="Bussiness Category"
            options={businessCategories}
          />
          <div className="flex flex-col gap-3 w-full">
            <Typography variant="h5" className="font-semibold">
              Accommodation Type (Where Guests will Sleep)
            </Typography>
            <div className="flex flex-col  gap-5 w-full">
              <div className="flex flex-col gap-1">
                <RHFRadio
                  id="hotel"
                  name="business_meeting.accomodation_type"
                  value="hotel"
                  label="Hotel"
                />
                <Typography variant="p" className="!text-xs">
                  (You partnered with local hotels to take their guests on
                  Business Tours){" "}
                </Typography>
              </div>
              <div className="flex flex-col gap-1">
                <RHFRadio
                  id="bnb"
                  name="business_meeting.accomodation_type"
                  value="bnb"
                  label="B&B"
                />
                <Typography variant="p" className="!text-xs">
                  (Business Guests stay in your B&B. You also take them on
                  Business Tours)
                </Typography>
              </div>
            </div>
          </div>

          {type === "bnb" ? (
            <>
              <div className="flex flex-col gap-3 w-full">
                <Typography variant="h5" className="font-semibold">
                  Location
                </Typography>
                <div className="flex flex-col md:flex-row gap-5  w-full">
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
            // <RHFSelect
            //   name="business_meeting.hotels"
            //   placeholder="Select Hotels"
            //   label="Hotels"
            //   options={[
            //     { label: "Option 1", value: "option1" },
            //     { label: "Option 2", value: "option2" },
            //     { label: "Option 3", value: "option3" },
            //   ]}
            // />

            <RHFImageSelect
              name="business_meeting.hotel"
              placeholder="Select Hotels"
              label="Hotels"
              options={hotels}
            />
          )}
        </div>
      </div>

      {/* Image Uploader */}

      {/* <div className="w-full">
        <label
          for="uploadFile1"
          className="bg-white text-primary-500 font-semibold text-base rounded  h-52 flex flex-col items-center justify-center cursor-pointer border-2 !border-primary-300 border-dashed mx-auto font-[sans-serif]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 sm:w-11 mb-2 fill-gray-500"
            viewBox="0 0 32 32"
          >
            <path
              d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
              data-original="#000000"
            />
            <path
              d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
              data-original="#000000"
            />
          </svg>
          Upload file
          <input type="file" id="uploadFile1" className="hidden" />
          <p class="text-xs font-medium text-gray-400 mt-2">
            PNG, JPG and JPEG are Allowed.
          </p>
        </label>
      </div> */}
    </div>
  );
};
