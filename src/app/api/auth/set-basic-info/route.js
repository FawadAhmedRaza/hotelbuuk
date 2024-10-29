import { prisma } from "@/src/db";
import { generateToken } from "@/src/service/tokenGenerator";
import { convertFormData } from "@/src/utils/convert-form-data";
import { uploadFileToGoogleCloud } from "@/src/utils/upload-images";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const data = await req.json();

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

    const includeProfile =
      type === "HOTEL"
        ? { hotels: { select: { id: true } } }
        : { nomad: { select: { id: true } } };

    let updatedUserWithProfile = await prisma.user.findFirst({
      where: {
        id: user_id,
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
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  try {
    const body = await req.formData();
    const data = convertFormData(body);
    console.log("data", data);

    const { user_id, first_name, last_name, phone_number, type, profile_img } =
      data;

    const isUserExist = await prisma.user.findUnique({
      where: {
        id: user_id,
      },
    });

    if (!isUserExist) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const isGuestExist = await prisma.guest.findFirst({
      where: {
        userId: user_id,
      },
    });

    if (!isGuestExist) {
      return NextResponse.json({ message: "Nomad not found" }, { status: 404 });
    }

    let profileImage;
    if (profile_img) {
      profileImage = await uploadFileToGoogleCloud(profile_img);
    }

    await prisma.user.update({
      where: {
        id: user_id,
      },
      data: {
        phone_number: String(phone_number),
        first_name,
        last_name,
        profile_img: profileImage,
        is_user_basic_info_completed: true,
        is_user_profile_completed: true,
      },
    });

    await prisma.guest.update({
      where: {
        id: isGuestExist?.id,
      },
      data: {
        first_name,
        last_name,
        phone_number: Number(phone_number),
        profile_img: profileImage,
      },
    });

    let updatedUserWithProfile = await prisma.user.findFirst({
      where: {
        id: user_id,
      },
      include: {
        guest: {
          select: {
            id: true,
          },
        },
      },
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
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
