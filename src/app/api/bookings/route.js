import { NextResponse } from "next/server";
import { prisma } from "@/src/db";
import { sendMail } from "@/src/service/mailService";
import { generateBookingRequestTemplate } from "@/src/libs/otpTemplate";
import { createNotification } from "@/src/libs/create-notification";

export const dynamic = "force-dynamic";

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
        include: {
          user: true,
        },
      });

      if (!isHotelEventExist) {
        return NextResponse.json(
          { message: "Hotel event not exist" },
          { status: 404 }
        );
      }

      const isEventAlreadyBooked = await prisma.booking.findFirst({
        where: {
          guest_id: guest_id,
          hotel_event_id: hotel_event_id,
        },
      });

      if (isEventAlreadyBooked) {
        return NextResponse.json(
          { message: "Event already booked" },
          { status: 400 }
        );
      }

      const guest = await prisma.guest.findUnique({
        where: {
          id: guest_id,
        },
        include: {
          User: true,
        },
      });

      let guestName = guest?.first_name + " " + guest?.last_name;

      // send notification
      let message = `${guestName} wants to book your ${isHotelEventExist?.title} event.`;
      await createNotification(
        isHotelEventExist?.user?.hotel_name,
        "Event booking request",
        message,
        isHotelEventExist?.user?.id, // to
        guest?.User?.id // from
      );

      await sendMail(
        "Event Booking Request",
        isHotelEventExist?.user?.email,
        generateBookingRequestTemplate(
          isHotelEventExist?.user?.hotel_name,
          isHotelEventExist?.title,
          guestName,
          guest?.email,
          guest?.phone_number
        )
      );

      booking = await prisma.booking.create({
        data: {
          no_of_guests: Number(no_of_guests),
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
        include: {
          user: true,
        },
      });

      if (!isNomadEventExist) {
        return NextResponse.json(
          { message: "Nomad event not exist" },
          { status: 404 }
        );
      }

      const isEventAlreadyBooked = await prisma.booking.findFirst({
        where: {
          guest_id: guest_id,
          nomad_event_id: nomad_event_id,
        },
      });

      if (isEventAlreadyBooked) {
        return NextResponse.json(
          { message: "Event already booked" },
          { status: 400 }
        );
      }

      const guest = await prisma.guest.findUnique({
        where: {
          id: guest_id,
        },
        include: {
          User: true,
        },
      });

      let guestName = guest?.first_name + " " + guest?.last_name;
      let name =
        isNomadEventExist?.user?.first_name +
        " " +
        isNomadEventExist?.user?.last_name;

      // send notification
      let message = `${guestName} wants to book your ${isNomadEventExist?.title} event.`;
      await createNotification(
        name,
        "Event booking request",
        message,
        isNomadEventExist?.user?.id,
        guest?.User?.id
      );

      // send email
      await sendMail(
        "Event Booking Request",
        isNomadEventExist?.user?.email,
        generateBookingRequestTemplate(
          name,
          isNomadEventExist?.title,
          guestName,
          guest?.email,
          guest?.phone_number
        )
      );

      booking = await prisma.booking.create({
        data: {
          no_of_guests: Number(no_of_guests),
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

export async function GET(req) {
  try {
    const { searchParams } = new URL(req?.url);

    const user_id = searchParams.get("user_id");
    const event_type = searchParams.get("type");

    if (!user_id || !event_type) {
      return NextResponse.json(
        {
          message: !user_id ? "User id is required" : "event type is required",
        },
        { status: 404 }
      );
    }

    let bookings;
    if (event_type === "HOTEL") {
      bookings = await prisma.booking.findMany({
        where: {
          user_id: user_id,
          event_type,
        },
        include: {
          hotel_event: {
            include: {
              nomad: true,
            },
          },
          guest: true,
          user: true,
        },
      });
    } else {
      bookings = await prisma.booking.findMany({
        where: {
          user_id: user_id,
          event_type,
        },
        include: {
          nomad_event: {
            include: {
              hotel: true,
            },
          },
          guest: true,
          user: true,
        },
      });
    }

    return NextResponse.json({ message: "Success", bookings }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
