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

export async function getTotalHotels() {
  return await prisma.hotel_info.findMany();
}

export async function getTotalNomadRevenue(user_id) {
  const totalBookings = await prisma.booking.findMany({
    where: {
      user_id,
      booking_status: "ACCEPTED", // include so the revenue will be calculated
    },
  });

  const totalRevenue = totalBookings.reduce(
    (acc, item) => acc + (item.total_price || 0),
    0
  );

  const twentyPercent = totalRevenue * 0.2;

  return twentyPercent;
}

export async function getNomadMonthlyRevenue(user_id) {
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

export async function getNomadTotalCheckIns(user_id) {
  const now = new Date();
  const startOfCurrentMonth = startOfMonth(now).toISOString();
  const endOfCurrentMonth = endOfMonth(now).toISOString();
  console.log("start end",startOfCurrentMonth,endOfCurrentMonth)

  const bookings = await prisma.booking.count({
    where: {
      user_id,
      booking_status: "ACCEPTED",
      nomad_event: {
        start_date: {
          gte: startOfCurrentMonth,
          lte: endOfCurrentMonth,
        },
      },
    },
  });
  return bookings;
}

export async function getNomadTotalCheckOuts(user_id) {
  const now = new Date();
  const startOfCurrentMonth = startOfMonth(now);
  const endOfCurrentMonth = endOfMonth(now);

  const checkins = await prisma.booking.findMany({
    where: {
      user_id: user_id,
      booking_status: "ACCEPTED",
    },
    include: {
      nomad_event: {
        select: {
          start_date: true,
        },
      },
    },
  });

  const bookings = checkins.filter((checkin) => {
    if (checkin.nomad_event && checkin.nomad_event.start_date) {
      const startDate = parse(
        checkin.nomad_event.start_date,
        "EEE MMM dd yyyy HH:mm:ss 'GMT'XXX (zzzz)",
        new Date()
      );
      return startDate >= startOfCurrentMonth && startDate <= endOfCurrentMonth;
    }
    return false;
  });

  console.log("Total check-ins:", bookings.length);
  return bookings.length;
}
