import { NextResponse } from "next/server";

import { prisma } from "@/src/db";

export async function POST(req) {
  try {
    const data = await req.json();

    const { policies, user_id } = data || {};

    if (!policies || !user_id) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const transformArr = policies?.map((item) => {
      return {
        ...item,
        user_id,
      };
    });

    await prisma.event_cancellation_policy.createMany({
      data: transformArr,
    });

    let updatedList = await prisma.event_cancellation_policy.findMany({
      where: {
        user_id,
      },
    });

    return NextResponse.json(
      { message: "success", policy: updatedList },
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

    const policy = await prisma.event_cancellation_policy.findMany({
      where: {
        user_id,
      },
    });

    return NextResponse.json({ message: "Success", policy }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
