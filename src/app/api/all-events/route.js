import { NextResponse } from "next/server";
import { prisma } from "@/src/db";

export async function GET() {
  try {
    const nomadEvents = await prisma.nomad_event.findMany({
      include: {
        event_images: true,
        event_topics: true,
        event_associated_amenities: true,
        hotel: {
          include: {
            hotelImages: true,
          },
        },
      },
    });

    const modifiedNomadEvents = nomadEvents.map((event) => ({
      ...event,
      type: "NOMAD",
    }));

    const hotelEvents = await prisma.hotel_event.findMany({
      include: {
        event_topics: true,
        event_associated_amenities: true,
        nomad: true,
        hotel: {
          include: {
            hotelImages: true,
          },
        },
      },
    });

    const modifiedHotelEvents = hotelEvents.map((event) => ({
      ...event,
      type: "HOTEL",
    }));

    const allEvents = [...modifiedNomadEvents, ...modifiedHotelEvents];

    return NextResponse.json(
      { message: "success", Events: allEvents },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server error" },
      { status: 500 }
    );
  }
}
