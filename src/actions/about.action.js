"use server";

import { prisma } from "../db";

// GET StaticContent BY Type
export const getAboutUs = async () => {
  try {
    const aboutUs = await prisma.aboutSections.findMany({});

    // Check if we have any static content and return the first one
    if (!aboutUs || aboutUs.length === 0) {
      return {
        message: "About Us content not found.",
        statusCode: 404,
      };
    }

    // Return only the first object
    return {
      aboutUs: aboutUs, // Return the first object
      statusCode: 200,
    };
  } catch (err) {
    console.log(err.message);
    return {
      message: "Internal Server Error",
      statusCode: 500,
    };
  }
};
