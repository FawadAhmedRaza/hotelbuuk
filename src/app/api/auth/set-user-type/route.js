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
    } else if (user_type === "NOMAD") {
      // for user type nomad
      await prisma.nomad.create({
        data: {
          email: user?.email,
          userId: user?.id,
        },
      });
    } else {
      await prisma.guest.create({
        data: {
          email: user?.email,
          userId: user?.id,
        },
      });
    }

    const includeProfile =
      user_type === "HOTEL"
        ? { hotels: { select: { id: true } } }
        : user_type === "NOMAD"
        ? { nomad: { select: { id: true } } }
        : { guest: { select: { id: true } } };

    let updatedUserWithProfile = await prisma.user.findFirst({
      where: {
        id: id,
      },
      include: includeProfile,
    });

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
