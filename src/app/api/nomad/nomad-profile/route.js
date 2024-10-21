import { prisma } from "@/src/db";
import { generateToken } from "@/src/service/tokenGenerator";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const data = await req?.json();

    const {
      first_name,
      last_name,
      phone_number,
      electronics,
      email,
      fundraising,
      manufacturing,
      projector,
      retails,
      sample,
      video,
      experience,
      availability,
      user_id,
    } = data || {};

    if (!first_name || !email || !user_id) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 500 }
      );
    }

    let profile = await prisma.nomad.create({
      data: {
        first_name,
        last_name,
        email,
        phone_number: Number(phone_number),
        experience,
        electronics,
        manufacturing,
        fundraising,
        retails,
        projector,
        video,
        sample,
        start_date: availability?.date?.start_date,
        end_date: availability?.date?.end_date,
        start_time: availability?.time?.start_time,
        end_time: availability?.time?.end_time,
        userId: user_id,
      },
    });

    const updateUser = await prisma.user.update({
      where: {
        id: user_id,
      },
      data: {
        is_user_profile_completed: true,
        first_name,
        last_name,
        phone_number,
      },
    });

    const user = await prisma.user.findFirst({
      where: {
        id: user_id,
      },
    });

    const accessToken = await generateToken(user);

    return NextResponse.json(
      { message: "Success", accessToken, user },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse?.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
