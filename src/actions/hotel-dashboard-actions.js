"use server";
import { prisma } from "../db";

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
  });

  const totalRevenue = totalBookings.reduce(
    (acc, item) => acc + (item.total_price || 0),
    0
  );

  const twentyPercent = totalRevenue * 0.2;

  return twentyPercent;
}
