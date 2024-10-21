import { prisma } from "@/src/db";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const hotelInfo = await prisma.hotel_info.findFirst({
      where: {
        user_id: params?.id,
      },
    });

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
