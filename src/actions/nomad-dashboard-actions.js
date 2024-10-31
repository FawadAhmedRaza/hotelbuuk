"use server";
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
    },
  });

  const totalRevenue = totalBookings.reduce(
    (acc, item) => acc + (item.total_price || 0),
    0
  );

  const twentyPercent = totalRevenue * 0.2;

  return twentyPercent;
}
