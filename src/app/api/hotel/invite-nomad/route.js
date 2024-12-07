import { NextResponse } from "next/server";

import { prisma } from "@/src/db";

import { invitationEmailTemplate } from "@/src/libs/invite-nomad-template";
import { sendMail } from "@/src/service/mailService";
import { generateSignedUrl } from "@/src/utils/upload-images";
import { createNotification } from "@/src/libs/create-notification";

// export async function POST(req) {
//   try {
//     const data = await req.json();

//     const { hotel_id, email, nomad_type, nomad, invite_status } = data || {};

//     const hotel = await prisma.hotel_info.findUnique({
//       where: {
//         id: hotel_id,
//       },
//       include: {
//         user: true,
//       },
//     });

//     const profileImage = await generateSignedUrl(hotel?.hotel_image);

//     if (nomad_type === "registered") {
//       const isDuplicate = await prisma.hotel_internal_nomads.findFirst({
//         where: {
//           hotel_id,
//           nomad_id: nomad?.id,
//         },
//       });

//       if (isDuplicate) {
//         return NextResponse.json(
//           {
//             message: "Selected nomad is arleady a part of Internal nomads",
//           },
//           { status: 400 }
//         );
//       }

//       let nomadUser = await prisma.nomad.findUnique({
//         where: {
//           id: nomad?.id,
//         },
//         include: {
//           User: true,
//         },
//       });

//       let queryParams = `accept-invitation?email=${email}&isRegistered=true&hotel=${hotel?.hotel_name}&hotelId=${hotel?.id}&nomadId=${nomad?.id}`; // accept link
//       let invitationRejected = `accept-invitation?email=${email}&status=REJECTED&hotel=${hotel?.hotel_name}&hotelId=${hotel?.id}&nomadId=${nomad?.id}`; // reject link

//       let message = `${hotel?.hotel_name} has invited you to become their internal Business Consultant. Check your email.`;
//       // send notifications
//       await createNotification(
//         hotel?.hotel_name,
//         "Invitation for Hotel Internal Business Consultant",
//         message,
//         nomadUser?.User?.id,
//         hotel?.user?.id
//       );

//       await sendMail(
//         "Hotel Invitation",
//         nomad?.email,
//         invitationEmailTemplate(
//           hotel?.hotel_name,
//           profileImage,
//           queryParams,
//           invitationRejected,
//           hotel?.user?.id
//         )
//       );
//     } else {
//       let queryParams = `sign-up?email=${email}&isRegistered=false&hotel=${hotel?.hotel_name}&hotelId=${hotel?.id}`; // accept
//       let invitationRejected = `accept-invitation?email=${email}&status=DIRECT_EMAIL&hotel=${hotel?.hotel_name}`; // reject

//       await sendMail(
//         "Hotel Invitation",
//         email,
//         invitationEmailTemplate(
//           hotel?.hotel_name,
//           profileImage,
//           queryParams,
//           invitationRejected,
//           hotel?.user?.id
//         )
//       );
//     }

