import { NextResponse } from "next/server";

import { convertFormData } from "@/src/utils/convert-form-data";
import { prisma } from "@/src/db";
import { uploadFileToGoogleCloud } from "@/src/utils/upload-images";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const body = await req.formData();
    const data = convertFormData(body);
    const images = body.getAll("images");

    const {
      business_meeting,
      availibility,
      topics,
      user_id,
      rules: event_rules,
      safeties,
      cancelPolicies,
      itinerary,
    } = data || {};

    const {
      title,
      description,
      official_name,
      business_category,
      accomodation_type,
      city,
      country,
      address,
      amenities,
      hotel_id,
      room_id,
      about_bnb,
    } = business_meeting || {};

    const { rules, end_date, start_date } = availibility || {};

    if (!business_meeting || !availibility || !images || !topics) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 404 }
      );
    }

    const nomad = await prisma.nomad.findFirst({
      where: {
        userId: user_id,
      },
    });

    let event;
    if (accomodation_type === "bnb") {
      event = await prisma.nomad_event.create({
        data: {
          title,
          description,
          business_category,
          official_name,
          accomodation_type,
          city,
          country,
          address,
          start_date,
          end_date,
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
          nomad_id: nomad?.id,
          about_bnb: about_bnb,
        },
      });
    } else {
      event = await prisma.nomad_event.create({
        data: {
          title,
          description,
          business_category,
          official_name,
          accomodation_type,
          start_date,
          end_date,
          hotel_id: hotel_id,
          room_id: room_id,
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
          nomad_id: nomad?.id,
        },
      });
    }

    if (topics?.length > 0) {
      const eventTopics = topics?.map((item) => {
        return {
          title: item?.title,
          description: item?.description,
          nomad_event_id: event?.id,
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
          nomad_event_id: event?.id,
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
          nomad_event_id: event?.id,
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
          nomad_event_id: event?.id,
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
          nomad_event_id: event?.id,
        };
      });

      await prisma.event_associated_cancel_policies.createMany({
        data: formatedArr,
      });
    }

    if (itinerary?.length > 0) {
      const formatedArr = itinerary?.map((item) => {
        return {
          stop: item?.stop,
          title: item?.title,
          location_id: item?.location?.place_id,
          location: item?.location?.formatted_address,
          location_lng: String(item?.location?.geometry?.location?.lng),
          location_ltd: String(item?.location?.geometry?.location?.lat),
          nomad_event_id: event?.id,
        };
      });

      await prisma.itinerary.createMany({
        data: formatedArr,
      });
    }

    let imagesWithUrl = [];
    if (images.length > 0) {
      for (let fileKey in images) {
        let imageUrl = await uploadFileToGoogleCloud(images[fileKey]);

        imagesWithUrl?.push({
          name: data?.imagesNames[fileKey],
          img: imageUrl,
          nomad_event_id: event?.id,
        });
      }

      await prisma.event_images.createMany({
        data: imagesWithUrl,
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

    const nomadEvents = await prisma.nomad_event.findMany({
      where: {
        user_id,
      },
      include: {
        event_associated_amenities: {
          include: {
            amenities: true,
          },
        },
        hotel: true,
        event_images: true,
        event_topics: true,
      },
    });

    let modifiedList = nomadEvents?.map((item) => {
      return {
        ...item,
        amenities: item?.event_associated_amenities?.map(
          (item) => item?.amenities
        ),
      };
    });

    return NextResponse.json(
      { message: "success", nomadEvents: modifiedList },
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
