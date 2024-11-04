"use client";

import React, { useRef, useState, useEffect } from "react";
import { Button, Iconify, Pannel, Typography } from "../../components";
import * as Yup from "yup";
import {
  RHFDatePicker,
  RHFFormProvider,
  RHFInput,
} from "@/src/components/hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { addDays } from "date-fns";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/src/components/ui/popover";
import { RHFCalendarInput } from "@/src/components/calendar-input";
import { BookingCalender } from "@/src/components/booking-calendar";
import { RHFLocationSelect } from "@/src/components/hook-form/rhf-location-select";
import { fetchPlacesSuggestions } from "@/src/actions/google-location";
import { useTranslation } from "react-i18next";

export const BookNow = React.memo(() => {
  const [isDateOpen, setIsDateOpen] = useState(false);
  const datePopoverRef = useRef(null);

  // Date state with default values
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 1),
      key: "selection",
    },
  ]);

  const toggleDateCalender = () => setIsDateOpen(!isDateOpen);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const togglePopover = () => setIsPopoverOpen(!isPopoverOpen);

  // Validation schema
  const bookingSchema = Yup.object().shape({
    destination: Yup.string().optional("Destination is.optional"),
    startDate: Yup.date().optional("Start date is.optional"),
    endDate: Yup.date()
      .optional("End date is required")
      .min(Yup.ref("startDate"), "End date cannot be before start date"),
  });

  const methods = useForm({
    resolver: yupResolver(bookingSchema),
    defaultValues: {
      destination: "",
      startDate: date[0].startDate,
      endDate: date[0].endDate,
    },
  });

  const {
    reset,
    watch,
    formState: { errors },
  } = methods;

  console.log(errors); // Display validation errors in the console

  const location = watch("destination");

  console.log(location);

  useEffect(() => {
    async function searchLocation() {
      const loc = await fetchPlacesSuggestions(location);
      console.log(loc);
      return loc;
    }

    searchLocation();
  }, [location]);

  const handleSubmit = async (data) => {
    try {
      console.log("Submitted Data:", data); // Show submitted data in the console
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  const { t } = useTranslation();
  return (
    <Pannel>
      <RHFFormProvider
        methods={methods}
        onSubmit={methods.handleSubmit(handleSubmit)}
        className="flex flex-col gap-5 justify-start items-start w-full"
      >
        <Typography variant="h3" className="font-semibold text-center">
          {t("showMoreHotel.stayBusiness")}
        </Typography>
        <div className="flex flex-col min-900:flex-row gap-10 min-900:gap-0 justify-between items-center w-full bg-white shadow-custom-shadow-sm px-6 py-8 rounded-2xl">
          <div className="relative flex flex-col sm:flex-row justify-between min-900:justify-start items-center gap-3 lg:gap-12 xl:gap-28 w-full min-900:w-fit lg:w-full">
            {/* Destination Field */}
            <div className="flex flex-col gap-2 items-start w-full sm:w-fit min-900:min-w-40 lg:min-w-48 min-1100:min-w-56">
              <span className="flex items-center gap-3">
                <Iconify
                  iconName="carbon:location-filled"
                  className="text-primary mt-0.5"
                />
                <Typography
                  variant="p"
                  className="text-sm text-start text-custom-neutral w-full"
                >
                  {t("showMoreHotel.destination")}
                </Typography>
              </span>
              <RHFInput
                type="text"
                placeholder="Moxy Dortmunt City"
                name="destination"
                inputClass="outline-none border-none text-base font-normal !p-0"
                className="outline-none border-none !p-0 h-8 ml-1"
              />

              {/* <RHFLocationSelect
                placeholder="Moxy Dortmunt City"
                name="destination"
                inputClass="outline-none border-none text-base font-normal !p-0"
                className="outline-none border-none !p-0 h-8 ml-1"
              /> */}
            </div>

            <span className="hidden sm:flex h-16 w-[2px] bg-primary mr-8 min-900:mr-0" />

            {/* Calendar Input */}
            <div className="  w-full ">
              <Popover>
                <PopoverTrigger>
                  <BookingCalender
                    InputBoxClass=""
                    nameStart="startDate"
                    nameEnd="endDate"
                    labelStart={t("showMoreHotel.formNight")}
                    labelEnd={t("showMoreHotel.toNight")}
                    startIcon="uil:calendar-alt"
                    endIcon="uil:calendar-alt"
                    onOpenPopover={togglePopover}
                  />
                </PopoverTrigger>
                <PopoverContent className="w-full">
                  <RHFDatePicker
                    name="availability"
                    onChange={(item) => {
                      setDate([item.selection]);
                      methods.setValue("startDate", item.selection.startDate);
                      methods.setValue("endDate", item.selection.endDate);
                    }}
                    value={date}
                    rangeColors={["#852169"]}
                    twoSideCalendar={true}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Button type="submit" className="w-full sm:w-fit text-nowrap">
                {t("common.bookNow")}
              </Button>
            </div>
          </div>
        </div>
      </RHFFormProvider>
    </Pannel>
  );
});
