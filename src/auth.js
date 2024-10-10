import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
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
      allowDangerousEmailAccountLinking: true,
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // If it's the first time the user is signing in, add user details to the token
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      // Attach token data (e.g., id, email, name) to session
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
      }
      return session;
    },
    async signIn({ account, profile }) {
      try {
        const checkUser = await prisma.user.findUnique({
          where: { email: profile.email },
        });

        if (!checkUser) {
          await prisma.user.create({
            data: {
              email: profile?.email,
              first_name: profile?.name?.split(" ")[0] || profile?.given_name,
              last_name: profile?.name?.split(" ")[1] || profile?.family_name,
              phone_number: profile?.phone_number || "",
              terms: true,
              googleId: profile?.sub,
            },
          });
        } else {
          await prisma.user.update({
            where: { id: checkUser.id },
            data: { googleId: profile?.sub },
          });
        }

        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    },
  },
  pages: {
    signIn: "/login",
  },
  debug: process.env.NODE_ENV === "development",
});
