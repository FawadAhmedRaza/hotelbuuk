import { prisma } from "@/src/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const data = await req.json();

    const { business_amenities } = data || {};

    if (!business_amenities) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    await prisma.business_amenities.createMany({
      data: business_amenities,
    });

    return NextResponse.json({ message: "Success" }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
