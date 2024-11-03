import { prisma } from "@/src/db";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    let { searchParams } = new URL(req?.url);
    let user_id = searchParams.get("user_id");
    let event_id = searchParams.get("event_id");
    let event_type = searchParams.get("type");

    console.log("Event Detail", { event_id, user_id, event_type });

    if (!user_id || !event_type || !event_id) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 404 }
      );
    }

    let booking;
    if (event_type === "HOTEL") {
      console.log("Fetching HOTEL booking...");
      booking = await prisma.booking.findFirst({
        where: {
          guest_id: user_id,
          hotel_event_id: event_id,
        },
        include: {
          hotel_event: {
            include: {
              nomad: true,
            },
          },
          guest: true,
          user: true,
        },
      });
    } else {
      console.log("Fetching NOMAD booking...");
      booking = await prisma.booking.findFirst({
        where: {
          guest_id: user_id,
          nomad_event_id: event_id,
        },
        include: {
          nomad_event: {
            include: {
              hotel: true,
            },
          },
          guest: true,
          user: true,
        },
      });
    }

    if (!booking) {
      console.log("No booking found for given criteria");
      return NextResponse.json(
        { message: "No booking found" },
        { status: 404 }
      );
    }

    console.log("Booking found:", booking);
    return NextResponse.json(
      { message: "success", booking },
      { status: 200 }
    );
  } catch (error) {
    console.log("User Booking API Error:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
