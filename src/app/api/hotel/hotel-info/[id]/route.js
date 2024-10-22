import { prisma } from "@/src/db";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const hotel = await prisma.hotel_info.findFirst({
      where: {
        user_id: params?.id,
      },
      include: {
        hotelFacilites: {
          include: {
            facility: true,
          },
        },
      },
    });

    const hotelInfo = {
      ...hotel,
      facilites: hotel?.hotelFacilites?.map((x) => x?.facility),
    };
    delete hotel?.hotelFacilites;

    return NextResponse.json(
      { message: "success", hotelInfo },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server error" },
      { status: 500 }
    );
  }
}
