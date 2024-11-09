import { NextResponse } from "next/server";
import { prisma } from "@/src/db";

export const dynamic = "force-dynamic";

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
          event_associated_cancel_policies: {
            include: {
              event_cancel_policy: true,
            },
          },
          event_associated_rules: {
            include: {
              event_rules: true,
            },
          },
          event_associated_safeties: {
            include: {
              event_safeties: true,
            },
          },
          nomad: true,
          itinerary: true,
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
        event_associated_rules: nomadEvent?.event_associated_rules?.map(
          (item) => item?.event_rules
        ),
        event_associated_cancel_policies:
          nomadEvent?.event_associated_cancel_policies?.map(
            (item) => item?.event_cancel_policy
          ),
        event_associated_safeties: nomadEvent?.event_associated_safeties?.map(
          (item) => item?.event_safeties
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
          id: params.id,
        },
        include: {
          event_topics: true,
          event_associated_amenities: {
            include: {
              amenities: true,
            },
          },
          event_associated_cancel_policies: {
            include: {
              event_cancel_policy: true,
            },
          },
          event_associated_rules: {
            include: {
              event_rules: true,
            },
          },
          event_associated_safeties: {
            include: {
              event_safeties: true,
            },
          },
          nomad: true,
          itinerary: true,
          hotel: {
            include: {
              hotelImages: true,
            },
          },
        },
      });

      event = {
        ...hotelEvent,
        event_associated_amenities: hotelEvent?.event_associated_amenities?.map(
          (item) => item?.amenities
        ),
        event_associated_rules: hotelEvent?.event_associated_rules?.map(
          (item) => item?.event_rules
        ),
        event_associated_cancel_policies:
          hotelEvent?.event_associated_safeties?.map(
            (item) => item?.event_safeties
          ),
        event_associated_safeties:
          hotelEvent?.event_associated_cancel_policies?.map(
            (item) => item?.event_cancel_policy
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
