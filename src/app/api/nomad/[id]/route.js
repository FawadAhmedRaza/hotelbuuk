import { prisma } from "@/src/db";

import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req, { params }) {
  try {
    const { id } = params;

    const nomad = await prisma.nomad.findFirst({
      where: {
        id,
      },
    });

    return NextResponse.json({ message: "success", nomad }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
