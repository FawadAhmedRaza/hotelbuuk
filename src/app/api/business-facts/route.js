import { NextResponse } from "next/server";
import { prisma } from "@/src/db";

import { convertFormData } from "@/src/utils/convert-form-data";
import { uploadFileToGoogleCloud } from "@/src/utils/upload-images";

export async function POST(req) {
  try {
    const body = await req.formData();
    const data = convertFormData(body);

    const {
      title,
      description,
      start_date,
      end_date,
      price,
      image,
      business_amenities,
    } = data || {};

    if (
      !title ||
      !description ||
      !start_date ||
      !end_date ||
      !price ||
      !image ||
      !business_amenities
    ) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    let coverImage;
    if (typeof image !== "string") {
      coverImage = await uploadFileToGoogleCloud(image);
    }

    const businessFacts = await prisma.business_facts.create({
      data: {
        title,
        description,
        start_date,
        end_date,
        price,
        cover_img: coverImage,
      },
    });

    const amenities = business_amenities?.map((item) => {
      return {
        business_amenities_id: item?.id,
        business_facts_id: businessFacts?.id,
      };
    });

    await prisma.business_facts_amenities.createMany({
      data: amenities,
    });

    return NextResponse.json({ message: "Success" }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const business_facts = await prisma.business_facts.findMany({
      include: {
        business_facts_amenities: {
          include: {
            business_amenities: true,
          },
        },
      },
    });

    const list = business_facts?.map((item) => {
      return {
        ...item,
        business_facts_amenities: item?.business_facts_amenities?.map(
          (item) => item?.business_amenities
        ),
      };
    });

    return NextResponse.json({ message: "success", list }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
