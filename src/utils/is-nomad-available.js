import { prisma } from "../db";

export async function checkNomadAvailability(
  nomad_id,
  start_date_hotel,
  end_date_hotel
) {
  try {
   

    const nomad = await prisma.nomad?.findFirst({
      where: {
        id: nomad_id,
      },
      select: {
        userId: true,
      },
    });

    const hotelStartDate = new Date(start_date_hotel);
    const hotelEndDate = new Date(end_date_hotel);

    const nomadEvents = await prisma.nomad_event.findMany({
      where: {
        user_id: nomad?.userId,
      },
      select: {
        start_date: true,
        end_date: true,
      },
    });

    for (const event of nomadEvents) {
      const nomadStartDate = new Date(event.start_date);
      const nomadEndDate = new Date(event.end_date);

      if (hotelStartDate <= nomadEndDate && hotelEndDate >= nomadStartDate) {
        return false;
      }
    }

    return true;
  } catch (error) {
    console.error("Error checking nomad availability:", error);
    return false;
  }
}
