import { prisma } from "@/src/db";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const nomads = await prisma.nomad.findMany();

    return NextResponse.json({ message: "success", nomads }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
