import { prisma } from "@/src/db";
import { generateToken } from "@/src/service/tokenGenerator";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { id } = params;

    const nomad = await prisma.nomad.findFirst({
      where: {
        userId: id,
      },
    });

    return NextResponse.json({ message: "success", nomad }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  try {
    const data = await req?.json();

    const {
      first_name,
      last_name,
      phone_number,
      electronics,
      //   profile,
      email,
      fundraising,
      manufacturing,
      projector,
      retails,
      sample,
      video,
      experience,
      availability,
      userId,
    } = data || {};

    if (!first_name || !email || !userId) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 500 }
      );
    }

    await prisma.nomad.update({
      where: {
        id: params?.id,
      },
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
        userId: userId,
      },
    });

    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    const accessToken = await generateToken(user);

    return NextResponse.json(
      { message: "Success", accessToken, user },
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
