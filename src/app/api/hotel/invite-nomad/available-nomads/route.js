import { prisma } from "@/src/db";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const hotelId = searchParams.get("hotel_id");

    if (!hotelId) {
      return NextResponse.json(
        { message: "Hotel ID is required" },
        { status: 400 }
      );
    }

    // Fetch all nomads who are NOT already invited to the specified hotel
    const nomads = await prisma.nomad.findMany({
      where: {
        NOT: {
          hotel_internal_nomads: {
            some: {
              hotel_id: hotelId,
            },
          },
        },
      },
    });

    return NextResponse.json({ message: "success", nomads }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
