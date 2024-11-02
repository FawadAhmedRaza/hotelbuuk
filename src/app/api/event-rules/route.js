import { NextResponse } from "next/server";

import { prisma } from "@/src/db";

export async function POST(req) {
  try {
    const data = await req.json();

    const { rules, user_id } = data || {};

    if (!rules || !user_id) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const transformArr = rules?.map((item) => {
      return {
        ...item,
        user_id,
      };
    });

    await prisma.event_rules.createMany({
      data: transformArr,
    });

    let updatedList = await prisma.event_rules.findMany({
      where: {
        user_id,
      },
    });

    return NextResponse.json(
      { message: "success", rules: updatedList },
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

    const rules = await prisma.event_rules.findMany({
      where: {
        user_id,
      },
    });

    return NextResponse.json({ message: "Success", rules }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
