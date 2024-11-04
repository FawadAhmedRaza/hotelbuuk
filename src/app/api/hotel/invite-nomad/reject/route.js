import { prisma } from "@/src/db";
import { createNotification } from "@/src/libs/create-notification";
import { invitationRejectedEmailTemplate } from "@/src/libs/invite-nomad-template";
import { sendMail } from "@/src/service/mailService";
import { generateSignedUrl } from "@/src/utils/upload-images";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const data = await req.json();

    const { nomadId, hotelId } = data;

    if (!nomadId || !hotelId) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 404 }
      );
    }

    const isHotelExist = await prisma.hotel_info.findUnique({
      where: {
        id: hotelId,
      },
      include: {
        user: true,
      },
    });

    const isNomadExist = await prisma.nomad.findUnique({
      where: {
        id: nomadId,
      },
      include: {
        User: true,
      },
    });

    if (!isHotelExist) {
      return NextResponse.json(
        { message: "Hotel with the given id not exist" },
        { status: 404 }
      );
    }

    if (!isNomadExist) {
      return NextResponse.json(
        { message: "Nomad with the given id not exist" },
        { status: 404 }
      );
    }

    const profileImage = await generateSignedUrl(isNomadExist?.profile_img);

    // create notifications
    let nomadName = isNomadExist?.first_name + "" + isNomadExist?.last_name;
    let message = `${nomadName} has rejected your invitation for becoming Internal Nomad`;
    await createNotification(
      isHotelExist?.hotel_name,
      "Invitation Rejected for Internal Nomad",
      message,
      isHotelExist?.user?.id,
      isNomadExist?.User?.id
    );

    // send rejection email to hotel
    await sendMail(
      "Invitation Rejected for Internal Nomad",
      isHotelExist?.user?.email,
      invitationRejectedEmailTemplate(
        isHotelExist?.hotel_name,
        profileImage,
        nomadName
      )
    );

    return NextResponse.json(
      { message: "Invitaion Rejected" },
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
