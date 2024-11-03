import { prisma } from "@/src/db";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const user_id = searchParams.get("user_id");

    if (!user_id) {
      return NextResponse.json(
        { message: "User id is required" },
        { status: 400 }
      );
    }

    const checkUser = await prisma.user.findUnique({
      where: {
        id: user_id,
      },
    });

    if (!checkUser) {
      return NextResponse.json({ message: "user not found" }, { status: 404 });
    }

    const notificationsList = await prisma.notifications.findMany({
      where: {
        user_id: user_id,
      },
    });

    return NextResponse.json({ message: "success", list: notificationsList });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
