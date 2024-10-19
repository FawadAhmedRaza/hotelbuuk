import { NextResponse } from "next/server";

import { generateOTP, saltAndHashPassword } from "@/src/libs/helper";
import { prisma } from "@/src/db";
import { sendMail } from "@/src/service/mailService";
import { otpTemplate } from "@/src/libs/otpTemplate";

export async function POST(req) {
  try {
    const data = await req?.json();

    const { first_name, last_name, email, password, phone_number, terms } =
      data;

    if (
      !first_name ||
      !last_name ||
      !email ||
      !password ||
      !phone_number ||
      !terms
    ) {
      return NextResponse.json(
        { message: "all fields are required." },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
        user_type: "NOMAD",
      },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          message: "User with this email already exists",
        },
        { status: 400 }
      );
    }

    const hashedPassword = saltAndHashPassword(password);

    const OTP = generateOTP(6);

    const newUser = await prisma.user.create({
      data: {
        first_name,
        last_name,
        email,
        password: hashedPassword,
        phone_number,
        terms,
        confirmation_OTP: OTP,
        user_type: "NOMAD", // include user type
      },
    });

    await sendMail(
      "Test OTP",
      newUser.email,
      otpTemplate(newUser?.first_name, OTP)
    );

    return NextResponse.json(
      {
        message: "User created successfully.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
