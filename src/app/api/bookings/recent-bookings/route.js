import { prisma } from "@/src/db";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    let { searchParams } = new URL(req?.url);
    let user_id = searchParams.get("user_id");
    let event_type = searchParams.get("type");

    if (!user_id || !event_type) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 404 }
      );
    }

    let recentBookings;
    if (event_type === "HOTEL") {
      recentBookings = await prisma.booking.findMany({
        where: {
          user_id: user_id,
        },
        orderBy: {
          createdAt: "desc",
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
        take: 5,
      });
    } else {
      recentBookings = await prisma.booking.findMany({
        where: {
          user_id: user_id,
        },
        orderBy: {
          createdAt: "desc",
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
        take: 5,
      });
    }

    return NextResponse.json(
      { message: "success", recentBookings },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
