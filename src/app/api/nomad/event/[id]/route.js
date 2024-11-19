import { NextResponse } from "next/server";

import { prisma } from "@/src/db";
import { convertFormData } from "@/src/utils/convert-form-data";
import { uploadFileToGoogleCloud } from "@/src/utils/upload-images";

export async function GET(_, { params }) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json({ message: "Id is required " }, { status: 404 });
    }

    const nomadEvent = await prisma.nomad_event.findUnique({
      where: {
        id: id,
      },
      include: {
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
        hotel: {
          include: {
            hotelImages: true,
          },
        },
        itinerary: true,
      },
    });

    let modifiedObject = {
      id: nomadEvent?.id,
      business_meeting: {
        title: nomadEvent?.title,
        description: nomadEvent?.description,
        official_name: nomadEvent?.official_name,
        business_category: nomadEvent?.business_category,
        accomodation_type: nomadEvent?.accomodation_type,
        amenities: nomadEvent?.event_associated_amenities?.map(
          (item) => item?.amenities
        ),
        hotel_id: nomadEvent?.hotel_id || "",
        room_id: nomadEvent?.room_id || "",
        about_bnb: nomadEvent?.about_bnb || "",

        country: nomadEvent?.country || "",
        city: nomadEvent?.city || "",
        address: nomadEvent?.address || "",
      },
      images: nomadEvent?.event_images || [],
      topics: nomadEvent?.event_topics || [],
      rules:
        nomadEvent?.event_associated_rules?.map((item) => item?.event_rules) ||
        [],
      safeties:
        nomadEvent?.event_associated_safeties?.map(
          (item) => item?.event_safeties
        ) || [],
      cancelPolicies:
        nomadEvent?.event_associated_cancel_policies?.map(
          (item) => item?.event_cancel_policy
        ) || [],
      availibility: {
        start_date: nomadEvent?.start_date,
        end_date: nomadEvent?.end_date,
        rules: {
          check_in: nomadEvent?.check_in,
          cancellation_policy: nomadEvent?.cancellation_policy,
          check_out: nomadEvent?.check_out,
          no_smoking: nomadEvent?.no_smoking,
          pets_policy: nomadEvent?.pets_policy,
          quiet_hours: nomadEvent?.quiet_hours,
          pool_usage: nomadEvent?.pool_usage,
          payment_policy: nomadEvent?.payment_policy,
        },
      },
      price: nomadEvent?.price,
      itinerary: nomadEvent?.itinerary,
      user_id: nomadEvent?.user_id,
    };

    return NextResponse.json(
      {
        message: "Success",
        nomadEvent: modifiedObject,
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

export async function PUT(req, { params }) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json({ message: "Id is required " }, { status: 404 });
    }

    const body = await req.formData();
    const data = convertFormData(body);
    const newImages = body.getAll("new_images");

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

    if (!business_meeting || !availibility || !topics) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 404 }
      );
    }

    let event;
    if (accomodation_type === "bnb") {
      event = await prisma.nomad_event.update({
        where: {
          id: id,
        },
        data: {
          title,
          description,
          business_category,
          official_name,
          accomodation_type,
          city,
          country,
          address,
          about_bnb,
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
      event = await prisma.nomad_event.update({
        where: {
          id: id,
        },
        data: {
          title,
          description,
          business_category,
          official_name,
          accomodation_type,
          start_date,
          end_date,
          room_id: room_id,
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
      // delete prev.
      await prisma.event_topics?.deleteMany({
        where: {
          nomad_event_id: id,
        },
      });

      // format new
      const eventTopics = topics?.map((item) => {
        return {
          title: item?.title,
          description: item?.description,
          nomad_event_id: event?.id,
        };
      });

      // create
      await prisma.event_topics.createMany({
        data: eventTopics,
      });
    }

    if (amenities?.length > 0) {
      // delete prev.
      await prisma.event_associated_amenities.deleteMany({
        where: {
          nomad_event_id: id,
        },
      });

      // format new
      const asscoiateAmenities = amenities?.map((item) => {
        return {
          amenities_id: item?.id,
          nomad_event_id: event?.id,
        };
      });

      // create
      await prisma.event_associated_amenities.createMany({
        data: asscoiateAmenities,
      });
    }

    // rules
    if (event_rules?.length > 0) {
      await prisma.event_associated_rules?.deleteMany({
        where: {
          nomad_event_id: params?.id,
        },
      });

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
      await prisma.event_associated_safeties?.deleteMany({
        where: {
          nomad_event_id: params?.id,
        },
      });

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
      await prisma.event_associated_cancel_policies?.deleteMany({
        where: {
          nomad_event_id: params?.id,
        },
      });

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
      await prisma.itinerary.deleteMany({
        where: { nomad_event_id: event?.id },
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
          nomad_event_id: event?.id,
        };
      });

      await prisma.itinerary.createMany({
        data: formatedArr,
      });
    }

    if (accomodation_type === "bnb") {
      let allEventImages = await prisma.event_images?.findMany({
        where: {
          nomad_event_id: id,
        },
      });
      let remainedImagesWithUrls = data?.images_with_urls;
      let remainingImagesIds = remainedImagesWithUrls?.map((item) => item?.id); // get ids
      let imagesToDelete = allEventImages?.filter(
        // filter images to delete
        (image) => !remainingImagesIds?.includes(image?.id)
      );

      if (imagesToDelete?.length > 0) {
        imagesToDelete?.map(async (item) => {
          await prisma.event_images?.delete({
            where: {
              id: item?.id,
            },
          });
        });
      }

      // update the existings
      if (remainedImagesWithUrls?.length > 0) {
        await Promise.all(
          remainedImagesWithUrls?.map(async (item) => {
            await prisma.event_images.update({
              where: {
                id: item?.id,
              },
              data: {
                name: item?.name,
              },
            });
          })
        );
      }

      // format new images with url
      let newImagesWithUrls = [];
      if (newImages?.length > 0) {
        for (let fileKey in newImages) {
          let imageUrl = await uploadFileToGoogleCloud(newImages[fileKey]);

          newImagesWithUrls?.push({
            name: data?.new_images_names[fileKey],
            img: imageUrl,
            nomad_event_id: params?.id,
          });
        }
        await prisma.event_images.createMany({
          data: newImagesWithUrls,
        });
      }
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

export async function DELETE(_, { params }) {
  try {
    const event_id = params?.id;

    if (!event_id) {
      return NextResponse.json(
        { message: "event id is required" },
        { status: 404 }
      );
    }

    await prisma.nomad_event.delete({
      where: {
        id: event_id,
      },
      include: {
        event_associated_amenities: true,
        event_images: true,
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
