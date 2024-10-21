import { prisma } from "@/src/db";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const hotels = await prisma.hotel_info?.findMany({
      include: {
        hotelFacilites: {
          include: {
            facility: true,
          },
        },
      },
    });

    const hotelList = hotels?.map((hotel) => ({
      ...hotel,
      hotelFacilites: hotel?.hotelFacilites?.map(
        (facilityEntry) => facilityEntry?.facility
      ),
    }));

    return NextResponse.json(
      { message: "success", hotelList },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
