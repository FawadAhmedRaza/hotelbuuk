import { NextResponse } from "next/server";

import { generateOTP } from "@/src/libs/helper";
import { generateResetPasswordOtpTemplate, otpTemplate } from "@/src/libs/otpTemplate";
import { sendMail } from "@/src/service/mailService";
import { prisma } from "@/src/db";

export async function POST(req) {
  try {
    const data = await req.json();
    const { userEmail } = data;

    if (!userEmail) {
      return NextResponse.json(
        { message: "Please provide email" },
        { status: 404 }
      );
    }

    const OTP = generateOTP();

    const user = await prisma.user.update({
      where: {
        email: userEmail,
      },
      data: {
        confirmation_OTP: OTP,
      },
    });

    await sendMail(
      "New OTP for Account verfication Request",
      userEmail,
      generateResetPasswordOtpTemplate(userEmail, OTP)
    );

    return NextResponse.json(
      { message: "email sended successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.log("resend verify otp error", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
