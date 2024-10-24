import { prisma } from "@/src/db";
import { generateToken } from "@/src/service/tokenGenerator";
import { convertFormData } from "@/src/utils/convert-form-data";
import { uploadFileToGoogleCloud } from "@/src/utils/upload-images";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const hotel = await prisma.hotel_info.findFirst({
      where: {
        user_id: params?.id,
      },
      include: {
        hotelFacilites: {
          include: {
            facility: true,
          },
        },
        hotelImages: true,
      },
    });
    const hotelInfo = {
      ...hotel,
      facilities: hotel?.hotelFacilites?.map((x) => x?.facility),
    };

    const images = await Promise.all(
      hotelInfo?.hotelImages?.map(async (item) => {
        return {
          id: item?.id,
          url: item?.img,
          name: item?.name,
        };
      })
    );

    const finalWithImages = {
      ...hotelInfo,
      images,
    };

    return NextResponse.json(
      { message: "success", hotelInfo: finalWithImages },
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

export async function PUT(req, { params }) {
  try {
    const body = await req.formData();
    const data = convertFormData(body);
    const files = body.getAll("files");

    const {
      hotel_name,
      hotel_image,
      contact_email,
      stars,
      city,
      country,
      address,
      hotel_contact_no,
      description,
      user_id,
    } = data || {};

    if (!hotel_name || !contact_email) {
      return NextResponse.json(
        { message: "all fields are required" },
        { status: 404 }
      );
    }

    let hotelImage;
    if (typeof hotel_image !== "string") {
      hotelImage = await uploadFileToGoogleCloud(hotel_image);
    }

    const createHotelInfo = await prisma.hotel_info.update({
      where: {
        id: params?.id,
      },
      data: {
        hotel_name,
        contact_email,
        city,
        country,
        address,
        stars,
        hotel_contact_no,
        description,
        hotel_image: hotelImage,
        user_id,
      },
    });

    // delete prev facilites
    await prisma.hotel_facilities.deleteMany({
      where: {
        hotel_id: params?.id,
      },
    });

    const facilitiesData =
      (data?.facilities?.length > 0 &&
        data?.facilities.map((facility) => ({
          facility_id: facility?.id,
          hotel_id: createHotelInfo?.id,
        }))) ||
      [];

    if (facilitiesData?.length > 0) {
      await prisma.hotel_facilities.createMany({
        data: facilitiesData,
      });
    }

    if (data?.deletedImages.length > 0) {
      data?.deletedImages?.map(async (item) => {
        try {
          await prisma.hotel_images.delete({
            where: {
              id: item?.id,
            },
          });
        } catch (error) {
          // Check if the error is a known Prisma error
          if (error.code === "P2025") {
            console.warn(
              `Image with ID ${item?.id} not found, skipping deletion.`
            );
            // You can log the error or take any other action if needed
          } else {
            // Handle other potential errors
            console.error(`Error deleting image with ID ${item?.id}:`, error);
          }
        }
      });
    }

    // update the existings
    if (data?.imagesUrl.length > 0) {
      await Promise.all(
        data?.imagesUrl?.map(async (item) => {
          await prisma.hotel_images.update({
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

    // upload new files
    let imagesWithUrl = [];
    if (files?.length > 0) {
      for (let fileKey in files) {
        let imageUrl = await uploadFileToGoogleCloud(files[fileKey]);

        imagesWithUrl?.push({
          name: data?.imagesNames[fileKey],
          img: imageUrl,
          hotel_id: createHotelInfo?.id,
        });
      }
    }

    if (imagesWithUrl?.length > 0) {
      await prisma.hotel_images.createMany({
        data: imagesWithUrl,
      });
    }

    // update user profile
    await prisma.user.update({
      where: {
        id: user_id,
      },
      data: {
        hotel_name: hotel_name,
        profile_img: hotelImage,
        phone_number: hotel_contact_no?.toString(),
      },
    });

    const user = await prisma.user.findFirst({
      where: {
        id: user_id,
      },
    });

    const accessToken = await generateToken(user);

    return NextResponse.json(
      { message: "Success", accessToken, user },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
