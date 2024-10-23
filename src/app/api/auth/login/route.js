import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { prisma } from "@/src/db";
import { generateToken } from "@/src/service/tokenGenerator";
import { generateSignedUrl } from "@/src/utils/upload-images";

export async function POST(req) {
  try {
    const data = await req.json();

    const { email, password } = data || {};

    if (!email || !password) {
      return NextResponse.json(
        { message: "email and password are required" },
        {
          status: 404,
        }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
      include: {
        hotels: {
          select: {
            id: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          message: "Invalid Credentials.",
        },
        { status: 400 }
      );
    }

    const isMatch = bcrypt.compareSync(password, user.password);

    if (!isMatch) {
      return NextResponse.json(
        {
          message: "Invalid Credentials",
        },
        { status: 400 }
      );
    }

    const token = await generateToken(user);
    let userProfileImage = await generateSignedUrl(user?.profile_img);
    let userWithProfileImage = {
      ...user,
      profile_img: userProfileImage,
    };

    return NextResponse.json(
      { accessToken: token, user: userWithProfileImage },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
