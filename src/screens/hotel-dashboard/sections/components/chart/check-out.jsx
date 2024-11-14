"use client";

import { useState, useEffect } from "react";
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
import { getHotelTotalCheckOuts } from "@/src/actions/hotel-dashboard-actions";

// Month names for dropdown
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

// Chart configuration
const chartConfig = {
  desktop: {
    label: "CheckOut",
    color: "hsl(var(--chart-2))",
  },
};

export const CheckOutChart = ({ userId }) => {
  const now = new Date();
  const [selectedMonth, setSelectedMonth] = useState(now.getMonth()); // Default to current month
  const [selectedYear, setSelectedYear] = useState(now.getFullYear()); // Default to current year
  const [dailyCheckOuts, setDailyCheckOuts] = useState([]); // Store daily check-outs

  // Year options for the select dropdown (11 years range)
  const yearOptions = Array.from(
    { length: 11 },
    (_, i) => now.getFullYear() - 5 + i
  );

  // Fetch daily check-out data based on selected month and year
  const fetchDailyCheckOuts = async (month, year) => {
    try {
      const checkOuts = await getHotelTotalCheckOuts(userId, month, year);
      setDailyCheckOuts(checkOuts); // Sets dailyCheckOuts to array of { day, count }
    } catch (error) {
      console.log("Error fetching check-outs:", error);
    }
  };

  // Fetch check-outs whenever the month or year is changed
  useEffect(() => {
    fetchDailyCheckOuts(selectedMonth, selectedYear);
  }, [selectedMonth, selectedYear, userId]);

  // Prepare chart data using day and count properties
  const chartData = dailyCheckOuts.map((entry) => ({
    day: entry.day.toString(), // Convert day to string for XAxis
    desktop: entry.count, // Use count from the returned data
  }));

  return (
    <ShadcnCard className="bg-[#fadbd8]">
      <CardHeader>
        <Typography variant="h4" className="font-semibold mb-3">
          Daily Check-Out
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
            stroke="hsl(var(--chart-2))"
            strokeWidth={3}
            dot={{
              fill: "hsl(var(--chart-2))",
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
