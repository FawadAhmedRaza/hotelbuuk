"use server";

import { redirect } from "next/navigation";
import { prisma } from "../db";
import { auth, signIn, signOut } from "../auth";
import { revalidatePath } from "next/cache";
import { generateOTP, saltAndHashPassword } from "../libs/helper";
import { sendMail } from "../service/mailService";
import { otpTemplate } from "../libs/otpTemplate";
import bcrypt from "bcryptjs";
import { generateToken } from "../service/tokenGenerator";

export const login = async (provider) => {
  await signIn(provider, { redirectTo: "/" });
  revalidatePath("/");
};

export const logout = async () => {
  await signOut({ redirectTo: "/" });
  revalidatePath("/");
};

// Create User
export async function createUser(data) {
  const { first_name, last_name, email, password, phone_number, terms } = data;

  // Check if any required field is missing
  if (
    !first_name ||
    !last_name ||
    !email ||
    !password ||
    !phone_number ||
    !terms
  ) {
    return {message:"All fields are required.",statusCode:400};
  }

  try {
    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      return {
        message: "User with this email already exists.",
        statusCode: 400,
      };
    }

    const hashedPassword = saltAndHashPassword(password);

    const OTP = generateOTP(6);

    // Create a new user
    const newUser = await prisma.user.create({
      data: {
        first_name,
        last_name,
        email,
        password: hashedPassword, // You may want to hash this before saving
        phone_number,
        terms,
        confirmationOTP: OTP,
        forgetPasswordOTP: "",
      },
    });

    await sendMail(
      "Test OTP",
      newUser.email,
      otpTemplate(newUser.first_name, OTP)
    );

    // Respond with the created user (omit password for security)
    return {
      statusCode: 200,
      message: "User created successfully.",
    };
  } catch (error) {
    console.error(error);
    return {
      message: "Internal Server Error",
      statusCode: 500,
    };
  }
}

const getUserByEmail = async (email) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  } catch (error) {
    return null;
  }
};

export const getUserById = async (id) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    return user;
  } catch (error) {
    return null;
  }
};

export const loginWithCreds = async (data) => {
  try {
    const { email, password } = data || {};
    console.log(email, password);
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return {
        message: "Invalid Crediantials.",
        statusCode: 400,
      };
    }

    // Check if the password matches
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return {
        message: "Invalid Crediantials.",
        statusCode: 400,
      };
    }
    const token = await generateToken(user);
    console.log(token);
    // If everything is fine, return the user object
    return { data: { accessToken: token, user }, statusCode: 200 };
  } catch (err) {
    return {
      message: "Internal Server Error",
      statusCode: 500,
    };
  }
};

export const forgetPassword = async (email) => {
  try {
    const user = await getUserByEmail(email);

    if (!user) {
      return {
        message: "user not exists",
        statusCode: 400,
      };
    }

    const OTP = generateOTP(6);

    await prisma.user.update({
      where: {
        email,
      },
      data: {
        forgetPasswordOTP: OTP,
      },
    });

    await sendMail(
      "Forget Password ITP",
      user.email,
      otpTemplate(user.first_name, OTP)
    );

    return {
      message: "Otp is sent to your email",
      statusCode: 200,
    };
  } catch (error) {
    return {
      message: "Internal Server Error",
      statusCode: 500,
    };
  }
};


// signup
export const CheckOTP = async (email, otp) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        confirmationOTP: otp,
        email,
      },
    });

    if (!user) {
      return { message: "Invalid Crediantials", statusCode: 400 };
    }

    const updatedUser = await prisma.user.update({
      where: {
        email: user.email,
      },
      data: {
        confirmationOTP: "",
      },
    });

    const accessToken = await generateToken(updatedUser);
    return {
      statusCode: 200,
      data: { accessToken, user: updatedUser },
      message: "User confirmed.",
    };
  } catch (error) {
    return {
      message: "Internal Server Error",
      statusCode: 500,
    };
  }
};

// done
export const CheckForgetOTP = async (email, otp) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        forgetPasswordOTP: otp,
        email,
      },
    });

    if (!user) {
      return { message: "Invalid Otp.", statusCode: 400 };
    }

    return {
      statusCode: 200,
      message: "otp is valid.",
    };
  } catch (error) {
    return {
      message: "Internal Server Error",
      statusCode: 500,
    };
  }
};

// done
export const resetPasssword = async (email, otp, newPassword) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        forgetPasswordOTP: otp,
        email,
      },
    });

    if (!user) {
      return { message: "Invalid Otp.", statusCode: 400 };
    }
    const hashedPassword = saltAndHashPassword(newPassword);

    const updatedUser = await prisma.user.update({
      where: {
        email: user.email,
      },
      data: {
        password: hashedPassword,
        forgetPasswordOTP: "",
      },
    });

    const accessToken = await generateToken(updatedUser);
    return {
      statusCode: 200,
      data: { accessToken, user: updatedUser },
      message: "Password reset successfully.",
    };
  } catch (error) {
    return {
      message: "Internal Server Error",
      statusCode: 500,
    };
  }
};
