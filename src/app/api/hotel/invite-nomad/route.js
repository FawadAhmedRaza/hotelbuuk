import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const data = await req.json();

    console.log(data);

    return NextResponse.json({ message: "success" }, { status: 200 });
    
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
