import { prisma } from "@/src/db";
import { generateToken } from "@/src/service/tokenGenerator";
import { convertFormData } from "@/src/utils/convert-form-data";
import { uploadFileToGoogleCloud } from "@/src/utils/upload-images";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req?.formData();
    const data = convertFormData(body);
    console.log("data", data);

    const {
      first_name,
      last_name,
      phone_number,
      electronics,
      profile,
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

    console.log("profile", profile);

    // if (!first_name || !email || !user_id) {
    //   return NextResponse.json(
    //     { message: "All fields are required" },
    //     { status: 500 }
    //   );
    // }

    const profileImage = await uploadFileToGoogleCloud(profile);
    console.log("profile img", profileImage);

    // let profile = await prisma.nomad.create({
    //   data: {
    //     first_name,
    //     last_name,
    //     email,
    //     phone_number: Number(phone_number),
    //     experience,
    //     electronics,
    //     manufacturing,
    //     fundraising,
    //     retails,
    //     projector,
    //     video,
    //     sample,
    //     start_date: availability?.date?.start_date,
    //     end_date: availability?.date?.end_date,
    //     start_time: availability?.time?.start_time,
    //     end_time: availability?.time?.end_time,
    //     userId: user_id,
    //   },
    // });

    // const updateUser = await prisma.user.update({
    //   where: {
    //     id: user_id,
    //   },
    //   data: {
    //     is_user_profile_completed: true,
    //     first_name,
    //     last_name,
    //     phone_number,
    //   },
    // });

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