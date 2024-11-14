"use client";

import { useEffect, useState } from "react";
import {
  CartesianGrid,
  LabelList,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";

import { ShadcnCard, CardHeader } from "../../../../../components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../../../../../components/ui/chart";
import { Typography } from "@/src/components";
import { getHotelTotalCheckIns } from "@/src/actions/hotel-dashboard-actions";

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const chartConfig = {
  desktop: {
    label: "CheckIn",
    color: "hsl(var(--chart-1))",
  },
};

export const CheckInChart = ({ userId }) => {
  const now = new Date();
  const [selectedMonth, setSelectedMonth] = useState(now.getMonth());
  const [selectedYear, setSelectedYear] = useState(now.getFullYear());
  const [dailyCheckIns, setDailyCheckIns] = useState([]);

  const yearOptions = Array.from(
    { length: 11 },
    (_, i) => now.getFullYear() - 5 + i
  );

  // Fetch check-ins by day based on selected month and year
  const fetchDailyCheckIns = async (month, year) => {
    try {
      const checkIns = await getHotelTotalCheckIns(userId, month, year);
      console.log("Hotel CheckIns", checkIns);
      setDailyCheckIns(checkIns);
    } catch (error) {
      console.log("Error fetching check-ins:", error);
    }
  };

  useEffect(() => {
    fetchDailyCheckIns(selectedMonth, selectedYear);
  }, [selectedMonth, selectedYear, userId]);

  // Prepare the chart data with daily data for the selected month
  const chartData = dailyCheckIns.map(({ day, count }) => ({
    day: day.toString(),
    desktop: count,
  }));

  return (
    <ShadcnCard className="bg-[#fcf3cf]">
      <CardHeader>
        <Typography variant="h4" className="font-semibold mb-3">
          Daily Check-In
        </Typography>
      </CardHeader>
      <ChartContainer className="mb-5" config={chartConfig}>
        {/* Month and Year Selectors */}
        <div className="flex gap-4 mt-4 px-3">
          <select
            className="p-2 border rounded bg-white"
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
            className="p-2 border rounded bg-white"
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

        {/* Line Chart */}
        <LineChart
          data={chartData}
          margin={{
            top: 20,
            left: -20,
            right: 12,
          }}
        >
          <CartesianGrid strokeDasharray="5 5" />
          <XAxis
            dataKey="day"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tick={{ fill: "#852169" }}
          />
          <YAxis
            tick={{ fill: "#852169" }}
            tickLine={false}
            axisLine={false}
            tickMargin={8}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="line" />}
          />
          <Line
            dataKey="desktop"
            type="monotone"
            stroke="hsl(var(--chart-1))"
            strokeWidth={3}
            dot={{
              fill: "hsl(var(--chart-1))",
            }}
            activeDot={{
              r: 10,
            }}
          >
            <LabelList
              position="top"
              offset={12}
              className="fill-foreground"
              fontSize={12}
            />
          </Line>
        </LineChart>
      </ChartContainer>
    </ShadcnCard>
  );
};
