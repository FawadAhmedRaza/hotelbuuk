"use client";

import React, { useEffect, useRef, useState } from "react";
import ApexCharts from "apexcharts";
import { Typography } from "@/src/components";
import { getNomadBookingData } from "@/src/actions/nomad-dashboard-actions";

const ThisMonthBooking = ({ userId }) => {
  const chartRef = useRef(null);

  // Initialize selectedMonth and selectedYear with the current month and year
  const currentDate = new Date();
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
  const [bookingsArr, setBookingsArr] = useState([]);

  // Month names array for the dropdown
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Generate a range of years for the dropdown (e.g., last 5 years to next year)
  const yearOptions = Array.from(
    { length: 10 },
    (_, i) => currentDate.getFullYear() - 5 + i
  );

  useEffect(() => {
    // Fetch the bookings for the selected month and year
    const fetchBookings = async () => {
      try {
        const fetchedBookings = await getNomadBookingData(
          userId,
          selectedMonth,
          selectedYear
        );
        setBookingsArr(fetchedBookings);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, [selectedMonth, selectedYear, userId]); // Re-fetch when selectedMonth or selectedYear changes

  useEffect(() => {
    // Calculate the number of days in the selected month
    const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();

    // Initialize an array for each day of the month with a count of 0 bookings
    const dailyBookings = Array(daysInMonth).fill(0);

    // If there are bookings, process them and increment daily bookings
    bookingsArr.forEach((booking) => {
      const bookingDate = new Date(booking.createdAt);
      if (
        booking.event_type === "NOMAD" &&
        bookingDate.getMonth() === selectedMonth &&
        bookingDate.getFullYear() === selectedYear
      ) {
        const day = bookingDate.getDate() - 1; // Zero-indexed day of the month
        dailyBookings[day] += 1;
      }
    });

    // Generate day labels (1 through daysInMonth)
    const dayLabels = Array.from({ length: daysInMonth }, (_, i) =>
      (i + 1).toString()
    );

    // Always show the X and Y axes, even when there is no data
    const chartConfig = {
      series: [
        {
          name: "Bookings",
          data: dailyBookings,
        },
      ],
      chart: {
        type: "bar",
        height: 300,
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#852169"],
      plotOptions: {
        bar: {
          columnWidth: "40%",
          borderRadius: 2,
        },
      },
      xaxis: {
        categories: dayLabels, // Use days as x-axis labels
        labels: {
          style: {
            colors: "#852169",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
        axisBorder: {
          show: true,
          color: "#79747E",
        },
        axisTicks: {
          show: true,
          color: "#79747E",
        },
      },
      yaxis: {
        min: 0, // Always show the y-axis starting from 0
        max: Math.max(...dailyBookings) > 0 ? Math.max(...dailyBookings) : 5, // Prevent empty space on the y-axis
        labels: {
          style: {
            colors: "#852169",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
        axisBorder: {
          show: true,
          color: "#79747E",
        },
        axisTicks: {
          show: true,
          color: "#79747E",
        },
      },
      grid: {
        show: true,
        borderColor: "#79747E",
        strokeDashArray: 5,
      },
      tooltip: {
        theme: "light",
      },
    };

    // Render the chart
    const chart = new ApexCharts(chartRef.current, chartConfig);
    chart.render();

    return () => {
      chart.destroy();
    };
  }, [bookingsArr, selectedMonth, selectedYear]);

  return (
    <div className="relative flex flex-col rounded-xl bg-white bg-clip-border text-primary shadow-md">
      <div className="pt-6 px-2 pb-0">
        <div className="px-3">
          <Typography variant="h4" className="font-semibold">
            Bookings for {monthNames[selectedMonth]} {selectedYear}
          </Typography>
        </div>

        {/* Month and Year Selectors */}
        <div className="flex gap-4 mt-4 px-3">
          <select
            className="p-2 border rounded"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(Number(e.target.value))}
          >
            {monthNames.map((month, index) => (
              <option key={index} value={index}>
                {month}
              </option>
            ))}
          </select>
          <select
            className="p-2 border rounded"
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
          >
            {yearOptions.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div id="bar-chart" ref={chartRef}></div>
      </div>
    </div>
  );
};

export default ThisMonthBooking;



