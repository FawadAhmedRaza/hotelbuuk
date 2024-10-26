import { NextResponse } from "next/server";

import { prisma } from "@/src/db";

import { invitationEmailTemplate } from "@/src/libs/invite-nomad-template";
import { sendMail } from "@/src/service/mailService";
import { generateSignedUrl } from "@/src/utils/upload-images";

export async function POST(req) {
  try {
    const data = await req.json();

    const { hotel_id, email } = data || {};

    // await prisma.hotel_internal_nomads.create({
    //   data:{
    //     hotel_id:hotel_id,
    //     nomad_id:nomad
    //   }
    // })

    const hotel = await prisma.hotel_info.findUnique({
      where: {
        id: hotel_id,
      },
    });

    const profileImage = await generateSignedUrl(hotel?.hotel_image);

    const isNomadUserExist = await prisma.user.findFirst({
      where: {
        email: email,
        user_type: "NOMAD",
      },
    });

    const isNomadExist = await prisma.nomad.findFirst({
      where: {
        email,
      },
    });

    let queryParams =
      !isNomadExist && !isNomadUserExist
        ? `sign-up?email=${email}&isRegistered=false&hotel=${hotel?.hotel_name}&hotelId=${hotel?.id}`
        : `accept-invitation?email=${email}&isRegistered=true&hotel=${hotel?.hotel_name}&hotelId=${hotel?.id}`;

    await sendMail(
      "Hotel Invitation",
      email,
      "",
      true,
      invitationEmailTemplate(hotel?.hotel_name, profileImage, queryParams)
    );

    return NextResponse.json({ message: "success" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
