import { NextResponse } from "next/server";

import { prisma } from "@/src/db";

import { sendMail } from "@/src/service/mailService";
import {
  generateBookingRequestAcceptedTemplate,
  generateBookingRequestRejectedTemplate,
} from "@/src/libs/otpTemplate";
import { createNotification } from "@/src/libs/create-notification";

export async function POST(req, { params }) {
  try {
    const data = await req.json();
    const { guest, organizer, eventTitle, event_type, status } = data;

    if (
      !guest ||
      !params?.id ||
      !organizer ||
      !event_type ||
      !eventTitle ||
      !status
    ) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    let organizerName =
      organizer?.hotel_name ||
      organizer?.first_name + " " + organizer?.last_name;
    let guestName = guest?.first_name + guest?.last_name;

    const isBookingExist = await prisma.booking.findUnique({
      where: {
        id: params?.id,
      },
    });

    if (!isBookingExist) {
      return NextResponse.json({ message: "Booking not found" });
    }

    await prisma.booking.update({
      where: {
        id: params?.id,
      },
      data: {
        booking_status: status,
      },
    });

    const user = await prisma.guest?.findUnique({
      where: {
        id: guest?.id,
      },
      include: {
        User: true,
      },
    });

    if (status === "ACCEPTED") {
      // send notification
      let message = `Congratulations ! ${organizerName} has succussfully accepted your booking reservation for the ${eventTitle} event.
       check your email for confirmation and complete the payment`;
      await createNotification(
        guestName,
        "Event booking Accepted",
        message,
        user?.User?.id,
        organizer?.id
      );

      await sendMail(
        "Event Booking Accepted",
        guest?.email,
        generateBookingRequestAcceptedTemplate(
          guestName,
          eventTitle,
          organizerName,
          organizer?.email,
          organizer?.phone_number
        )
      );
    } else {
      // send notification
      let message = `we are sad to announce that ${organizerName} has rejected your booking reservation request for the ${eventTitle} event.
       check your email for confirmation`;
      await createNotification(
        guestName,
        "Event booking Rejected",
        message,
        user?.User?.id,
        organizer?.id
      );

      await sendMail(
        "Event Booking Rejected",
        guest?.email,
        generateBookingRequestRejectedTemplate(
          guestName,
          eventTitle,
          organizerName,
          organizer?.email,
          organizer?.phone_number
        )
      );
    }

    let updatedBookings;
    if (event_type === "HOTEL") {
      updatedBookings = await prisma.booking.findMany({
        where: {
          user_id: organizer?.id,
          event_type: event_type,
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
      updatedBookings = await prisma.booking.findMany({
        where: {
          user_id: organizer?.id,
          event_type: event_type,
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

    return NextResponse.json(
      { message: "Booking updated", bookings: updatedBookings },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function PUT(_, { params }) {
  try {
    if (!params?.id) {
      return NextResponse.json(
        { message: "Booking id is required" },
        { status: 400 }
      );
    }

    const isBookingExist = await prisma.booking.findUnique({
      where: {
        id: params?.id,
      },
    });

    if (!isBookingExist) {
      return NextResponse.json(
        { message: "Booking not found" },
        { status: 404 }
      );
    }

    await prisma.booking.update({
      where: {
        id: params?.id,
      },
      data: {
        booking_status: "PAID",
      },
    });

    return NextResponse.json({ message: "success" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
