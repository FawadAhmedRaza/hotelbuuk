"use client";
import React from "react";
import { DateRange } from "react-date-range";
import format from "date-fns/format";
import { differenceInDays } from "date-fns"; // Import differenceInDays
import { Card, Pannel, Typography } from "@/src/components";
import { useTranslation } from "react-i18next";

const AvailabilityCalendar = ({
  dateRange,
  handleDateChange,
  isMobile,
  clearDateRange,
}) => {
  const startDate = dateRange[0]?.startDate;
  const endDate = dateRange[0]?.endDate;

  // Calculate the number of nights
  const nights =
    startDate && endDate ? differenceInDays(endDate, startDate) : 0;

  const { t } = useTranslation();
  return (
    <Pannel className="flex flex-col gap-10 lg:flex-row md:gap-5 justify-between items-center md:items-start p-4 md:p-8 bg-white ">
      <div className="text-center md:text-left  w-full">
        <Typography variant="h3" className="text-black font-semibold">
          {t("hotelDetail.availabilityCalendar.availability")}
        </Typography>
        <div className="mt-5">
          {startDate && endDate && nights > 0 ? (
            <div>
              <Typography
                variant="h4"
                className="text-lg md:text-[] font-medium"
              >
                {nights} nights in Sohna
              </Typography>
              <Typography
                variant="h5"
                className="text-gray-400 mt-2 text-sm md:text-base"
              >
                {format(startDate, "MMM d, yyyy")} -{" "}
                {format(endDate, "MMM d, yyyy")}
              </Typography>
            </div>
          ) : (
            <span>{t}</span>
          )}
        </div>
      </div>

      <div className=" h-full w-full flex justify-center items-center md:w-auto">
        <Card className=" flex-col w-fit md:w-full">
          <DateRange
            onChange={handleDateChange}
            months={isMobile ? 1 : 2}
            ranges={dateRange}
            direction={isMobile ? "vertical" : "horizontal"}
            rangeColors={["#000000"]}
            showDateDisplay={false}
            minDate={new Date()}
            color="#000000"
            weekdayDisplayFormat="EEE"
            monthDisplayFormat="MMMM yyyy"
            className=" text-[10px] sm:text-[13px] md:text-[0.745rem] xl:text-sm 2xl:text-[16px]   text-gray-800 "
          />

          {/* Date Display Section */}
          <div className="text-center mt-4 text-gray-800">
            {startDate && endDate ? (
              <div className="text-sm">
                {t("common.selectedRange")}: {format(startDate, "MMM d, yyyy")}{" "}
                - {format(endDate, "MMM d, yyyy")}
              </div>
            ) : (
              <span> {t("common.noDateSelect")}</span>
            )}
          </div>

          {/* Clear Dates Button */}
          <div
            className="text-center mt-4 text-blue-600 cursor-pointer hover:underline"
            onClick={clearDateRange} // Call clearDateRange on click
          >
            {t("common.clearData")}
          </div>
        </Card>
      </div>
    </Pannel>
  );
};

export default AvailabilityCalendar;
