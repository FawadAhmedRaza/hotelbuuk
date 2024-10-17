import { NextResponse } from "next/server";

import { prisma } from "@/src/db";
import { generateToken } from "@/src/service/tokenGenerator";

export default async function POST(req) {
  try {
    const data = await req.json();

    const { otp, email } = data;

    if (!email || !otp) {
      return NextResponse.json(
        { message: "all fields are required" },
        { status: 404 }
      );
    }

    const user = await prisma.user.findFirst({
      where: {
        confirmation_OTP: otp,
        email,
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid Crediantials" },
        { status: 404 }
      );
    }

    const updatedUser = await prisma.user.update({
      where: {
        email: user.email,
      },
      data: {
        confirmation_OTP: "",
        is_verified_user: true,
      },
    });

    const accessToken = await generateToken(updatedUser);
    return NextResponse.json(
      {
        data: { accessToken, user: updatedUser },
        message: "User confirmed.",
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
