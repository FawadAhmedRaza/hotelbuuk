import { NextResponse } from "next/server";

import { prisma } from "@/src/db";

export default async function POST(req) {
  try {
    const data = await req.json();

    const { email, otp } = data;

    if (!email || !otp) {
      return NextResponse.json(
        { message: "email and otp is required" },
        { status: 404 }
      );
    }

    const user = await prisma.user.findFirst({
      where: {
        forget_password_OTP: otp,
        email,
      },
    });

    if (!user) {
      return NextResponse.json({ message: "Invalid Otp." }, { status: 404 });
    }

    return NextResponse.json(
      {
        message: "otp is valid.",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
