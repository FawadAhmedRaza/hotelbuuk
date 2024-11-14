"use server";
import { prisma } from "../db";

import { endOfMonth, startOfMonth } from "date-fns";

export async function getTotalBookings(userId) {
  return await prisma.booking.findMany({
    where: {
      user_id: userId,
    },
  });
}

export async function getHotelBookingData(userId, month, year) {
  // Ensure the month and year are valid
  const startOfMonth = new Date(year, month, 1); // Start of the selected month
  const endOfMonth = new Date(year, month + 1, 0); // End of the selected month (last day)

  // Fetch bookings for the specified user and within the selected month and year
  return await prisma.booking.findMany({
    where: {
      user_id: userId,
      createdAt: {
        gte: startOfMonth, // Greater than or equal to the start of the month
        lt: endOfMonth, // Less than the end of the month
      },
    },
  });
}

export async function getTotalNomads() {
  return await prisma.nomad.findMany();
}

export async function getTotalRooms(user_id) {
  const hotel = await prisma.hotel_info.findFirst({
    where: {
      user_id,
    },
    select: {
      id: true,
    },
  });

  return await prisma.hotel_rooms.findMany({
    where: {
      hotel_id: hotel?.id,
    },
  });
}

export async function getTotalHotelRevenue(user_id) {
  const totalBookings = await prisma.booking.findMany({
    where: {
      user_id,
      booking_status: "PAID",
    },
  });

  const totalRevenue = totalBookings.reduce(
    (acc, item) => acc + (item.total_price || 0),
    0
  );

  const twentyPercent = totalRevenue * 0.2;

  return twentyPercent;
}

export async function getHotelMonthlyRevenue(user_id, month, year) {
  // Validate month and year
  if (typeof month !== "number" || typeof year !== "number") {
    console.error(
      "Invalid month or year parameter. Month:",
      month,
      "Year:",
      year
    );
    throw new Error(
      `Invalid month or year parameter. Month: ${month}, Year: ${year}`
    );
  }

  if (month < 0 || month > 11) {
    throw new Error(
      `Invalid month value. It should be between 0 (January) and 11 (December). Received: ${month}`
    );
  }

  if (year <= 0) {
    throw new Error(
      `Invalid year value. It should be a positive number. Received: ${year}`
    );
  }

  const startOfMonth = new Date(year, month, 1);
  const endOfMonth = new Date(year, month + 1, 1);

  // Check if the dates are valid
  if (isNaN(startOfMonth.getTime()) || isNaN(endOfMonth.getTime())) {
    console.error("Invalid date constructed for start or end of month");
    throw new Error("Invalid date constructed for start or end of month");
  }

  const totalBookings = await prisma.booking.findMany({
    where: {
      user_id,
      booking_status: "PAID",
      createdAt: {
        gte: startOfMonth,
        lt: endOfMonth,
      },
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  // Initialize an array for daily revenue totals
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const dailyRevenue = Array(daysInMonth).fill(0);

  // Accumulate revenue for each day
  totalBookings.forEach((item) => {
    const day = item.createdAt.getDate() - 1; // Zero-based index for the day
    dailyRevenue[day] += item.total_price || 0;
  });

  const revenuePercentageArray = dailyRevenue.map((value) => value * 0.2); // Assuming 20% revenue
  return revenuePercentageArray;
}

export async function getHotelTotalCheckIns(user_id, month, year) {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const dailyCheckIns = new Array(daysInMonth).fill(0);

  const startOfMonth = new Date(year, month, 1);
  const endOfMonth = new Date(year, month + 1, 0);

  startOfMonth.setHours(0, 0, 0, 0);
  endOfMonth.setHours(23, 59, 59, 999);

  const bookings = await prisma.booking.findMany({
    where: {
      user_id,
      booking_status: "PAID",
      hotel_event: {
        start_date: {
          gte: startOfMonth.toISOString(),
          lte: endOfMonth.toISOString(),
        },
      },
    },
  });

  bookings.forEach((booking) => {
    if (booking?.hotel_event?.start_date) {
      const startDate = new Date(booking.hotel_event.start_date);
      startDate.setHours(0, 0, 0, 0);

      if (startDate >= startOfMonth && startDate <= endOfMonth) {
        const day = startDate.getDate();
        dailyCheckIns[day - 1]++;
      }
    }
  });

  // Transform dailyCheckIns array to the required format
  return dailyCheckIns.map((count, index) => ({
    day: index + 1,
    count: count,
  }));
}

export async function getHotelTotalCheckOuts(user_id, month, year) {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const dailyCheckOuts = new Array(daysInMonth).fill(0);

  const startOfMonthDate = new Date(year, month, 1);
  const endOfMonthDate = new Date(year, month + 1, 0);

  startOfMonthDate.setHours(0, 0, 0, 0);
  endOfMonthDate.setHours(23, 59, 59, 999);

  const bookings = await prisma.booking.findMany({
    where: {
      user_id: user_id,
      booking_status: "PAID",
    },
    include: {
      hotel_event: {
        select: {
          start_date: true,
          end_date: true,
        },
      },
    },
  });

  bookings.forEach((booking) => {
    if (booking.hotel_event?.end_date) {
      const endDate = new Date(booking.hotel_event.end_date);
      endDate.setHours(0, 0, 0, 0);

      if (endDate >= startOfMonthDate && endDate <= endOfMonthDate) {
        const day = endDate.getDate();
        dailyCheckOuts[day - 1]++;
      }
    }
  });

  // Transform dailyCheckOuts array to the required format
  return dailyCheckOuts.map((count, index) => ({
    day: index + 1,
    count: count,
  }));
}
