import { prisma } from "@/src/db";
import { generateToken } from "@/src/service/tokenGenerator";
import { convertFormData } from "@/src/utils/convert-form-data";
import {
  generateSignedUrl,
  uploadFileToGoogleCloud,
} from "@/src/utils/upload-images";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";


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
    const body = await req?.formData();
    const data = convertFormData(body);

    const {
      first_name,
      last_name,
      phone_number,
      electronics,
      profile_img,
      email,
      fundraising,
      manufacturing,
      projector,
      retails,
      sample,
      video,
      experience,
      linkedin,
      city,
      country,
      address,
      industry,
      bio,
      availability,
      work_permit_front_img,
      work_permit_back_img,
      work_permit_expiry_date,
      userId,
    } = data || {};

    if (!first_name || !email || !userId) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 500 }
      );
    }

    // update file
    let profileImage;
    if (typeof profile_img !== "string") {
      profileImage = await uploadFileToGoogleCloud(profile_img);
    } else {
      profileImage = profile_img;
    }

    // front file
    let frontImage;
    if (typeof work_permit_front_img !== "string") {
      frontImage = await uploadFileToGoogleCloud(work_permit_front_img);
    } else {
      frontImage = work_permit_front_img;
    }

    // back file
    let backImage;
    if (typeof work_permit_back_img !== "string") {
      backImage = await uploadFileToGoogleCloud(work_permit_back_img);
    } else {
      backImage = work_permit_back_img;
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
        profile_img: profileImage,
        experience,
        electronics,
        manufacturing,
        fundraising,
        industry,
        retails,
        projector,
        video,
        sample,
        start_date: availability?.date?.start_date,
        end_date: availability?.date?.end_date,
        start_time: availability?.time?.start_time,
        end_time: availability?.time?.end_time,
        userId: userId,
        linkedin,
        city,
        country,
        address,
        bio,
        work_permit_expiry_date,
        work_permit_back_img: backImage,
        work_permit_front_img: frontImage,
      },
    });

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        first_name,
        last_name,
        profile_img: profileImage,
        phone_number: String(phone_number),
        is_user_profile_completed: true,
      },
    });

    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      include: {
        nomad: {
          select: {
            id: true,
          },
        },
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

export async function DELETE(_, { params }) {
  try {
    if (!params?.id) {
      return NextResponse.json({ message: "Id is required" }, { status: 400 });
    }

    const isUserExist = await prisma.user?.findUnique({
      where: {
        id: params?.id,
      },
    });

    if (!isUserExist) {
      return NextResponse.json(
        { message: "User does not exist" },
        { status: 404 }
      );
    }

    await prisma.user.update({
      where: {
        id: params?.id,
      },
      data: {
        is_profile_active: false,
      },
    });

    return NextResponse.json({ message: "success" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
