import { prisma } from "@/src/db";
import { generateToken } from "@/src/service/tokenGenerator";
import { convertFormData } from "@/src/utils/convert-form-data";
import { uploadFileToGoogleCloud } from "@/src/utils/upload-images";
import { NextResponse } from "next/server";

export async function GET(_, { params }) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json({ message: "Id is required" }, { status: 404 });
    }

    const isGuestExist = await prisma.guest.findFirst({
      where: {
        userId: id,
      },
    });

    if (!isGuestExist) {
      return NextResponse.json({ message: "Guest not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "success", guest: isGuestExist },
      { status: 200 }
    );
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
    if (!params?.id) {
      return NextResponse.json({ message: "Id is required" }, { status: 404 });
    }

    const isGuestExist = await prisma.guest.findUnique({
      where: {
        id: params?.id,
      },
    });

    if (!isGuestExist) {
      return NextResponse.json({ message: "guest not found" }, { status: 404 });
    }

    const body = await req.formData();
    const data = convertFormData(body);

    let profileImage;
    if (typeof data?.profile_img !== "string") {
      profileImage = await uploadFileToGoogleCloud(data?.profile_img);
    } else {
      profileImage = data.profile_img;
    }

    await prisma.user.update({
      where: {
        id: data?.userId,
      },
      data: {
        profile_img: profileImage,
        first_name: data?.first_name,
        last_name: data?.last_name,
        phone_number: String(data?.phone_number),
      },
    });

    await prisma.guest.update({
      where: {
        id: params?.id,
      },
      data: {
        profile_img: profileImage,
        first_name: data?.first_name,
        last_name: data?.last_name,
        phone_number: Number(data?.phone_number),
        email: data?.email,
      },
    });

    let updatedUser = await prisma.user.findUnique({
      where: {
        id: data?.userId,
      },
      include: {
        guest: {
          select: {
            id: true,
          },
        },
      },
    });

    const accessToken = await generateToken(updatedUser);

    return NextResponse.json(
      { message: "Success", accessToken, user: updatedUser },
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
