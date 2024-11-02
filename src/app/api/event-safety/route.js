import { NextResponse } from "next/server";

import { prisma } from "@/src/db";

export async function POST(req) {
  try {
    const data = await req.json();
    console.log("data",data);

    const { safety, user_id } = data || {};

    if (!safety || !user_id) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const transformArr = safety?.map((item) => {
      return {
        ...item,
        user_id,
      };
    });

    await prisma.event_safety.createMany({
      data: transformArr,
    });

    let updatedList = await prisma.event_safety.findMany({
      where: {
        user_id,
      },
    });

    return NextResponse.json(
      { message: "success", safety: updatedList },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);

    const user_id = searchParams.get("user_id");

    const safety = await prisma.event_safety.findMany({
      where: {
        user_id,
      },
    });

    return NextResponse.json({ message: "Success", safety }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
