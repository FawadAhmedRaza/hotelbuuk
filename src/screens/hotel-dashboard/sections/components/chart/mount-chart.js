"use client";
import React, { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";
import { Typography } from "@/src/components";

const MountChart = ({ revenue }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const currentDate = new Date();
    const currentMonthIndex = currentDate.getMonth();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const orderedMonthNames = [...monthNames.slice(currentMonthIndex), ...monthNames.slice(0, currentMonthIndex)];

    const chartConfig = {
      series: [
        {
          name: "Sales",
          data: revenue || [],
        },
      ],
      chart: {
        type: "line",
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
      stroke: {
        lineCap: "round",
        curve: "smooth",
      },
      markers: {
        size: 0,
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
        categories: orderedMonthNames, // Use reordered month names
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

    return () => {
      chart.destroy();
    };
  }, [revenue]);

  return (
    <div className="relative flex flex-col rounded-xl bg-white bg-clip-border text-primary shadow-md">
      <div className="pt-6 px-2 pb-0">
        <div className="px-3">
          <Typography variant="h4" className="font-semibold">
            This Month Revenue
          </Typography>
        </div>
        <div id="line-chart" ref={chartRef}></div>
      </div>
    </div>
  );
};

export default MountChart;
