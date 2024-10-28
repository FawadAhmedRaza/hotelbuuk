import { NextResponse } from "next/server";
import { prisma } from "@/src/db";
import { generateToken } from "@/src/service/tokenGenerator";

export async function POST(req) {
  try {
    const data = await req.json();
    const { user_type, id } = data;

    if (!user_type || !id) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 404 }
      );
    }

    const user = await prisma.user.findFirst({
      where: {
        id: id,
      },
    });

    if (!user) {
      return NextResponse.json({ message: "Invalid user" }, { status: 404 });
    }

    // update user
    await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        user_type: user_type,
        is_user_type_completed: true,
      },
    });

    if (user_type === "HOTEL") {
      // for user type hotel
      await prisma.hotel_info.create({
        data: {
          contact_email: user?.email,
          user_id: user?.id,
        },
      });
    } else {
      // for user type nomad
      await prisma.nomad.create({
        data: {
          email: user?.email,
          userId: user?.id,
        },
      });
    }

    let updatedUserWithProfile;
    if (user_type === "HOTEL") {
      updatedUserWithProfile = await prisma.user.findFirst({
        where: {
          id: id,
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
          id: id,
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
      {
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
