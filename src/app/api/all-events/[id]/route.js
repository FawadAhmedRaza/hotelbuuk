import { NextResponse } from "next/server";
import { prisma } from "@/src/db";

export async function GET() {
  try {
    const nomadEvents = await prisma.nomad_event.findMany({
     
    });

    // const hotelEvents = await prisma.hotel_event.findMany({
    //   include: {
    //     event_topics: true,
    //     event_associated_amenities: true,
    //   },
    // });

    // const allEvents = [...nomadEvents, ...hotelEvents];

    return NextResponse.json(
      { message: "success", Events: nomadEvents },
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
