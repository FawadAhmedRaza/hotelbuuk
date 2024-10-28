import { prisma } from "@/src/db";
import { convertFormData } from "@/src/utils/convert-form-data";
import { uploadFileToGoogleCloud } from "@/src/utils/upload-images";
import { NextResponse } from "next/server";

export async function GET(_, { params }) {
  try {
    const room = await prisma.hotel_rooms.findUnique({
      where: {
        id: params?.id,
      },
      include: {
        room_images: true,
        room_associated_facilities: {
          include: {
            room_facility: true,
          },
        },
      },
    });

    let updated = {
      ...room,
      room_facilities: room?.room_associated_facilities?.map(
        (item) => item?.room_facility
      ),
    };

    return NextResponse.json(
      { message: "success", room: updated },
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

export async function PUT(req, { params }) {
  try {
    const body = await req.formData();
    const data = convertFormData(body);

    const newImages = body.getAll("new_room_images");

    const { room_info, hotel_id, room_facilities } = data || {};

    const { room_name, room_type, price, maximum_occupancy, description } =
      room_info || {};

    if (!room_name || !room_type || !price) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 500 }
      );
    }

    await prisma.hotel_rooms.update({
      where: {
        id: params?.id,
      },
      data: {
        room_name,
        room_type,
        maximum_occupancy,
        description,
        price,
      },
    });

    // delete prev facilites
    await prisma.room_associated_facilities.deleteMany({
      where: {
        room_id: params?.id,
      },
    });

    const facilitiesData =
      (room_facilities?.length > 0 &&
        room_facilities.map((facility) => ({
          room_facility_id: facility?.id,
          room_id: params?.id,
        }))) ||
      [];

    // create new
    if (facilitiesData?.length > 0) {
      await prisma.room_associated_facilities.createMany({
        data: facilitiesData,
      });
    }

    // retrieve all images of room
    let allRoomImages = await prisma.room_images?.findMany({
      where: {
        room_id: params?.id,
      },
    });
    let remainedImagesWithUrls = data?.images_with_urls;
    let remainingImagesIds = remainedImagesWithUrls?.map((item) => item?.id); // get ids

    let imagesToDelete = allRoomImages?.filter(
      // filter images to delete
      (image) => !remainingImagesIds?.includes(image?.id)
    );

    // delete remaining images
    if (imagesToDelete?.length > 0) {
      imagesToDelete?.map(async (item) => {
        await prisma.room_images.delete({
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
          await prisma.room_images.update({
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

    // upload new images
    let newImagesWithUrls = [];
    if (newImages?.length > 0) {
      for (let fileKey in newImages) {
        let imageUrl = await uploadFileToGoogleCloud(newImages[fileKey]);

        newImagesWithUrls?.push({
          name: data?.new_room_images_names[fileKey],
          img: imageUrl,
          room_id: params?.id,
        });
      }
    }

    // upload new images
    if (newImagesWithUrls?.length > 0) {
      console.log("triggred");
      await prisma.room_images.createMany({
        data: newImagesWithUrls,
      });
    }

    // return updated list
    const allRooms = await prisma.hotel_rooms.findMany({ where: { hotel_id } });

    return NextResponse.json({ message: "success", allRooms }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(_, { params }) {
  try {
    console.log(params.id);

    await prisma.hotel_rooms.delete({
      where: {
        id: params?.id,
      },
      include: {
        room_images: true,
      },
    });

    return NextResponse.json({ message: "success" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
