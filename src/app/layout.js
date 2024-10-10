import { Poppins, Montserrat } from "next/font/google";
import LocalFont from 'next/font/local'
import { SessionProvider } from "next-auth/react";
import { auth } from "@/src/auth";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "../auth/jwt";
import "./globals.css";

export const metadata = {
  title: "Hotel Buuk",
  description: "Generated by create next app",
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
});



const lemonMilk = LocalFont({
  src: [
    {
      path: '../../public/assets/fonts/LEMONMILK-Regular.otf',
      weight: "400",
    },
    {
      path: '../../public/assets/fonts/LEMONMILK-Medium.otf',
      weight: "500",
    },
    {
      path: '../../public/assets/fonts/LEMONMILK-Bold.otf',
      weight: "700",
    },
  ],
  variable: '--font-lemonMilk'
})


export default async function RootLayout({ children }) {
  const session = await auth();
  console.log("this is session : ", session?.user);
  return (
    <SessionProvider session={session}>
      <html lang="en" className={`${poppins.variable} ${montserrat.variable} ${lemonMilk.variable}`}>
        <body className="font-poppins overflow-x-hidden">
          <AuthProvider>
            <Toaster position="top-right" reverseOrder={false} />
            {children}
          </AuthProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
