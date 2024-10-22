"use client";

import React, { useRef, useState } from "react";
import {
  Button,
  CalendarInput,
  Card,
  CustomPopover,
  Iconify,
  Pannel,
  Typography,
} from "../../components";
import * as Yup from "yup";

import {
  RHFDatePicker,
  RHFFormProvider,
  RHFInput,
} from "@/src/components/hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { addDays } from "date-fns";

export const BookNow = React.memo(() => {
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

  const toggleDateCalender = () => setIsDateOpen(!isDateOpen);

  const bookingSchema = Yup.object().shape({
    destination: Yup.string().required("Destination is required"),
  });

  const methods = useForm({
    resolver: yupResolver(bookingSchema),
    defaultValues: {
      destination: "",
    },
  });

  const {
    reset,
    formState: { errors },
  } = methods;

  console.log(errors);

  const handleSubmit = async (data) => {
    try {
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Pannel>
      <RHFFormProvider
        methods={methods}
        onSubmit={methods.handleSubmit(handleSubmit)}
        className="flex flex-col gap-5 justify-start items-start "
      >
        <Typography
          variant="h3"
          className="font-semibold text-center mt-24 md:mt-16 lg:mt-10"
        >
          Stay For Business Meetings
        </Typography>
        <Card className="w-full">
          <div className="relative flex flex-col sm:flex-row justify-between md:justify-start items-center gap-3 md:gap-5 lg:gap-20 xl:gap-28 grow w-full">
            {/* Destination  */}
            <div className="flex flex-col gap-2 items-start justify-start sm:justify-start min-w-56 ">
              <span className="flex items-center gap-3">
                <Iconify
                  iconName="carbon:location-filled"
                  className="text-primary mt-0.5"
                />
                <Typography
                  variant="p"
                  className="text-sm text-start text-custom-neutral w-full"
                >
                  Destination
                </Typography>
              </span>

              <RHFInput
                type="text"
                placeholder="Moxy Dortmunt City"
                name="destination"
                inputClass="outline-none border-none text-base  font-normal !p-0"
                className="outline-none border-none !p-0 h-8  ml-1"
              />
            </div>

            <span className=" hidden sm:flex h-16 w-[2px] bg-primary" />
            {/* Calendar   */}
            <div
              ref={datePopoverRef}
              className=" relative flex flex-col gap-2 items-start justify-start sm:justify-start w-full"
            >
              <span className="flex items-center gap-3">
                <Iconify
                  iconName="octicon:checklist-16"
                  className="text-primary mt-0.5 "
                />
                <Typography
                  variant="p"
                  className="text-sm text-start text-custom-neutral w-full"
                >
                  Night
                </Typography>
              </span>

              <CalendarInput
                type="text"
                placeholder="00-00-000 to 00-00-000"
                name="destination"
                inputClass="outline-none text-base  font-normal !py-0 px-2 border-none hover:bg-neutral-100 w-fit transition-all duration-500                 "
                className="outline-none border-none !p-0 h-8 -ml-2"
                variant="small"
                startDate={date[0].startDate.toString().slice(0, 10)}
                endDate={date[0].endDate.toString().slice(0, 10)}
                onClick={toggleDateCalender}
              />

              <CustomPopover
                popoverRef={datePopoverRef}
                isOpen={isDateOpen}
                onClose={toggleDateCalender}
                arrow={false}
                className="flex flex-col overflow-hidden mt-4 w-fit "
                parentClass="!left-0 top-12"
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
          <Button type="submit" className="w-full sm:w-fit text-nowrap ">
            Book Now
          </Button>
        </Card>
      </RHFFormProvider>
    </Pannel>
  );
});
