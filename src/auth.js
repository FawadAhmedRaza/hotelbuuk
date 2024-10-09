import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import { prisma } from "./db";

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email@example.com" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials, req) => {
        console.log("my credentials", credentials);

        if (!credentials || !credentials.email || !credentials.password) {
          // Provide a user-friendly error message
          throw new Error("Missing email or password.");
        }

        const email = credentials.email;

        // Find the user in the database
        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          // Throw error if user does not exist
          throw new Error("User does not exist.");
        }

        // Check if the password matches
        const isMatch = bcrypt.compareSync(credentials.password, user.password);
        if (!isMatch) {
          throw new Error("Incorrect password.");
        }

        // If everything is fine, return the user object
        return user;
      },
    }),
  ],
  pages: {
    // Add custom error pages if you want, otherwise NextAuth provides default ones
    signIn: "/login", // Custom sign-in page
    error: "/login",
  },
  callbacks: {
    async jwt(token, user, account, profile, isNewUser) {
      // Logic to handle JWT callback (optional)
      return token;
    },
    async session(session, token) {
      // Logic to handle session callback (optional)
      return session;
    },
  },
  debug: process.env.NODE_ENV === "development",
});
