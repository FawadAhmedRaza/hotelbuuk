import { prisma } from "@/src/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const data = await req?.json();

    const { user_id, room_types } = data || {};

    if (!user_id || room_types?.length === 0) {
      return NextResponse.json(
        { message: "Room types can not be null" },
        { status: 500 }
      );
    }
    const types = room_types?.map((item) => {
      return {
        ...item,
        user_id,
      };
    });
    console.log("types", types);

    let createdTypes = await prisma.room_types.createMany({
      data: types,
    });

    return NextResponse.json(
      { message: "success", types: createdTypes },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const user_id = searchParams.get("userId");

    if (!user_id) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      );
    }

    const types = await prisma.room_types.findMany({
      where: {
        user_id: user_id,
      },
    });

    return NextResponse.json(
      { message: "Success", types },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching room types:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
