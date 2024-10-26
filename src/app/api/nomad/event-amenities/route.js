import { prisma } from "@/src/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const data = await req?.json();

    const { user_id, amenities } = data || {};

    if (!user_id || amenities?.length === 0) {
      return NextResponse.json(
        { message: "amenities can not be null" },
        { status: 500 }
      );
    }

    const allAmenities = amenities?.map((item) => {
      return {
        ...item,
        user_id,
      };
    });

    await prisma.amenities.createMany({
      data: allAmenities,
    });

    let updatedAmenitiesList = await prisma.amenities.findMany({
      where: {
        user_id: user_id,
      },
    });

    return NextResponse.json(
      { message: "success", amenities: updatedAmenitiesList },
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

    const amenities = await prisma.amenities.findMany({
      where: {
        user_id: user_id,
      },
    });

    return NextResponse.json(
      { message: "Success", amenities },
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
