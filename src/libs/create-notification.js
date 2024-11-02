import { prisma } from "../db";

export const createNotification = async (
  name,
  subject,
  message,
  user_id,
  from_user_id
) => {
  try {
    await prisma.notifications.create({
      data: {
        name,
        message,
        subject,
        user_id,
        from_user_id,
      },
    });
    return true;
  } catch (error) {
    console.log("error uploading notifications", error);
    return false;
  }
};
