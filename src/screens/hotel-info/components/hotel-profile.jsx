"use client";
import {
  RHFInput,
  RHFSelect,
  RHFTextArea,
  RHFUploadAvatar,
} from "@/src/components/hook-form";
import React, { useState, useEffect } from "react";
import AmenitiesModal from "./amenities-modal";
import { RHFStarsRating } from "@/src/components/hook-form/rhf-stars-rating";
import { Typography } from "@/src/components";
import { useFormContext } from "react-hook-form";
import { useModal } from "@/src/hooks/use-modal";
import { useSelector } from "react-redux";
import { getCities, getCountries } from "@/src/libs/helper";
import { useAuthContext } from "@/src/providers/auth/context/auth-context";

const HotelProfile = () => {
  const { user } = useAuthContext();
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const { hotelFacilities: facilitiesArray } = useSelector(
    (state) => state.hotelFacilities
  );

  const { watch, setValue } = useFormContext(); // Access form context

  const selectedFacilities = watch("facilities") || [];
  const country = watch("country");
  const city = watch("city");

  const openModal = useModal();
  const [refetch, setRefetch] = useState(false); // To re-trigger updates

  // Fetch countries on initial render.
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const allCountries = await getCountries();
        setCountries(allCountries);
      } catch (error) {
        console.error("Failed to fetch countries:", error);
      }
    };
    fetchCountries();
  }, []);

  // Fetch cities when the country changes.
  useEffect(() => {
    if (country) {
      fetchCitiesForCountry(country);
    }
  }, [country]);

  const fetchCitiesForCountry = async (selectedCountry) => {
    try {
      const allCities = await getCities(selectedCountry);
      setCities(allCities);
      if (!city && allCities.length > 0) {
        setValue("city", allCities[0].value); // Sync city with form context.
      }
    } catch (error) {
      console.error("Failed to fetch cities:", error);
    }
  };

  const handleCheckboxChange = (facility, checked) => {
    setValue(
      "facilities",
      checked
        ? [...selectedFacilities, facility]
        : selectedFacilities.filter(
            (selected) => selected.name !== facility.name
          )
    );
  };

  return (
    <div className="gap-y-4 my-10">
      <div className="flex justify-end w-full">
        <Typography variant="h5">{`Profile ID: ${user?.id.slice(
          -6
        )}`}</Typography>
      </div>
      <div className="flex flex-col w-full h-full justify-center items-center content-center mt-0">
        <RHFUploadAvatar isEdit={true} name="hotel_image" />
        <RHFStarsRating name="stars" label="Stars Rating" className="mt-6" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-5 w-full h-full mt-6">
        <div className="flex flex-col gap-5">
          <RHFInput
            name="hotel_name"
            label="Hotel Name"
            placeholder="Marriott hotel"
          />
          <RHFTextArea
            name="description"
            label="Hotel Bio"
            placeholder="Briefly describe your hotel"
          />

          <div className="flex flex-col gap-3 w-full mt-6">
            <div className="flex flex-row gap-4">
              <Typography variant="h6" className="font-medium">
                Hotel Facilities
              </Typography>
              <Typography
                variant="h6"
                className="font-medium text-primary hover:cursor-pointer"
                onClick={() => openModal.onTrue()} // Open modal on click
              >
                Add more
              </Typography>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {facilitiesArray?.length > 0
                ? facilitiesArray.map((facility, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedFacilities?.some(
                          (selected) => selected.name === facility.name
                        )} // Check if the facility is selected
                        onChange={(e) =>
                          handleCheckboxChange(facility, e.target.checked)
                        }
                        className="h-4 w-4 rounded-xl border border-black accent-primary transition-colors duration-200"
                      />
                      <label
                        className="text-sm text-gray-700 cursor-pointer select-none font-montserrat font-medium"
                        htmlFor={facility.name}
                      >
                        {facility.name}
                      </label>
                    </div>
                  ))
                : null}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <RHFInput
            name="contact_email"
            label="Contact E-mail"
            placeholder="support@movenpick.com"
          />
          <RHFInput
            type="number"
            name="hotel_contact_no"
            label="Phone Number"
            placeholder="Enter Contact number"
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
          <RHFInput
            name="address"
            label="Address"
            placeholder="Enter full address"
          />
        </div>
      </div>

      {openModal.onTrue && (
        <AmenitiesModal
          setRefetch={setRefetch}
          isOpen={openModal.value}
          onClose={openModal.onFalse}
        />
      )}
    </div>
  );
};

export default HotelProfile;
