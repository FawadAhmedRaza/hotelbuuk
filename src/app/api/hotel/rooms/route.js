import { prisma } from "@/src/db";
import { convertFormData } from "@/src/utils/convert-form-data";
import { uploadFileToGoogleCloud } from "@/src/utils/upload-images";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.formData();
    const data = convertFormData(body);
    const imageFiles = body.getAll("room_images");

    console.log("Body Data", body);

    const { room_info, hotel_id, room_facilities } = data || {};

    const { room_name, room_type, price, maximum_occupancy, description } =
      room_info || {};

    if (!room_name || !room_type || !price) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 500 }
      );
    }

    const createdRoom = await prisma.hotel_rooms.create({
      data: {
        hotel_id: hotel_id, // include hotel_id for relation
        room_name,
        room_type,
        maximum_occupancy,
        description,
        price,
      },
    });

    const facilitiesData =
      (room_facilities?.length > 0 &&
        room_facilities.map((facility) => ({
          room_facility_id: facility?.id,
          room_id: createdRoom?.id,
        }))) ||
      [];

    if (facilitiesData?.length > 0) {
      await prisma.room_associated_facilities.createMany({
        data: facilitiesData,
      });
    }

    let roomImagesWithUrl = [];
    if (imageFiles?.length > 0) {
      for (let fileKey in imageFiles) {
        let imageUrl = await uploadFileToGoogleCloud(imageFiles[fileKey]);

        roomImagesWithUrl?.push({
          name: data?.room_images_names[fileKey],
          img: imageUrl,
          room_id: createdRoom?.id,
        });
      }
    }

    if (roomImagesWithUrl?.length > 0) {
      await prisma.room_images?.createMany({
        data: roomImagesWithUrl,
      });
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

    if (!hotel_id) {
      return NextResponse.json(
        { message: "hotel ID is required" },
        { status: 400 }
      );
    }

    const hotelRooms = await prisma.hotel_rooms.findMany({
      where: {
        hotel_id,
      },
      include: {
        room_associated_facilities: {
          include: {
            room_facility: true,
          },
        },
      },
    });

    let formatedList = hotelRooms?.map((item) => {
      return {
        ...item,
        room_facilities: item?.room_associated_facilities?.map(
          (item) => item?.room_facility
        ),
      };
    });


    return NextResponse.json(
      { message: "success", hotelRooms: formatedList },
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
