import { NextResponse } from "next/server";

import { generateOTP, saltAndHashPassword } from "@/src/libs/helper";
import { prisma } from "@/src/db";
import { sendMail } from "@/src/service/mailService";
import { otpTemplate } from "@/src/libs/otpTemplate";

export async function POST(req) {
  try {
    const data = await req?.json();

    const { email, password, terms } = data;

    if (!email || !password) {
      return NextResponse.json(
        { message: "all fields are required." },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
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
        email,
        password: hashedPassword,
        terms,
        confirmation_OTP: OTP,
      },
    });

    await sendMail("Test OTP", newUser.email, otpTemplate(newUser.email, OTP));

    const facilities = initialFacilities?.map((item) => {
      return {
        ...item,
        user_id: newUser?.id,
      };
    });

    await prisma.facilities.createMany({
      data: facilities,
    });

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

const initialFacilities = [
  { name: "Free WI-FI" },
  { name: "Parking" },
  { name: "Pool" },
  { name: "Gym" },
  { name: "Restaurant" },
];
