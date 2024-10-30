import { prisma } from "@/src/db";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req?.url);
    let user_id = searchParams.get("user_id");

    if (!user_id) {
      return NextResponse.json({ message: "id is required" }, { status: 400 });
    }

    const isGuestExist = await prisma.guest.findFirst({
      where: {
        userId: user_id,
      },
    });

    if (!isGuestExist) {
      return NextResponse.json({ message: "Guest not found" }, { status: 404 });
    }

    const guestBookings = await prisma.booking.findMany({
      where: {
        guest_id: isGuestExist?.id,
      },
      include: {
        hotel_event: {
          include: {
            hotel: true,
            nomad: true,
          },
        },
        nomad_event: {
          include: {
            hotel: true,
          },
        },
      },
    });

    return NextResponse.json(
      { message: "success", bookings: guestBookings },
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
