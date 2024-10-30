import { prisma } from "@/src/db";
import { generateToken } from "@/src/service/tokenGenerator";
import { convertFormData } from "@/src/utils/convert-form-data";
import { uploadFileToGoogleCloud } from "@/src/utils/upload-images";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.formData();
    const data = convertFormData(body);
    const { user_id, type } = data || {};

    const isUserExist = await prisma.user.findUnique({
      where: {
        id: user_id,
      },
    });

    if (!isUserExist) {
      return NextResponse.json({ message: "user not found" }, { status: 404 });
    }

    if (type === "NOMAD") {
      const nomad = await prisma.nomad.findFirst({
        where: {
          userId: user_id,
        },
      });

      if (!nomad) {
        return NextResponse.json(
          { message: "Nomad not found" },
          { status: 404 }
        );
      }

      // get file name
      let profileImage;
      if (data?.profile_img) {
        profileImage = await uploadFileToGoogleCloud(data?.profile_img);
      }

      await prisma.nomad.update({
        where: {
          id: nomad?.id,
        },
        data: {
          profile_img: profileImage,
          experience: data?.experience,
          electronics: data?.electronics,
          manufacturing: data?.manufacturing,
          fundraising: data?.fundraising,
          retails: data?.retails,
        },
      });

      await prisma.user.update({
        where: {
          id: user_id,
        },
        data: {
          is_user_profile_completed: true,
          profile_img: profileImage,
        },
      });
    } else {
      const hotel = await prisma.hotel_info.findFirst({
        where: {
          user_id: user_id,
        },
      });
      if (!hotel) {
        return NextResponse.json(
          { message: "Hotel not found" },
          { status: 404 }
        );
      }
      // get file name
      let profileImage;
      if (data?.profile_img) {
        profileImage = await uploadFileToGoogleCloud(data?.profile_img);
      }
      await prisma.hotel_info.update({
        where: {
          id: hotel?.id,
        },
        data: {
          hotel_image: profileImage,
          stars: data?.stars,
          country: data?.country,
          city: data?.city,
          address: data?.address,
        },
      });

      await prisma.user.update({
        where: {
          id: user_id,
        },
        data: {
          is_user_profile_completed: true,
          profile_img: profileImage,
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
