import { NextResponse } from "next/server";
import { prisma } from "@/src/db";

export async function GET(req, { params }) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");

    if (!type) {
      return NextResponse.json(
        { message: "Type is required" },
        { status: 404 }
      );
    }

    if (!params?.id) {
      return NextResponse.json(
        { message: "event id is required" },
        { status: 404 }
      );
    }

    let event;
    if (type === "NOMAD") {
      const isNomadEventExist = await prisma.nomad_event.findUnique({
        where: {
          id: params?.id,
        },
      });

      if (!isNomadEventExist) {
        return NextResponse.json(
          { message: "Nomad event not found with given id" },
          { status: 404 }
        );
      }

      const nomadEvent = await prisma.nomad_event.findUnique({
        where: {
          id: params?.id,
        },
        include: {
          nomad: true,
          event_images: true,
          event_topics: true,
          event_associated_amenities: {
            include: {
              amenities: true,
            },
          },
          nomad: true,
          hotel: {
            include: {
              hotelImages: true,
            },
          },
        },
      });

      event = {
        ...nomadEvent,
        event_associated_amenities: nomadEvent?.event_associated_amenities?.map(
          (item) => item?.amenities
        ),
      };
    } else {
      const isHotelEventExist = await prisma.hotel_event.findUnique({
        where: {
          id: params?.id,
        },
      });

      if (!isHotelEventExist) {
        return NextResponse.json(
          { message: "Hotel event not found with given id" },
          { status: 404 }
        );
      }

      let hotelEvent = await prisma.hotel_event.findUnique({
        where: {
          id: params?.id,
        },
        include: {
          event_topics: true,
          event_associated_amenities: {
            include: {
              amenities: true,
            },
          },
          nomad: true,
          hotel: true,
        },
      });

      event = {
        ...hotelEvent,
        event_associated_amenities: hotelEvent?.event_associated_amenities?.map(
          (item) => item?.amenities
        ),
      };
    }

    return NextResponse.json({ message: "success", event }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server error" },
      { status: 500 }
    );
  }
}
