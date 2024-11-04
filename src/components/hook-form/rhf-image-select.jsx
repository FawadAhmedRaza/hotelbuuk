"use client";

import React, { useEffect, useRef, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Typography } from "../typography";
import { Iconify } from "../iconify";
import { cn } from "@/src/libs/cn";
import get from "lodash/get";
import { ProfileAvatar } from "..";
import { useParams, usePathname } from "next/navigation";

export const RHFImageSelect = ({
  label,
  name,
  placeholder,
  options = [],
  disabled = false,
  className,
}) => {
  const { control, setValue, watch } = useFormContext();
  const [openDropdown, setOpenDropdown] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedHotel, setSelectedHotel] = useState(null); // Store selected hotel info
  const dropDownRef = useRef(null);
  console.log("selected Hotel", selectedHotel);

  const pathName = usePathname();

  console.log(pathName.split("/")[1]);

  const dashboardPath = pathName.split("/")[1];

  const hotelId = watch("business_meeting.hotel_id");
  const nomadId = watch("business_meeting.nomad_id");

  console.log("hotel id", hotelId);
  console.log("nomad id", nomadId);

  // Filter options based on the search query
  const filterOptions = options.filter((item) =>
    item?.hotel_name?.toLowerCase().includes(query.toLowerCase())
  );

  const toggleDropdown = (e) => {
    e.stopPropagation();
    if (!disabled) {
      setOpenDropdown((prev) => !prev);
    }
  };

  const handleChangeQuery = (e) => {
    e.stopPropagation();
    setQuery(e.target.value);
  };

  const handleOptionClick = (field, selectedValue, selectedOption) => {
    field.onChange(selectedValue); // Store only the selected value (string or ID)
    setSelectedHotel(selectedOption); // Store the full object for rendering purposes
    setOpenDropdown(false);
    setQuery("");
  };

  useEffect(() => {
    if (hotelId) {
      const existingHotel = filterOptions.filter(
        (option) => option.value === hotelId
      );
      console.log(existingHotel);
      setSelectedHotel(existingHotel[0]);
    }
  }, [hotelId]);

  useEffect(() => {
    if (nomadId) {
      const existingNomad = filterOptions.filter(
        (option) => option.value === nomadId
      );
      console.log(existingNomad);
      setSelectedHotel(existingNomad[0]);
    }
  }, [nomadId]);

  useEffect(() => {
    const outsideClickHandler = (e) => {
      if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
        setOpenDropdown(false);
      }
    };
    document.addEventListener("mousedown", outsideClickHandler);
    return () => {
      document.removeEventListener("mousedown", outsideClickHandler);
    };
  }, []);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, formState: { errors } }) => (
        <div
          className={cn(
            "relative flex flex-col gap-1 w-full z-10",
            className,
            disabled && "cursor-not-allowed"
          )}
        >
          {label && (
            <Typography
              variant="p"
              className={`text-custom-black !text-sm bg-white absolute -top-2.5 left-3 z-10 ${
                disabled ? "opacity-50" : ""
              }`}
            >
              {label}
            </Typography>
          )}
          <div className="relative w-full" ref={dropDownRef}>
            <div
              className={cn(
                "flex items-center justify-between rounded bg-white h-12 px-2 gap-2 border border-custom-neutral cursor-pointer",
                disabled ? "!bg-gray-100 cursor-not-allowed" : ""
              )}
              onClick={toggleDropdown}
            >
              <div className="flex items-center">
                {selectedHotel ? ( // Display the selected hotel
                  <div className="flex items-center gap-2 w-full">
                    {!selectedHotel?.image ? (
                      <Iconify
                        iconName="carbon:user-avatar-filled"
                        className="!size-8   rounded-full object-cover text-gray-500"
                      />
                    ) : (
                      <ProfileAvatar
                        src={selectedHotel?.image}
                        type="server"
                        className="w-7 h-7 object-cover rounded-md"
                      />
                    )}

                    <div>
                      <Typography
                        variant="p"
                        className="!text-sm !text-secondary"
                      >
                        {selectedHotel.hotel_name}
                      </Typography>
                      <Typography
                        variant="p"
                        className="!text-xs text-neutral-500"
                      >
                        {selectedHotel.address}
                      </Typography>
                    </div>
                  </div>
                ) : (
                  <Typography
                    variant="p"
                    className={`!text-sm px-2 grow !text-neutral-300`}
                  >
                    {placeholder}
                  </Typography>
                )}
              </div>
              <Iconify
                iconName="mingcute:down-fill"
                className={`!text-primary group-hover:text-blue transition-all duration-500 ${
                  openDropdown ? "rotate-180" : ""
                }`}
              />
            </div>

            {openDropdown && (
              <div className="rounded-md absolute bg-white top-[52px] w-full border border-custom-neutral divide-y divide-dashed divide-custom-neutral !z-[9999] max-h-56 shadow-lg overflow-hidden">
                <div className="p-2">
                  <input
                    className="!border-b border-primary !py-1.5 w-full text-sm outline-none px-2 placeholder:text-neutral-300 text-secondary"
                    placeholder="Search..."
                    value={query}
                    onChange={handleChangeQuery}
                  />
                </div>
                <div className="overflow-auto max-h-40 divide-y divide-dashed divide-secondary hide-scrollbar">
                  {filterOptions.length > 0 ? (
                    filterOptions.map((option, index) => (
                      <div
                        key={index}
                        className={`flex items-center gap-3 py-2 px-3 hover:bg-tertiary cursor-pointer ${
                          field.value === option.value
                            ? "!text-primary bg-tertiary"
                            : "!text-custom-black"
                        }`}
                        onClick={() =>
                          handleOptionClick(field, option.value, option)
                        }
                      >
                        {/* <img
                          src={
                            option.image ||
                            "https://cdn-icons-png.flaticon.com/512/48/48779.png"
                          }
                          alt={option.hotel_name}
                          className="w-10 h-10 object-cover rounded-md"
                        /> */}
                        {/* {!option?.image ? (
                          <Iconify
                            iconName="carbon:user-avatar-filled"
                            className="!size-10   rounded-full object-cover text-gray-500"
                          />
                        ) : ( */}
                        <ProfileAvatar
                          src={option?.image}
                          type="server"
                          className="w-10 h-10 object-cover rounded-md"
                        />
                        {/* )} */}

                        <div>
                          <Typography variant="p" className="!text-sm">
                            {option.hotel_name}
                          </Typography>
                          <Typography
                            variant="p"
                            className="!text-xs text-neutral-500"
                          >
                            {option.address}
                          </Typography>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="p-3 text-sm text-primary w-full text-center">
                      No Found
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {errors && (
            <Typography
              variant="p"
              className="!text-xs text-red-400 transition-all duration-500"
            >
              {get(errors, name)?.message}
            </Typography>
          )}
        </div>
      )}
    />
  );
};
