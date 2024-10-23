import { NextResponse } from "next/server";
import { prisma } from "@/src/db";
import { generateToken } from "@/src/service/tokenGenerator";
import { convertFormData } from "@/src/utils/convert-form-data";
import {
  generateSignedUrl,
  uploadFileToGoogleCloud,
} from "@/src/utils/upload-images";

export async function POST(req) {
  try {
    const body = await req.formData();
    const data = convertFormData(body);
    const files = body.getAll("images");
    console.log("data", data);
    console.log("images", files);

    const {
      hotel_name,
      hotel_image,
      contact_email,
      stars,
      city,
      country,
      address,
      hotel_contact_no,
      description,
      user_id,
    } = data || {};

    if (!hotel_name || !contact_email) {
      return NextResponse.json(
        { message: "all fields are required" },
        { status: 404 }
      );
    }

    const hotelImage = await uploadFileToGoogleCloud(hotel_image || "");
    const createHotelInfo = await prisma.hotel_info.create({
      data: {
        hotel_name,
        contact_email,
        city,
        country,
        address,
        stars,
        hotel_contact_no,
        description,
        hotel_image: hotelImage || "",
        user_id,
      },
    });

    const facilitiesData =
      (data?.facilities?.length > 0 &&
        data?.facilities.map((facility) => ({
          facility_id: facility?.id,
          hotel_id: createHotelInfo?.id,
        }))) ||
      [];

    if (facilitiesData?.length > 0) {
      await prisma.hotel_facilities.createMany({
        data: facilitiesData,
      });
    }

    let imagesWithUrl = [];
    if (files.length > 0) {
      for (let fileKey in files) {
        let imageUrl = await uploadFileToGoogleCloud(files[fileKey]);

        imagesWithUrl?.push({
          name: data?.imagesNames[fileKey],
          img: imageUrl,
          hotel_id: createHotelInfo?.id,
        });
      }
    }

    await prisma.hotel_images.createMany({
      data: imagesWithUrl,
    });

    // update user profile
    await prisma.user.update({
      where: {
        id: user_id,
      },
      data: {
        is_user_profile_completed: true,
        hotel_name: hotel_name,
        profile_img: hotelImage || "",
        phone_number: hotel_contact_no?.toString(),
      },
    });

    const user = await prisma.user.findFirst({
      where: {
        id: user_id,
      },
    });

    let userProfileImage = await generateSignedUrl(user?.profile_img);
    let userWithProfileImage = {
      ...user,
      profile_img: userProfileImage,
    };

    const accessToken = await generateToken(user);

    return NextResponse.json(
      { message: "Success", accessToken, user: userWithProfileImage },
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
