"use server";

const { prisma } = require("../db");

export const getGuestTotalBookings = async (guest_id) => {
  return await prisma.booking.findMany({
    where: {
      guest_id: guest_id,
    },
  });
};
