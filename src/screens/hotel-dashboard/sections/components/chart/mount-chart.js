"use client";
import React, { useEffect, useState } from "react";
import ApexCharts from "apexcharts";
import { useRef } from "react";
import { Typography } from "@/src/components";
import { getHotelMonthlyRevenue } from "@/src/actions/hotel-dashboard-actions";
import { useAuthContext } from "@/src/providers/auth/context/auth-context";

const MountChart = () => {
  const chartRef = useRef(null);
  const { user } = useAuthContext();
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const revenue = await getHotelMonthlyRevenue(user?.id);

      // Round the revenue to two decimal places
      const roundedRevenue = parseFloat(revenue.toFixed(2));
      console.log("Rounded Revenue:", roundedRevenue);

      setMonthlyRevenue([roundedRevenue]); // Ensure it's in an array for the chart data
    };

    fetchData();

    const chartConfig = {
      series: [
        {
          name: "Sales",
          data: monthlyRevenue,
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

    return () => {
      chart.destroy();
    };
  }, [monthlyRevenue]);

  return (
    <div className="relative flex flex-col rounded-xl bg-white bg-clip-border text-primary shadow-md">
      <div className="pt-6 px-2 pb-0">
        <div className=" px-3">
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
