import { prisma } from "@/src/db";
import { generateSignedUrl } from "@/src/utils/upload-images";
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

    const hotelImage = await generateSignedUrl(hotel?.hotel_image);
    const hotelInfo = {
      ...hotel,
      hotel_image: hotelImage,
      facilites: hotel?.hotelFacilites?.map((x) => x?.facility),
    };

    const images = await Promise.all(
      hotelInfo?.hotelImages?.map(async (item) => {
        let image = await generateSignedUrl(item?.img);
        return {
          url: image,
          name: item?.name,
        };
      })
    );

    const finalWithImages = {
      ...hotelInfo,
      images,
    };

    delete hotel?.hotelFacilites;

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