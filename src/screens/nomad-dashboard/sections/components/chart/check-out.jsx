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
import { getNomadTotalCheckOuts } from "@/src/actions/nomad-dashboard-actions";

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
    label: "CheckOut",
    color: "hsl(var(--chart-2))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
};

export const CheckOutChart = ({ userId }) => {
  const now = new Date();
  const [selectedMonth, setSelectedMonth] = useState(now.getMonth());
  const [selectedYear, setSelectedYear] = useState(now.getFullYear());
  const [totalCheckOuts, setTotalCheckOuts] = useState([]);

  const fetchCheckOuts = async (month, year) => {
    try {
      const total = await getNomadTotalCheckOuts(userId, month, year);
      setTotalCheckOuts(total);
    } catch (error) {
      console.log("Error fetching check-outs:", error);
    }
  };

  useEffect(() => {
    fetchCheckOuts(selectedMonth, selectedYear);
  }, [selectedMonth, selectedYear, userId]);

  const years = Array.from(
    { length: new Date().getFullYear() - 2000 + 1 },
    (_, i) => 2000 + i
  );

  // Prepare the chart data using the day and count values from totalCheckOuts
  const chartData = totalCheckOuts.map((data) => ({
    day: data.day.toString(),
    desktop: data.count, // Use the count directly for "desktop"
    mobile: 0,
  }));

  return (
    <ShadcnCard className="bg-[#fadbd8]">
      <CardHeader>
        <Typography variant="h4" className="font-semibold mb-3">
          Check-Out Chart
        </Typography>
      </CardHeader>
      <ChartContainer className="mb-5" config={chartConfig}>
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
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

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
