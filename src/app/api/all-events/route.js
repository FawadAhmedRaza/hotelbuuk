import { NextResponse } from "next/server";
import { prisma } from "@/src/db";

export async function GET() {
  try {
    const nomadEvents = await prisma.nomad_event.findMany({
      include: {
        event_images: true,
        event_topics: true,
        event_associated_amenities: true,
      },
    });

    const hotelEvents = await prisma.hotel_event.findMany({
      include: {
        event_topics: true,
        event_associated_amenities: true,
        user: {
          include: {
            hotels: {
              include: {
                hotelImages: true,
              },
            },
          },
        },
      },
    });

    const allEvents = [...nomadEvents, ...hotelEvents];

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
