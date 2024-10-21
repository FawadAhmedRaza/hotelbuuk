import { prisma } from "@/src/db";
import { NextResponse } from "next/server";

export async function GET(_, { params }) {
  try {
    const room = await prisma.hotel_rooms.findUnique({
      where: {
        id: params?.id,
      },
    });

    return NextResponse.json({ message: "success", room }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