//     return NextResponse.json({ message: "success" }, { status: 200 });
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json(
//       { message: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }

// export async function POST(req) {
//   try {
//     const data = await req.json();
//     const { hotel_id, email, nomad_type, nomad, invite_status } = data || {};

//     const hotel = await prisma.hotel_info.findUnique({
//       where: {
//         id: hotel_id,
//       },
//       include: {
//         user: true,
//       },
//     });

//     const profileImage = await generateSignedUrl(hotel?.hotel_image);

//     if (nomad_type === "registered") {
//       // Check for duplicate
//       const isDuplicate = await prisma.hotel_internal_nomads.findFirst({
//         where: {
//           hotel_id,
//           nomad_id: nomad?.id,
//         },
//       });

//       if (isDuplicate) {
//         return NextResponse.json(
//           {
//             message: "Selected nomad is already a part of Internal nomads",
//           },
//           { status: 400 }
//         );
//       }

//       // Create transaction for adding internal nomad and sending notifications/emails
//       await prisma.$transaction(async (prisma) => {
//         // Insert the nomad into hotel_internal_nomads
//         await prisma.hotel_internal_nomads.create({
//           data: {
//             hotel_id,
//             nomad_id: nomad?.id,
//             invite_status: invite_status || "PENDING", // Default status
//           },
//         });

//         // Fetch nomad user details
//         let nomadUser = await prisma.nomad.findUnique({
//           where: {
//             id: nomad?.id,
//           },
//           include: {
//             User: true,
//           },
//         });

//         // Prepare notification and email links
//         let queryParams = `accept-invitation?email=${email}&isRegistered=true&hotel=${hotel?.hotel_name}&hotelId=${hotel?.id}&nomadId=${nomad?.id}`;
//         let invitationRejected = `accept-invitation?email=${email}&status=REJECTED&hotel=${hotel?.hotel_name}&hotelId=${hotel?.id}&nomadId=${nomad?.id}`;

//         let message = `${hotel?.hotel_name} has invited you to become their internal Business Consultant. Check your email.`;

//         // Send notification
//         await createNotification(
//           hotel?.hotel_name,
//           "Invitation for Hotel Internal Business Consultant",
//           message,
//           nomadUser?.User?.id,
//           hotel?.user?.id
//         );

//         // Send email
//         await sendMail(
//           "Hotel Invitation",
//           nomad?.email,
//           invitationEmailTemplate(
//             hotel?.hotel_name,
//             profileImage,
//             queryParams,
//             invitationRejected,
//             hotel?.user?.id
//           )
//         );
//       });
//     } else {
//       // For unregistered users, just send the email invitation
//       let queryParams = `sign-up?email=${email}&isRegistered=false&hotel=${hotel?.hotel_name}&hotelId=${hotel?.id}`;
//       let invitationRejected = `accept-invitation?email=${email}&status=DIRECT_EMAIL&hotel=${hotel?.hotel_name}`;

//       await sendMail(
//         "Hotel Invitation",
//         email,
//         invitationEmailTemplate(
//           hotel?.hotel_name,
//           profileImage,
//           queryParams,
//           invitationRejected,
//           hotel?.user?.id
//         )
//       );
//     }

//     return NextResponse.json({ message: "success" }, { status: 200 });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { message: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }

export async function POST(req) {
  try {
    const data = await req.json();
    const { hotel_id, email, nomad_type, nomad, invite_status } = data || {};

    const hotel = await prisma.hotel_info.findUnique({
      where: { id: hotel_id },
      include: { user: true },
    });

    if (!hotel) {
      return NextResponse.json(
        { message: "Hotel not found." },
        { status: 404 }
      );
    }

    const profileImage = await generateSignedUrl(hotel?.hotel_image);

    if (nomad_type === "registered") {
      if (!nomad?.id) {
        return NextResponse.json(
          { message: "Nomad ID is required for registered users." },
          { status: 400 }
        );
      }

      // Check for duplicate entry
      const isDuplicate = await prisma.hotel_internal_nomads.findFirst({
        where: { hotel_id, nomad_id: nomad.id },
      });

      if (isDuplicate) {
        return NextResponse.json(
          { message: "Selected nomad is already part of Internal Nomads." },
          { status: 400 }
        );
      }

      // Create transaction for adding internal nomad and sending notifications/emails
      await prisma.$transaction(async (prisma) => {
        // Insert the nomad into hotel_internal_nomads
        await prisma.hotel_internal_nomads.create({
          data: {
            hotel_id,
            nomad_id: nomad.id,
            invite_status: invite_status || "PENDING", // Default status
          },
        });

        // Fetch nomad user details
        const nomadUser = await prisma.nomad.findUnique({
          where: { id: nomad.id },
          include: { User: true },
        });

        // Prepare notification and email links
        const queryParams = `accept-invitation?email=${nomadUser?.User?.email}&isRegistered=true&hotel=${hotel?.hotel_name}&hotelId=${hotel?.id}&nomadId=${nomad?.id}`;
        const invitationRejected = `accept-invitation?email=${nomadUser?.User?.email}&status=REJECTED&hotel=${hotel?.hotel_name}&hotelId=${hotel?.id}&nomadId=${nomad?.id}`;

        const message = `${hotel?.hotel_name} has invited you to become their internal Business Consultant. Check your email.`;

        // Send notification
        await createNotification(
          hotel?.hotel_name,
          "Invitation for Hotel Internal Business Consultant",
          message,
          nomadUser?.User?.id,
          hotel?.user?.id
        );

        // Send email
        await sendMail(
          "Hotel Invitation",
          nomadUser?.User?.email,
          invitationEmailTemplate(
            hotel?.hotel_name,
            profileImage,
            queryParams,
            invitationRejected,
            hotel?.user?.id
          )
        );
      });
    } else if (nomad_type === "invite") {
      // For non-registered users, check duplicate email and send invitation
      const isDuplicate = await prisma.hotel_internal_nomads.findFirst({
        where: { hotel_id, email },
      });

      if (isDuplicate) {
        return NextResponse.json(
          { message: "An invitation has already been sent to this email." },
          { status: 400 }
        );
      }

      await prisma.hotel_internal_nomads.create({
        data: {
          hotel_id,
          email,
          invite_status: invite_status || "PENDING",
        },
      });

      const queryParams = `sign-up?email=${email}&isRegistered=false&hotel=${hotel?.hotel_name}&hotelId=${hotel?.id}`;
      const invitationRejected = `accept-invitation?email=${email}&status=DIRECT_EMAIL&hotel=${hotel?.hotel_name}`;

      await sendMail(
        "Hotel Invitation",
        email,
        invitationEmailTemplate(
          hotel?.hotel_name,
          profileImage,
          queryParams,
          invitationRejected,
          hotel?.user?.id
        )
      );
    }

    return NextResponse.json(
      { message: "Invitation sent successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in POST API:", error);
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const hotel_id = searchParams.get("hotel_id");

    const internalNomads = await prisma.hotel_internal_nomads?.findMany({
      where: {
        hotel_id: hotel_id,
      },
      include: {
        nomad: true,
      },
    });

    return NextResponse.json(
      { message: "Success", internalNomads },
      { status: 200 }
    );
  } catch (error) {
    console.log("internal nomads error");
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// responsible for adding nomad in list
// when the email is accepted

// export async function PUT(req) {
//   try {
//     const data = await req.json();

//     const { nomadId, hotelId, invite_status } = data;

//     if (!nomadId || !hotelId) {
//       return NextResponse.json(
//         { message: "All fields are required" },
//         { status: 404 }
//       );
//     }

//     const isHotelExist = await prisma.hotel_info.findUnique({
//       where: {
//         id: hotelId,
//       },
//       include: {
//         user: true,
//       },
//     });

//     const isNomadExist = await prisma.nomad.findUnique({
//       where: {
//         id: nomadId,
//       },
//       include: {
//         User: true,
//       },
//     });

//     if (!isHotelExist) {
//       return NextResponse.json(
//         { message: "Hotel with the given id not exist" },
//         { status: 404 }
//       );
//     }

//     if (!isNomadExist) {
//       return NextResponse.json(
//         { message: "Nomad with the given id not exist" },
//         { status: 404 }
//       );
//     }

//     // create notifications
//     let nomadName = isNomadExist?.first_name + "" + isNomadExist?.last_name;
//     let message = `Congratulations ${isHotelExist?.hotel_name} ! ${nomadName} has successfully accepted your invitation for becoming Internal Nomad`;
//     await createNotification(
//       isHotelExist?.hotel_name,
//       "Invitation Accepted for Internal Nomad",
//       message,
//       isHotelExist?.user?.id,
//       isNomadExist?.User?.id
//     );

//     const isAlreadyAccepted = await prisma.hotel_internal_nomads.findFirst({
//       where: {
//         hotel_id: hotelId,
//         nomad_id: nomadId,
//       },
//     });

//     if (isAlreadyAccepted) {
//       return NextResponse.json(
//         { message: "Invitaion Accpeted" },
//         { status: 200 }
//       );
//     }

//     await prisma.hotel_internal_nomads.create({
//       data: {
//         hotel_id: hotelId,
//         nomad_id: nomadId,
//       },
//     });

//     return NextResponse.json(
//       { message: "Invitaion Accpeted" },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json(
//       { message: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }

export async function PUT(req) {
  try {
    const data = await req.json();
    const { nomadId, hotelId, invite_status } = data;

    if (!nomadId || !hotelId || !invite_status) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // Check if the hotel exists
    const isHotelExist = await prisma.hotel_info.findUnique({
      where: {
        id: hotelId,
      },
      include: {
        user: true,
      },
    });

    // Check if the nomad exists
    const isNomadExist = await prisma.nomad.findUnique({
      where: {
        id: nomadId,
      },
      include: {
        User: true,
      },
    });

    if (!isHotelExist) {
      return NextResponse.json(
        { message: "Hotel with the given id does not exist" },
        { status: 404 }
      );
    }

    if (!isNomadExist) {
      return NextResponse.json(
        { message: "Nomad with the given id does not exist" },
        { status: 404 }
      );
    }

    // Check if the invitation exists
    const existingInvitation = await prisma.hotel_internal_nomads.findFirst({
      where: {
        hotel_id: hotelId,
        nomad_id: nomadId,
      },
    });

    if (!existingInvitation) {
      return NextResponse.json(
        { message: "No invitation found for the given hotel and nomad" },
        { status: 404 }
      );
    }

    // Update the invite status
    await prisma.hotel_internal_nomads.update({
      where: {
        id: existingInvitation.id,
      },
      data: {
        invite_status,
      },
    });

    // Send notification based on the status
    let notificationMessage = "";
    if (invite_status === "ACCEPTED") {
      const nomadName = `${isNomadExist?.first_name || ""} ${
        isNomadExist?.last_name || ""
      }`;
      notificationMessage = `Congratulations ${isHotelExist?.hotel_name}! ${nomadName} has successfully accepted your invitation for becoming an Internal Nomad.`;
    } else if (invite_status === "REJECTED") {
      notificationMessage = `Unfortunately, the invitation to ${
        isNomadExist?.first_name || "Nomad"
      } has been rejected.`;
    }

    await createNotification(
      isHotelExist?.hotel_name,
      invite_status === "ACCEPTED"
        ? "Invitation Accepted for Internal Nomad"
        : "Invitation Rejected",
      notificationMessage,
      isHotelExist?.user?.id,
      isNomadExist?.User?.id
    );

    return NextResponse.json(
      { message: `Invitation ${invite_status.toLowerCase()} successfully` },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
