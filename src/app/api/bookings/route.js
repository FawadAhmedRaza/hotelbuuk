import { NextResponse } from "next/server";
import { prisma } from "@/src/db";

export async function POST(req) {
    try {
        const data = await req.json();
        const {
            no_of_guests,
            event_type,
            total_price,
            guest_id,
            hotel_event_id,
            nomad_event_id,
            user_id,
        } = data;

        if (!no_of_guests || !event_type || !total_price || !guest_id || !user_id) {
            return NextResponse.json(
                { message: "All fields are required" },
                { status: 404 }
            );
        }

        let booking;
        if (event_type === "HOTEL") {
            const isHotelEventExist = await prisma.hotel_event.findUnique({
                where: {
                    id: hotel_event_id,
                },
            });

            if (!isHotelEventExist) {
                return NextResponse.json(
                    { message: "Hotel event not exist" },
                    { status: 404 }
                );
            }

            booking = await prisma.booking.create({
                data: {
                    no_of_guests,
                    event_type,
                    total_price: Number(total_price),
                    booking_status: "PENDING",
                    guest_id,
                    hotel_event_id,
                    user_id,
                },
            });
        } else {
            const isNomadEventExist = await prisma.nomad_event.findUnique({
                where: {
                    id: nomad_event_id,
                },
            });

            if (!isNomadEventExist) {
                return NextResponse.json(
                    { message: "Nomad event not exist" },
                    { status: 404 }
                );
            }

            booking = await prisma.booking.create({
                data: {
                    no_of_guests,
                    event_type,
                    total_price: Number(total_price),
                    booking_status: "PENDING",
                    guest_id,
                    nomad_event_id,
                    user_id,
                },
            });
        }

        return NextResponse.json({ message: "Booking created" }, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: "Something went wrong" },
            { status: 500 }
        );
    }
}
