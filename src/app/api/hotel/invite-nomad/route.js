import { NextResponse } from "next/server";

import { prisma } from "@/src/db";

import { invitationEmailTemplate } from "@/src/libs/invite-nomad-template";
import { sendMail } from "@/src/service/mailService";
import { generateSignedUrl } from "@/src/utils/upload-images";

export async function POST(req) {
  try {
    const data = await req.json();

    const { hotel_id, email, nomad_type, nomad } = data || {};

    const hotel = await prisma.hotel_info.findUnique({
      where: {
        id: hotel_id,
      },
    });

    const profileImage = await generateSignedUrl(hotel?.hotel_image);

    if (nomad_type === "registered") {
      let queryParams = `accept-invitation?email=${email}&isRegistered=true&hotel=${hotel?.hotel_name}&hotelId=${hotel?.id}`;
      await sendMail(
        "Hotel Invitation",
        nomad?.email,
        invitationEmailTemplate(hotel?.hotel_name, profileImage, queryParams)
      );

      // create internal nomad
      await prisma.hotel_internal_nomads.create({
        data: {
          hotel_id: hotel_id,
          nomad_id: nomad?.id,
        },
      });
    } else {
      let queryParams = `sign-up?email=${email}&isRegistered=false&hotel=${hotel?.hotel_name}&hotelId=${hotel?.id}`;
      await sendMail(
        "Hotel Invitation",
        email,
        "",
        true,
        invitationEmailTemplate(hotel?.hotel_name, profileImage, queryParams)
      );
    }

    return NextResponse.json({ message: "success" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const hotel_id = searchParams.get("hotel_id");

    const internalNomads = await prisma.hotel_internal_nomads?.findMany({
      where: {
        hotel_id: hotel_id,
      },
      include: {
        nomad: true,
      },
    });

    return NextResponse.json(
      { message: "Success", internalNomads },
      { status: 200 }
    );
  } catch (error) {
    console.log("internal nomads error");
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
