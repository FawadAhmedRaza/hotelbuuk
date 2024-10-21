import { prisma } from "@/src/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const data = await req.json();
    const { room_info, hotel_id } = data || {};

    const {
      room_name,
      room_type,
      price,
      maximum_occupancy,
      description,
      room_facilities,
    } = room_info || {};

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
        // checkboxes
        air_conditioning: room_facilities?.air_conditioning || false,
        heating: room_facilities?.heating || false,
        king_bed: room_facilities?.king_bed || false,
        private_balcony: room_facilities?.private_balcony || false,
        mini_fridge: room_facilities?.mini_fridge || false,
        flat_screen_tv: room_facilities?.flat_screen_tv || false,
        room_service: room_facilities?.room_service || false,
        coffee_machine: room_facilities?.coffee_machine || false,
        desk_workspace: room_facilities?.desk_workspace || false,
        private_bathroom: room_facilities?.private_bathroom || false,
        smart_lighting: room_facilities?.smart_lighting || false,
        soundproof_windows: room_facilities?.soundproof_windows || false,
        wardrobe: room_facilities?.wardrobe || false,
        blackout_curtains: room_facilities?.blackout_curtains || false,
        luxury_toiletries: room_facilities?.luxury_toiletries || false,
        high_thread_sheets: room_facilities?.high_thread_sheets || false,
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
    });

    return NextResponse.json(
      { message: "success", hotelRooms },
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
