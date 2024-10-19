"use client";

import {
  CartesianGrid,
  LabelList,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";

import {
  ShadcnCard,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../../../components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../../../../../components/ui/chart";
import { Typography } from "@/src/components";

export const description = "A line chart with a label";

const chartData = [
  { month: "Apr", desktop: 136, mobile: 80 },
  { month: "May", desktop: 75, mobile: 200 },
  { month: "Jan", desktop: 231, mobile: 120 },
  { month: "jul", desktop: 93, mobile: 190 },
  { month: "Aug", desktop: 189, mobile: 130 },
  { month: "Sep", desktop: 204, mobile: 140 },
  { month: "Oct", desktop: 54, mobile: 140 },
  { month: "Nov", desktop: 219, mobile: 140 },
  { month: "Dec", desktop: 304, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: "CheckOut",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Hotel",
    color: "hsl(var(--chart-2))",
  },
};

export const CheckOutChart = () => {
  return (
    <ShadcnCard className="">
      <CardHeader>
  
        <Typography variant="h4" className="font-semibold mb-3">                                                                    
          Check-Out
        </Typography>
      </CardHeader>
      <ChartContainer config={chartConfig}>
        <LineChart
          accessibilityLayer
          data={chartData}
          margin={{
            top: 20,
            left: -20,
            right: 12,
          }}
        >
          <CartesianGrid
            // stroke="#852169"
            strokeDasharray="5 5"
            vertical
            horizontal
          />
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
            type="natural"
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
