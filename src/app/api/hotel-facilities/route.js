import { NextResponse } from "next/server";

import { prisma } from "@/src/db";

export async function POST(req) {
  try {
    const data = await req.json();
    const { facilites, user_id } = data || {};

    if (!facilites || !user_id || facilites?.length === 0) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 404 }
      );
    }

    const prevFacilites = await prisma.hotel_facilities.findMany({
      where: {
        user_id: user_id,
      },
    });

    const prevFacilityNames = prevFacilites.map((item) => item.name);

    let newFacilities = facilites
      .filter((item) => !prevFacilityNames?.includes(item?.name))
      .map((item) => ({
        name: item?.name,
        user_id: user_id,
      }));

    if (newFacilities?.length > 0) {
      await prisma.hotel_facilities.createMany({
        data: newFacilities,
      });
    }

    const updatedFacilites = await prisma.hotel_facilities?.findMany({
      where: {
        user_id: user_id,
      },
    });

    return NextResponse.json(
      { message: "Success", facilites: updatedFacilites },
      { status: 201 }
    );
  } catch (error) {
    console.log("Error inserting facilities:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(req, { params }) {
  try {
    const { searchParams } = new URL(req.url);
    const user_id = searchParams.get("userId");

    const facilites = await prisma.hotel_facilities?.findMany({
      where: {
        user_id: user_id,
      },
    });

    return NextResponse.json(
      { message: "Success", facilites },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error inserting facilities:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
