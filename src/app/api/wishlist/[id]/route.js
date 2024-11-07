import { prisma } from "@/src/db";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const eventId = searchParams.get("event_id"); // The event ID to check against
    const userId = searchParams.get("user_id"); // The user ID

    if (!eventId || !userId) {
      return NextResponse.json(
        { message: "Event ID and User ID are required" },
        { status: 400 }
      );
    }

    // Fetch the WishList item by User ID and event type
    const wishListItem = await prisma.wishList.findFirst({
      where: {
        user_id: userId,
        OR: [
          {
            nomad_event_id: eventId, // Check if the event ID matches nomad_event_id
          },
          {
            hotel_event_id: eventId, // Check if the event ID matches hotel_event_id
          },
        ],
      },
      include: {
        nomad_event: true,
        hotel_event: true,
      },
    });

    if (!wishListItem) {
      return NextResponse.json(
        { message: "WishList item not found or unauthorized access" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Success", wishList: wishListItem },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching WishList item:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const eventId = searchParams.get("event_id"); // The event ID to delete
    const userId = searchParams.get("user_id"); // The user ID

    if (!eventId || !userId) {
      return NextResponse.json(
        { message: "Event ID and User ID are required" },
        { status: 400 }
      );
    }

    // Find the WishList item first to make sure it exists
    const wishListItem = await prisma.wishList.findFirst({
      where: {
        user_id: userId,
        OR: [
          {
            nomad_event_id: eventId, // Check if the event ID matches nomad_event_id
          },
          {
            hotel_event_id: eventId, // Check if the event ID matches hotel_event_id
          },
        ],
      },
    });

    if (!wishListItem) {
      return NextResponse.json(
        { message: "WishList item not found or unauthorized access" },
        { status: 404 }
      );
    }

    // Delete the WishList item
    await prisma.wishList.delete({
      where: {
        id: wishListItem.id, // Use the ID of the found WishList item for deletion
      },
    });

    return NextResponse.json(
      { message: "WishList item successfully deleted" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting WishList item:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
