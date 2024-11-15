"use server";
import { endOfMonth, startOfMonth, parse } from "date-fns";
import { prisma } from "../db";

export async function getTotalBookingsNomad(userId) {
  return await prisma.booking.findMany({
    where: {
      user_id: userId,
    },
  });
}

export async function getNomadBookingData(userId, month, year) {
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

export async function getTotalHotels() {
  return await prisma.hotel_info.findMany();
}

export async function getTotalNomadRevenue(user_id) {
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

export async function getNomadMonthlyRevenue(user_id, month, year) {
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

export async function getNomadTotalCheckIns(user_id, month, year) {
  const startOfMonthDate = new Date(year, month, 1);
  const endOfMonthDate = new Date(year, month + 1, 0);

  // Normalize dates to avoid time discrepancies
  startOfMonthDate.setHours(0, 0, 0, 0);
  endOfMonthDate.setHours(23, 59, 59, 999);

  const checkins = await prisma.booking.findMany({
    where: {
      user_id: user_id,
      booking_status: "PAID",
    },
    include: {
      nomad_event: {
        select: {
          start_date: true,
        },
      },
    },
  });

  // Create an array to hold daily check-in counts
  const dailyCheckIns = Array.from(
    { length: endOfMonthDate.getDate() },
    () => 0
  );

  // Aggregate check-ins by day
  checkins.forEach((checkin) => {
    if (checkin.nomad_event?.start_date) {
      const startDate = new Date(checkin.nomad_event.start_date);

      if (startDate >= startOfMonthDate && startDate <= endOfMonthDate) {
        const dayIndex = startDate.getDate() - 1; // Zero-based index for the array
        dailyCheckIns[dayIndex]++;
      }
    }
  });

  // Transform the array of daily counts into the desired format
  return dailyCheckIns.map((count, index) => ({
    day: index + 1, // Convert index back to 1-based day
    count: count,
  }));
}

export async function getNomadTotalCheckOuts(user_id, month, year) {
  const startOfMonthDate = new Date(year, month, 1);
  const endOfMonthDate = new Date(year, month + 1, 0);

  const checkins = await prisma.booking.findMany({
    where: {
      user_id: user_id,
      booking_status: "PAID",
    },
    include: {
      nomad_event: {
        select: {
          end_date: true,
        },
      },
    },
  });

  const dailyCheckouts = Array.from(
    { length: endOfMonthDate.getDate() },
    () => 0
  );

  checkins.forEach((checkin) => {
    if (checkin.nomad_event?.end_date) {
      const endDate = new Date(checkin.nomad_event.end_date);

      if (endDate >= startOfMonthDate && endDate <= endOfMonthDate) {
        const dayIndex = endDate.getDate() - 1;
        dailyCheckouts[dayIndex]++;
      }
    }
  });

  // Transform the array of daily counts into the desired format
  return dailyCheckouts.map((count, index) => ({
    day: index + 1,
    count: count,
  }));
}
