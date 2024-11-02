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

export async function getTotalNomads() {
  return await prisma.nomad.findMany();
}

export async function getTotalRooms(hotel_id) {
  return await prisma.hotel_rooms.findMany({
    where: {
      hotel_id: hotel_id,
    },
  });
}

export async function getTotalHotelRevenue(user_id) {
  const totalBookings = await prisma.booking.findMany({
    where: {
      user_id,
      booking_status: "ACCEPTED",
    },
  });

  const totalRevenue = totalBookings.reduce(
    (acc, item) => acc + (item.total_price || 0),
    0
  );

  const twentyPercent = totalRevenue * 0.2;

  return twentyPercent;
}

export async function getHotelMonthlyRevenue(user_id) {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const totalBookings = await prisma.booking.findMany({
    where: {
      user_id,
      createdAt: {
        gte: new Date(currentYear, currentMonth, 1),
        lt: new Date(currentYear, currentMonth + 1, 1),
      },
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  let cumulativeRevenue = 0;
  const revenueArray = totalBookings?.map((item) => {
    cumulativeRevenue += item.total_price || 0;
    return cumulativeRevenue;
  });

  const revenuePercentageArray = revenueArray?.map((value) => value * 0.2);
  return revenuePercentageArray;
}

export async function getHotelTotalCheckIns(user_id) {
  const now = new Date();
  const startOfCurrentMonth = startOfMonth(now).toUTCString();
  const endOfCurrentMonth = endOfMonth(now).toUTCString();

  const bookings = await prisma.booking.count({
    where: {
      user_id,
      booking_status: "ACCEPTED",
      hotel_event: {
        start_date: {
          gte: startOfCurrentMonth,
          lte: endOfCurrentMonth,
        },
      },
    },
  });

  return bookings;
}

export async function getHotelTotalCheckOuts(user_id) {
  const now = new Date();
  const startOfCurrentMonth = startOfMonth(now).toUTCString();
  const endOfCurrentMonth = endOfMonth(now).toUTCString();

  const bookings = await prisma.booking.count({
    where: {
      user_id,
      booking_status: "ACCEPTED",
      hotel_event: {
        end_date: {
          gte: startOfCurrentMonth,
          lte: endOfCurrentMonth,
        },
      },
    },
  });

  return bookings;
}
