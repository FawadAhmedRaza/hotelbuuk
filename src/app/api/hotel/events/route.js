import { NextResponse } from "next/server";

import { prisma } from "@/src/db";
import { checkNomadAvailability } from "@/src/utils/is-nomad-available";

export async function POST(req) {
  try {
    const data = await req.json();

    const {
      business_meeting,
      availibility,
      topics,
      user_id,
      rules: event_rules,
      safeties,
      cancelPolicies,
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

    const hotel = await prisma.hotel_info.findFirst({
      where: {
        user_id: user_id,
      },
    });

    const event = await prisma.hotel_event.create({
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
        hotel_id: hotel?.id,
      },
    });

    if (topics?.length > 0) {
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

    return NextResponse.json({ message: "success" }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server error" },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const user_id = searchParams.get("user_id");

    if (!user_id) {
      return NextResponse.json(
        { message: "User id is reqiuired" },
        { status: 404 }
      );
    }

    const isUserExist = await prisma.user.findUnique({
      where: {
        id: user_id,
      },
    });

    if (!isUserExist) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const hotelEvents = await prisma.hotel_event.findMany({
      where: {
        user_id,
      },
      include: {
        event_associated_amenities: {
          include: {
            amenities: true,
          },
        },
        event_topics: true,
      },
    });

    let modifiedList = hotelEvents?.map((item) => {
      return {
        ...item,
        event_associated_amenities: item?.event_associated_amenities?.map(
          (item) => item?.amenities
        ),
      };
    });

    return NextResponse.json(
      { message: "success", hotelEvents: modifiedList },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server error" },
      { status: 500 }
    );
  }
}
