import React, { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";
import { Typography } from "@/src/components";

const ThisMonthBooking = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chartConfig = {
      series: [
        {
          name: "Sales",
          data: [50, 40, 300, 320, 500, 350, 200, 230, 500],
        },
      ],
      chart: {
        type: "bar",
        height: 300,
        toolbar: {
          show: false,
        },
      },
      title: {
        show: false,
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
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        labels: {
          style: {
            colors: "#852169",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
        categories: [
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
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
        xaxis: {
          lines: {
            show: true,
          },
        },
        padding: {
          top: 5,
          right: 20,
        },
      },
      fill: {
        opacity: 0.8,
      },
      tooltip: {
        theme: "light",
      },
    };

    const chart = new ApexCharts(chartRef.current, chartConfig);
    chart.render();

    // Cleanup on component unmount
    return () => {
      chart.destroy();
    };
  }, []);

  return (
    <div className="relative flex flex-col rounded-xl bg-white bg-clip-border text-primary shadow-md">
      <div className="pt-6 px-2 pb-0">
        <div className=" px-3">
          <Typography variant="h4" className="font-semibold">
            This Month Booking
          </Typography>
        </div>
        <div id="bar-chart" ref={chartRef}></div>
      </div>
    </div>
  );
};

export default ThisMonthBooking;
