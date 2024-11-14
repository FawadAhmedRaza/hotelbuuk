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
import { getNomadTotalCheckIns } from "@/src/actions/nomad-dashboard-actions";

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
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
};

export const CheckInChart = ({ userId }) => {
  const now = new Date();
  const [selectedMonth, setSelectedMonth] = useState(now.getMonth());
  const [selectedYear, setSelectedYear] = useState(now.getFullYear());
  const [dailyCheckIns, setDailyCheckIns] = useState([]);

  // Generate year options (e.g., from 2000 to current year)
  const yearOptions = Array.from(
    { length: now.getFullYear() - 2000 + 1 },
    (_, i) => 2000 + i
  );

  // Generate day labels for the selected month
  const getDayLabels = () => {
    const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
    return Array.from({ length: daysInMonth }, (_, i) => (i + 1).toString());
  };

  // Fetch daily check-ins for the selected month and year
  const fetchCheckIns = async (month, year) => {
    try {
      const checkIns = await getNomadTotalCheckIns(userId, month, year);
      console.log(checkIns);
      // Ensure daily check-ins array aligns with days in month
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const checkInsByDay = Array(daysInMonth).fill(0);

      // Map check-ins to each day (assuming checkIns is a list of {day, count} objects)
      checkIns.forEach(({ day, count }) => {
        checkInsByDay[day - 1] = count; // `day` is 1-based index
      });

      setDailyCheckIns(checkInsByDay); // Set daily check-ins array
    } catch (error) {
      console.log("Error fetching check-ins:", error);
    }
  };

  // Fetch check-ins when month or year changes
  useEffect(() => {
    fetchCheckIns(selectedMonth, selectedYear);
  }, [selectedMonth, selectedYear, userId]);

  // Prepare the chart data with day labels
  const dayLabels = getDayLabels();
  const chartData = dayLabels.map((day, index) => ({
    day,
    checkIns: dailyCheckIns[index] || 0, // Fill with check-ins or 0
  }));

  return (
    <ShadcnCard className="bg-[#fcf3cf]">
      <CardHeader>
        <Typography variant="h4" className="font-semibold mb-3">
          Daily Check-In Chart
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

        {/* Line Chart with Daily Check-Ins */}
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
            dataKey="checkIns"
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

// Second DUMMY DATA CHECK**********************************************************

// "use client";

// import { useEffect, useState } from "react";
// import {
//   CartesianGrid,
//   LabelList,
//   Line,
//   LineChart,
//   XAxis,
//   YAxis,
// } from "recharts";

// import { ShadcnCard, CardHeader } from "../../../../../components/ui/card";
// import {
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
// } from "../../../../../components/ui/chart";
// import { Typography } from "@/src/components";

// const monthNames = [
//   "Jan",
//   "Feb",
//   "Mar",
//   "Apr",
//   "May",
//   "Jun",
//   "Jul",
//   "Aug",
//   "Sep",
//   "Oct",
//   "Nov",
//   "Dec",
// ];

// const chartConfig = {
//   desktop: {
//     label: "CheckIn",
//     color: "hsl(var(--chart-1))",
//   },
//   mobile: {
//     label: "Mobile",
//     color: "hsl(var(--chart-2))",
//   },
// };

// // Dummy function to generate random check-ins for each day
// const getDummyCheckIns = (month, year) => {
//   const daysInMonth = new Date(year, month + 1, 0).getDate();
//   const checkIns = Array.from({ length: daysInMonth }, (_, i) => ({
//     day: i + 1,
//     count: Math.floor(Math.random() * 100), // Random check-ins between 0-99
//   }));
//   return checkIns;
// };

// export const CheckInChart = ({ userId }) => {
//   const now = new Date();
//   const [selectedMonth, setSelectedMonth] = useState(now.getMonth());
//   const [selectedYear, setSelectedYear] = useState(now.getFullYear());
//   const [dailyCheckIns, setDailyCheckIns] = useState([]);

//   // Year options (e.g., from 2000 to the current year)
//   const yearOptions = Array.from(
//     { length: now.getFullYear() - 2000 + 1 },
//     (_, i) => 2000 + i
//   );

//   // Fetch check-ins when month or year changes
//   useEffect(() => {
//     const checkIns = getDummyCheckIns(selectedMonth, selectedYear);
//     console.log("dummy data", checkIns);
//     setDailyCheckIns(checkIns.map(({ day, count }) => count));
//   }, [selectedMonth, selectedYear]);

//   // Prepare chart data with day labels
//   const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
//   const dayLabels = Array.from({ length: daysInMonth }, (_, i) =>
//     (i + 1).toString()
//   );
//   const chartData = dayLabels.map((day, index) => ({
//     day,
//     checkIns: dailyCheckIns[index] || 0,
//   }));

//   return (
//     <ShadcnCard>
//       <CardHeader>
//         <Typography variant="h4" className="font-semibold mb-3">
//           Daily Check-In Chart
//         </Typography>
//       </CardHeader>
//       <ChartContainer config={chartConfig}>
//         {/* Month and Year Selectors */}
//         <div className="flex gap-4 mt-4 px-3">
//           <select
//             className="p-2 border rounded"
//             value={selectedMonth}
//             onChange={(e) => setSelectedMonth(Number(e.target.value))}
//           >
//             {monthNames.map((month, index) => (
//               <option key={index} value={index}>
//                 {month}
//               </option>
//             ))}
//           </select>
//           <select
//             className="p-2 border rounded"
//             value={selectedYear}
//             onChange={(e) => setSelectedYear(Number(e.target.value))}
//           >
//             {yearOptions.map((year) => (
//               <option key={year} value={year}>
//                 {year}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Line Chart with Daily Check-Ins */}
//         <LineChart
//           data={chartData}
//           margin={{
//             top: 20,
//             left: -20,
//             right: 12,
//           }}
//         >
//           <CartesianGrid strokeDasharray="5 5" />
//           <XAxis
//             dataKey="day"
//             tickLine={false}
//             axisLine={false}
//             tickMargin={8}
//             tick={{ fill: "#852169" }}
//           />
//           <YAxis
//             tick={{ fill: "#852169" }}
//             tickLine={false}
//             axisLine={false}
//             tickMargin={8}
//           />
//           <ChartTooltip
//             cursor={false}
//             content={<ChartTooltipContent indicator="line" />}
//           />
//           <Line
//             dataKey="checkIns"
//             type="monotone"
//             stroke="hsl(var(--chart-1))"
//             strokeWidth={3}
//             dot={{
//               fill: "hsl(var(--chart-1))",
//             }}
//             activeDot={{
//               r: 10,
//             }}
//           >
//             <LabelList
//               position="top"
//               offset={12}
//               className="fill-foreground"
//               fontSize={12}
//             />
//           </Line>
//         </LineChart>
//       </ChartContainer>
//     </ShadcnCard>
//   );
// };
