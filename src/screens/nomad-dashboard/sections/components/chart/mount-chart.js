"use client";

import React, { useEffect, useRef, useState } from "react";
import ApexCharts from "apexcharts";
import { Typography } from "@/src/components";
import { getNomadMonthlyRevenue } from "@/src/actions/nomad-dashboard-actions";

const MountChart = ({ userId }) => {
  const chartRef = useRef(null);
  const [revenue, setRevenue] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth()); // Default to current month
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // Default to current year

  // Function to fetch monthly revenue data
  const fetchMonthlyRevenue = async (month, year) => {
    // Default to current month and year if values are undefined
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    // Use current month and year as fallback if undefined
    month = month !== undefined ? month : currentMonth;
    year = year !== undefined ? year : currentYear;

    console.log("Fetching revenue for:", month, year); // Debug log

    // Ensure the month and year are valid before making the request
    if (
      typeof month === "number" &&
      typeof year === "number" &&
      month >= 0 &&
      month <= 11 &&
      year > 0
    ) {
      try {
        const revenueData = await getNomadMonthlyRevenue(userId, month, year);
        setRevenue(revenueData);
      } catch (error) {
        console.error("Error fetching revenue:", error);
      }
    } else {
      console.error("Invalid month or year values:", month, year);
    }
  };

  useEffect(() => {
    fetchMonthlyRevenue(selectedMonth, selectedYear);
  }, [selectedMonth, selectedYear]);

  useEffect(() => {
    // Round the revenue data for chart display
    const roundedRevenue = revenue.map((value) =>
      parseFloat(value?.toFixed(0))
    );

    const getDayLabels = () => {
      const daysInMonth = new Date(
        selectedYear,
        selectedMonth + 1,
        0
      ).getDate();
      return Array.from({ length: daysInMonth }, (_, i) => (i + 1).toString());
    };

    const dayLabels = getDayLabels();

    const chartConfig = {
      series: [
        {
          name: "Revenue",
          data: roundedRevenue || [],
        },
      ],
      chart: {
        type: "line",
        height: 300,
        toolbar: {
          show: false,
        },
      },
      colors: ["#1F4B47"],
      stroke: {
        lineCap: "round",
        curve: "smooth",
      },
      xaxis: {
        categories: dayLabels,
        labels: {
          style: {
            colors: "#1F4B47",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
      },
      yaxis: {
        labels: {
          formatter: (value) =>
            Number.isFinite(value) ? value.toFixed(0) : value,
          style: {
            colors: "#1F4B47",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
      },
      grid: {
        borderColor: "#1F4B47",
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
  }, [revenue, selectedMonth, selectedYear]);

  const years = Array.from(
    { length: new Date().getFullYear() - 2000 + 1 },
    (_, i) => 2000 + i
  );

  return (
    <div className="relative flex flex-col rounded-xl bg-[#E7FDF1] text-[#1F4B47] shadow-md">
      <div className="pt-6 px-2 pb-0">
        <div className="px-3">
          <Typography variant="h4" className="font-semibold">
            Daily Revenue Chart
          </Typography>
        </div>
        <div className="flex gap-4 mt-4 px-">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(Number(e.target.value))}
            className="border p-2 rounded bg-white"
          >
            {Array.from({ length: 12 }).map((_, index) => (
              <option key={index} value={index}>
                {new Date(0, index).toLocaleString("default", {
                  month: "long",
                })}
              </option>
            ))}
          </select>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="border p-2 rounded bg-white"
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div ref={chartRef}></div>
      </div>
    </div>
  );
};

export default MountChart;
