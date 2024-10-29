import { prisma } from "@/src/db";
import { generateToken } from "@/src/service/tokenGenerator";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const data = await req.json();
    console.log(data);

    const {
      user_id,
      first_name,
      last_name,
      phone_number,
      type,
      hotel_name,
      hotel_bio,
    } = data;

    const isUserExist = await prisma.user.findUnique({
      where: {
        id: user_id,
      },
    });

    if (!isUserExist) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (type === "NOMAD") {
      await prisma.user.update({
        where: {
          id: user_id,
        },
        data: {
          phone_number: String(phone_number),
          first_name,
          last_name,
          is_user_basic_info_completed: true,
        },
      });

      const findNomad = await prisma.nomad.findFirst({
        where: {
          userId: user_id,
        },
      });

      if (!findNomad) {
        return NextResponse.json(
          { message: "Nomad not found" },
          { status: 404 }
        );
      }

      await prisma.nomad.update({
        where: {
          id: findNomad?.id,
        },
        data: {
          first_name,
          last_name,
          phone_number: Number(phone_number),
        },
      });
    } else {
      await prisma.user.update({
        where: {
          id: user_id,
        },
        data: {
          phone_number: String(phone_number),
          hotel_name,
          is_user_basic_info_completed: true,
        },
      });

      const isHotelExist = await prisma.hotel_info.findFirst({
        where: {
          user_id: user_id,
        },
      });

      if (!isHotelExist) {
        return NextResponse.json(
          { message: "Hotel not found" },
          { status: 404 }
        );
      }

      await prisma.hotel_info.update({
        where: {
          id: isHotelExist?.id,
        },
        data: {
          hotel_name,
          description: hotel_bio,
          hotel_contact_no: Number(phone_number),
        },
      });
    }

    let updatedUserWithProfile;
    if (type === "HOTEL") {
      updatedUserWithProfile = await prisma.user.findFirst({
        where: {
          id: user_id,
        },
        include: {
          hotels: {
            select: {
              id: true,
            },
          },
        },
      });
    } else {
      updatedUserWithProfile = await prisma.user.findFirst({
        where: {
          id: user_id,
        },
        include: {
          nomad: {
            select: {
              id: true,
            },
          },
        },
      });
    }

    const accessToken = await generateToken(updatedUserWithProfile);

    return NextResponse.json(
      {
        accessToken,
        user: updatedUserWithProfile,
        message: "User profile completed",
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
