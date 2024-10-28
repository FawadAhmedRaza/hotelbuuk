import { NextResponse } from "next/server";

import { generateOTP, saltAndHashPassword } from "@/src/libs/helper";
import { prisma } from "@/src/db";
import { sendMail } from "@/src/service/mailService";
import { otpTemplate } from "@/src/libs/otpTemplate";
import { room_facilities } from "@/src/_mock/_room";
import { bnb_amenities } from "@/src/_mock/_popolar-amentities";

export async function POST(req) {
  try {
    const data = await req?.json();

    const { email, password, terms, isInvited, hotel_id } = data;

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
        user_type: isInvited ? "NOMAD" : null,
        is_user_profile_completed: isInvited ? true : false,
        is_user_type_completed: isInvited ? true : false,
        confirmation_OTP: OTP,
      },
    });

    // for invited nomad user
    if (isInvited) {
      const nomad = await prisma.nomad.create({
        data: {
          email,
          userId: newUser?.id,
        },
      });

      await prisma.hotel_internal_nomads.create({
        data: {
          hotel_id: hotel_id,
          nomad_id: nomad?.id,
        },
      });
    }

    await sendMail(
      "Account verification OTP",
      newUser.email,
      otpTemplate(newUser.email, OTP)
    );

    const facilities = initialFacilities?.map((item) => {
      return {
        ...item,
        user_id: String(newUser?.id),
      };
    });

    const roomFacilites = room_facilities?.map((item) => {
      return {
        ...item,
        user_id: String(newUser?.id),
      };
    });

    const eventAmenities = bnb_amenities?.map((item) => {
      return {
        ...item,
        user_id: String(newUser?.id),
      };
    });

    // create initial facilities
    await prisma.facilities
      .createMany({
        data: facilities,
      })
      .catch((error) => console.log("facilites error", error));

    // create initial room facilities
    await prisma.room_facilities
      .createMany({
        data: roomFacilites,
      })
      .catch((error) => console.log("room facilites error", error));

    // create initial event amenities
    await prisma.amenities
      .createMany({
        data: eventAmenities,
      })
      .catch((error) => console.log("event amenities error", error));

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
