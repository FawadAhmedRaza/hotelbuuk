import React, { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";
import { Typography } from "@/src/components";

const ThisMonthBooking = ({ bookingsArr }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

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
    const currentMonthName = monthNames[currentMonth];

    const currentMonthNomadBookings = bookingsArr.filter((booking) => {
      const bookingDate = new Date(booking.createdAt);
      return (
        booking.event_type === "NOMAD" &&
        bookingDate.getMonth() === currentMonth &&
        bookingDate.getFullYear() === currentYear
      );
    });

    const nomadsBookingCount = currentMonthNomadBookings.length;

    const chartConfig = {
      series: [
        {
          name: "Bookings",
          data: [nomadsBookingCount],
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
        categories: [currentMonthName], // Use the actual month name
        labels: {
          style: {
            colors: "#852169",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: "#852169",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
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

    const chart = new ApexCharts(chartRef.current, chartConfig);
    chart.render();

    return () => {
      chart.destroy();
    };
  }, [bookingsArr]);

  return (
    <div className="relative flex flex-col rounded-xl bg-white bg-clip-border text-primary shadow-md">
      <div className="pt-6 px-2 pb-0">
        <div className="px-3">
          <Typography variant="h4" className="font-semibold">
            This Month Bookings
          </Typography>
        </div>
        <div id="bar-chart" ref={chartRef}></div>
      </div>
    </div>
  );
};

export default ThisMonthBooking;
