"use server";

import { prisma } from "../db";

// GET StaticContent BY Type
export const getStaticContentByType = async (type) => {
  try {
    const staticContents = await prisma.staticContent.findMany({
      where: { type },
    });

    // Check if we have any static content and return the first one
    if (!staticContents || staticContents.length === 0) {
      return {
        message: "Static content not found.",
        statusCode: 404,
      };
    }

    // Return only the first object
    return {
      staticContent: staticContents[0], // Return the first object
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
