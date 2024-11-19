import { NextResponse } from "next/server";
import { prisma } from "@/src/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const nomadEvents = await prisma.nomad_event.findMany({
      include: {
        event_images: true,
        event_topics: true,
        event_associated_amenities: true,
        hotel: {
          include: {
            hotelImages: true,
          },
        },
        nomad: true,
        room: {
          include: {
            room_images: true,
            room_associated_facilities: true,
          },
        },
      },
    });

    const modifiedNomadEvents = nomadEvents.map((event) => ({
      ...event,
      type: "NOMAD",
    }));

    const hotelEvents = await prisma.hotel_event.findMany({
      include: {
        event_topics: true,
        event_associated_amenities: true,
        nomad: true,
        hotel: {
          include: {
            hotelImages: true,
          },
        },
        room: {
          include: {
            room_images: true,
            room_associated_facilities: true,
          },
        },
      },
    });

    const modifiedHotelEvents = hotelEvents.map((event) => ({
      ...event,
      type: "HOTEL",
    }));

    const allEvents = [...modifiedNomadEvents, ...modifiedHotelEvents];

    return NextResponse.json(
      { message: "success", Events: allEvents },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server error" },
      { status: 500 }
    );
  }
}

// API WITH FILTERS**************************************

// import { NextResponse } from "next/server";
// import { prisma } from "@/src/db";

// export async function GET(req) {
//   try {
//     const url = new URL(req.url);
//     const searchParams = url.searchParams;

//     // Extract filter parameters from query
//     const startDate = searchParams.get("startDate");
//     const endDate = searchParams.get("endDate");
//     const minPrice = searchParams.get("minPrice");
//     const maxPrice = searchParams.get("maxPrice");
//     const businessCategory = searchParams.get("businessCategory");
//     const city = searchParams.get("city");
//     const country = searchParams.get("country");
//     const checkIn = searchParams.get("checkIn") === "true";
//     const checkOut = searchParams.get("checkOut") === "true";
//     const noSmoking = searchParams.get("noSmoking") === "true";
//     const poolUsage = searchParams.get("poolUsage") === "true";
//     const petsAllowed = searchParams.get("petsPolicy") === "true";
//     const eventTopic = searchParams.get("eventTopic");

//     // Build filter conditions for Nomad and Hotel events with optional filters
//     const filterConditions = {
//       ...(startDate &&
//         endDate && {
//           start_date: { gte: new Date(startDate), lte: new Date(endDate) },
//         }),
//       ...(minPrice &&
//         maxPrice && {
//           price: { gte: parseFloat(minPrice), lte: parseFloat(maxPrice) },
//         }),
//       ...(businessCategory && { business_category: businessCategory }),
//       ...(city && { city }),
//       ...(country && { country }),
//       ...(checkIn && { check_in: checkIn }),
//       ...(checkOut && { check_out: checkOut }),
//       ...(noSmoking && { no_smoking: noSmoking }),
//       ...(poolUsage && { pool_usage: poolUsage }),
//       ...(petsAllowed && { pets_policy: petsAllowed }),
//       ...(eventTopic && {
//         event_topics: {
//           some: {
//             title: eventTopic,
//           },
//         },
//       }),
//     };

//     // Fetch Nomad events with optional filters applied
//     const nomadEvents = await prisma.nomad_event.findMany({
//       where: Object.keys(filterConditions).length
//         ? filterConditions
//         : undefined,
//       include: {
//         event_images: true,
//         event_topics: true,
//         event_associated_amenities: true,
//         hotel: {
//           include: {
//             hotelImages: true,
//           },
//         },
//         nomad: true,
//       },
//     });

//     const modifiedNomadEvents = nomadEvents.map((event) => ({
//       ...event,
//       type: "NOMAD",
//     }));

//     // Fetch Hotel events with optional filters applied
//     const hotelEvents = await prisma.hotel_event.findMany({
//       where: Object.keys(filterConditions).length
//         ? filterConditions
//         : undefined,
//       include: {
//         event_topics: true,
//         event_associated_amenities: true,
//         nomad: true,
//         hotel: {
//           include: {
//             hotelImages: true,
//           },
//         },
//       },
//     });

//     const modifiedHotelEvents = hotelEvents.map((event) => ({
//       ...event,
//       type: "HOTEL",
//     }));

//     // Combine and return both types of events
//     const allEvents = [...modifiedNomadEvents, ...modifiedHotelEvents];

//     return NextResponse.json(
//       { message: "success", Events: allEvents },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { message: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }
