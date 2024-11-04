import { NextResponse } from "next/server";

import { prisma } from "@/src/db";

// POST API for creating a new contact
export async function POST(req) {
  try {
    const data = await req.json();

    // Destructure the fields from the request body
    const { name, email, phone, message } = data || {};

    // Validate the incoming data
    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // Create a new contact in the database
    const newContact = await prisma.contact.create({
      data: {
        name,
        email,
        phone,
        message,
      },
    });

    // Return a success response
    return NextResponse.json(
      { message: "Contact created successfully", contact: newContact },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating contact:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

// GET API for fetching all contacts
export async function GET(req) {
  try {
    // Retrieve all contacts from the database
    const contacts = await prisma.contact.findMany();

    // Return the contacts with a success message
    return NextResponse.json({ message: "Success", contacts }, { status: 200 });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
