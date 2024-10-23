import { prisma } from "@/src/db";
import { generateSignedUrl } from "@/src/utils/upload-images";
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

    const hotelList =  await Promise.all(hotels?.map(async(hotel) => ({
      ...hotel,
      hotel_image:await generateSignedUrl(hotel.hotel_image),
      hotelFacilites: hotel?.hotelFacilites?.map(
        (facilityEntry) => facilityEntry?.facility
      ),
    })));

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