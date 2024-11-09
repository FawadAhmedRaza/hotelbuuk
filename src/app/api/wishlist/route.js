import { prisma } from "@/src/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const data = await req.json();
    const { user_id, event } = data || {};

    // Check for required fields
    if (!user_id || !event || !event.id || !event.type) {
      return NextResponse.json(
        { message: "User ID and event information are required" },
        { status: 400 }
      );
    }

    // Determine event type and populate fields accordingly
    const isNomadEvent = event.type === "NOMAD";
    const wishListData = {
      user_id,
      nomad_event_id: isNomadEvent ? event.id : null,
      hotel_event_id: !isNomadEvent ? event.id : null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Create the WishList entry
    await prisma.wishList.create({
      data: wishListData,
    });

    // Fetch the updated WishList for the user
    const updatedWishList = await prisma.wishList.findMany({
      where: {
        user_id,
      },
      include: {
        nomad_event: true,
        hotel_event: true,
      },
    });

    return NextResponse.json(
      {
        message: "Event added to WishList successfully",
        Success: true,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding to WishList:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// GET Wishlist
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const user_id = searchParams.get("user_id");

    if (!user_id) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      );
    }

    // Fetch the WishList for the user
    const wishList = await prisma.wishList.findMany({
      where: {
        user_id,
      },
      include: {
        nomad_event: {
          include: {
            nomad: true,
            event_images: true,
            hotel: {
              include: {
                hotelImages: true,
              },
            },
          },
        },
        hotel_event: {
          include: {
            nomad: {
              include: {
                nomad_event: {
                  include: {
                    event_images: true,
                  },
                },
              },
            },
            hotel: {
              include: {
                hotelImages: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json({ message: "Success", wishList }, { status: 200 });
  } catch (error) {
    console.error("Error fetching WishList:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
