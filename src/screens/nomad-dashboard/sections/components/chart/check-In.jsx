"use client";

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

export const description = "A line chart with a label";

const chartConfig = {
  desktop: {
    label: "CheckIn",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
};

export const CheckInChart = ({ totalCheckIns }) => {
  const now = new Date();
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  const currentMonthName = monthNames[now.getMonth()]; // Get the current month's name
  
  const chartData = [{ month: currentMonthName, desktop: totalCheckIns, mobile: 0 }];

  return (
    <ShadcnCard className="">
      <CardHeader>
        <Typography variant="h4" className="font-semibold mb-3">
          Check-In
        </Typography>
      </CardHeader>
      <ChartContainer config={chartConfig}>
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
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tick={{ fill: "#852169" }}
            tickFormatter={(value) => value.slice(0, 3)}
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
            type="monotone" // Change to "monotone" for a wavy line
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
