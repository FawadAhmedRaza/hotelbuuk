import { NextResponse } from "next/server";

import { prisma } from "@/src/db";

import { saltAndHashPassword } from "@/src/libs/helper";
import { generateToken } from "@/src/service/tokenGenerator";

export async function POST(req) {
  try {
    const data = await req.json();

    const { otp, email, newPassword } = data;

    if (!otp || !email || !newPassword) {
      return NextResponse.json(
        { message: "All fields are required" },
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

    const hashedPassword = saltAndHashPassword(newPassword);

    const updatedUser = await prisma.user.update({
      where: {
        email: user.email,
      },
      data: {
        password: hashedPassword,
        forget_password_OTP: "",
      },
    });

    const accessToken = await generateToken(updatedUser);
    return NextResponse.json(
      {
        data: { accessToken, user: updatedUser },
        message: "Password reset successfully.",
      },
      { status: 201 }
    );
  } catch (error) {
    return {
      message: "Internal Server Error",
      statusCode: 500,
    };
  }
}
