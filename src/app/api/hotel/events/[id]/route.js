import { prisma } from "@/src/db";
import { checkNomadAvailability } from "@/src/utils/is-nomad-available";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(_, { params }) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json({ message: "Id is required " }, { status: 404 });
    }

    const hotelEvent = await prisma.hotel_event.findUnique({
      where: {
        id: id,
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
        hotel: {
          include: {
            hotelImages: true,
          },
        },
        itinerary: true,
      },
    });

    if (!hotelEvent) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }

    let modifiedObject = {
      id: hotelEvent?.id,
      business_meeting: {
        title: hotelEvent?.title,
        description: hotelEvent?.description,
        official_name: hotelEvent?.official_name,
        business_category: hotelEvent?.business_category,
        amenities: hotelEvent?.event_associated_amenities?.map(
          (item) => item?.amenities
        ),
        nomad_id: hotelEvent?.nomad?.id,
      },
      topics: hotelEvent?.event_topics || [],
      rules:
        hotelEvent?.event_associated_rules?.map((item) => item?.event_rules) ||
        [],
      safeties:
        hotelEvent?.event_associated_safeties?.map(
          (item) => item?.event_safeties
        ) || [],
      cancelPolicies:
        hotelEvent?.event_associated_cancel_policies?.map(
          (item) => item?.event_cancel_policy
        ) || [],
      availibility: {
        start_date: hotelEvent?.start_date,
        end_date: hotelEvent?.end_date,
        rules: {
          check_in: hotelEvent?.check_in,
          cancellation_policy: hotelEvent?.cancellation_policy,
          check_out: hotelEvent?.check_out,
          no_smoking: hotelEvent?.no_smoking,
          pets_policy: hotelEvent?.pets_policy,
          quiet_hours: hotelEvent?.quiet_hours,
          pool_usage: hotelEvent?.pool_usage,
          payment_policy: hotelEvent?.payment_policy,
        },
      },
      price: hotelEvent?.price,
      itinerary: hotelEvent?.itinerary,
      user_id: hotelEvent?.user_id,
      room_id: hotelEvent?.room_id,
    };

    return NextResponse.json(
      {
        message: "Success",
        hotelEvent: modifiedObject,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(_, { params }) {
  try {
    const event_id = params?.id;

    if (!event_id) {
      return NextResponse.json(
        { message: "event id is required" },
        { status: 404 }
      );
    }

    await prisma.hotel_event.delete({
      where: {
        id: event_id,
      },
      include: {
        event_associated_amenities: true,
        event_topics: true,
      },
    });

    return NextResponse.json(
      {
        message: "success",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    NextResponse.json(
      {
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  try {
    const data = await req.json();

    const id = params?.id;

    if (!id) {
      return NextResponse.json({ message: "event id is reqired" });
    }

    const isEventExist = await prisma.hotel_event.findUnique({
      where: {
        id,
      },
    });

    if (!isEventExist) {
      return NextResponse.json({ message: "event not found" });
    }

    const {
      business_meeting,
      availibility,
      topics,
      user_id,
      rules: event_rules,
      safeties,
      cancelPolicies,
      itinerary,
      room_id,
    } = data || {};

    const {
      title,
      description,
      official_name,
      business_category,
      amenities,
      nomad_id,
    } = business_meeting || {};

    const { rules, end_date, start_date } = availibility || {};

    if (!business_meeting || !availibility || !topics) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 404 }
      );
    }

    const isNomadAvailable = await checkNomadAvailability(
      nomad_id,
      start_date,
      end_date
    );

    if (!isNomadAvailable) {
      return NextResponse.json(
        { message: "Selected nomad is not available on event dates" },
        { status: 400 }
      );
    }

    const event = await prisma.hotel_event.update({
      where: {
        id,
      },
      data: {
        title,
        description,
        business_category,
        official_name,
        start_date,
        end_date,
        nomad_id: nomad_id,
        // rules
        check_in: rules?.check_in,
        check_out: rules?.check_out,
        cancellation_policy: rules?.cancellation_policy,
        no_smoking: rules?.no_smoking,
        pets_policy: rules?.pets_policy,
        pool_usage: rules?.pool_usage,
        payment_policy: rules?.payment_policy,
        price: String(data?.price),
        user_id: user_id,
        room_id: room_id,
      },
    });

    if (topics?.length > 0) {
      await prisma.event_topics?.deleteMany({
        where: {
          hotel_event_id: id,
        },
      });

      const eventTopics = topics?.map((item) => {
        return {
          title: item?.title,
          description: item?.description,
          hotel_event_id: event?.id,
        };
      });

      await prisma.event_topics.createMany({
        data: eventTopics,
      });
    }

    if (amenities?.length > 0) {
      await prisma.event_associated_amenities.deleteMany({
        where: {
          hotel_event_id: id,
        },
      });

      const asscoiateAmenities = amenities?.map((item) => {
        return {
          amenities_id: item?.id,
          hotel_event_id: event?.id,
        };
      });
      await prisma.event_associated_amenities.createMany({
        data: asscoiateAmenities,
      });
    }

    // rules
    if (event_rules?.length > 0) {
      await prisma.event_associated_rules?.deleteMany({
        where: {
          hotel_event_id: params?.id,
        },
      });

      const formatedArr = event_rules?.map((item) => {
        return {
          rules_id: item?.id,
          hotel_event_id: event?.id,
        };
      });

      await prisma.event_associated_rules.createMany({
        data: formatedArr,
      });
    }
    // safety and property
    if (safeties?.length > 0) {
      await prisma.event_associated_safeties?.deleteMany({
        where: {
          hotel_event_id: params?.id,
        },
      });

      const formatedArr = safeties?.map((item) => {
        return {
          safety_id: item?.id,
          hotel_event_id: event?.id,
        };
      });

      await prisma.event_associated_safeties.createMany({
        data: formatedArr,
      });
    }
    // cancel policies
    if (cancelPolicies?.length > 0) {
      await prisma.event_associated_cancel_policies?.deleteMany({
        where: {
          hotel_event_id: params?.id,
        },
      });

      const formatedArr = cancelPolicies?.map((item) => {
        return {
          policy_id: item?.id,
          hotel_event_id: event?.id,
        };
      });

      await prisma.event_associated_cancel_policies.createMany({
        data: formatedArr,
      });
    }

    if (itinerary?.length > 0) {
      await prisma.itinerary.deleteMany({
        where: { hotel_event_id: event?.id },
      });

      const formatedArr = itinerary?.map((item) => {
        return {
          stop: item?.stop,
          title: item?.title,
          location_id: item?.location?.place_id || item?.location_id,
          location: item?.location?.formatted_address || item?.location,
          location_lng:
            String(item?.location?.geometry?.location?.lng) ||
            item?.location_lng,
          location_ltd:
            String(item?.location?.geometry?.location?.lat) ||
            item?.location_ltd,
          hotel_event_id: event?.id,
        };
      });

      await prisma.itinerary.createMany({
        data: formatedArr,
      });
    }

    return NextResponse.json({ message: "success" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server error" },
      { status: 500 }
    );
  }
}
