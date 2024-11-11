import { prisma } from "@/src/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const data = await req.json();

    const { event_type, event_id, topic, description, user_id } = data;

    if (!event_type || !topic || !description || !user_id || !event_id) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const isUserExist = await prisma.user.findUnique({
      where: {
        id: user_id,
      },
    });

    if (!isUserExist) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (event_type === "HOTEL") {
      await prisma.listingReports.create({
        data: {
          topic,
          description,
          hotel_event_id: event_id,
          user_id,
        },
      });
    } else {
      await prisma.listingReports.create({
        data: {
          topic,
          description,
          nomad_event_id: event_id,
          user_id,
        },
      });
    }

    return NextResponse.json({ message: "Success" }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
