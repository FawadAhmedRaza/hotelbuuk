import { NextResponse } from "next/server";

import { convertFormData } from "@/src/utils/convert-form-data";
import { prisma } from "@/src/db";
import { uploadFileToGoogleCloud } from "@/src/utils/upload-images";

export async function POST(req) {
  try {
    const body = await req.formData();
    const data = convertFormData(body);
    const images = body.getAll("images");

    const { business_meeting, availibility, topics, user_id, price } =
      data || {};

    const {
      title,
      description,
      official_name,
      business_category,
      accomodation_type,
      location,
      amenities,
      hotel_id,
    } = business_meeting || {};

    const { rules, end_date, start_date } = availibility || {};

    if (!business_meeting || !availibility || !images || !topics) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 404 }
      );
    }

    let event;
    if (accomodation_type === "bnb") {
      event = await prisma.nomad_event.create({
        data: {
          title,
          description,
          business_category,
          official_name,
          accomodation_type,
          city: location?.city,
          country: location?.country,
          address: location?.address,
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

