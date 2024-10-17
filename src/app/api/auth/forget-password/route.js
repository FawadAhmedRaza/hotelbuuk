import { NextResponse } from "next/server";

import { prisma } from "@/src/db";
import { generateOTP } from "@/src/libs/helper";
import { otpTemplate } from "@/src/libs/otpTemplate";
import { sendMail } from "@/src/service/mailService";

export default async function POST(req) {
  try {
    const data = await req.json();

    const user = await prisma.user.findUnique({
      where: {
        email: data?.email,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          message: "user not exists",
        },
        { status: 400 }
      );
    }

    const OTP = generateOTP(6);

    await prisma.user.update({
      where: {
        email,
      },
      data: {
        forget_password_OTP: OTP,
      },
    });

    await sendMail(
      "Forget Password OTP",
      user.email,
      otpTemplate(user.first_name, OTP)
    );

    return NextResponse.json(
      {
        message: "Otp is sent to your email",
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
