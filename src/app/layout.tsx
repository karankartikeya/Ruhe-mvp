import type { Metadata } from "next";
import "../../public/assets/scss/globals.scss";
import "../../public/assets/scss/style.scss";
import { Providers } from "@/redux-toolkit/provider";
import { ToastContainer } from "react-toastify";
import { getServerSession } from "next-auth";
import SessionWrapper from "@/Common/SessionWrapper";
import SplashCursor from "@/utils/SplashCursor";

export const metadata: Metadata = {
  title: "RuheApp",
  description: "RuheApp is a mental health and wellness social media platform",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const session = await getServerSession(authoption);
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap" rel="stylesheet"/>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="favicon.png" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </head>
      <body>
        {/* <SessionWrapper session={session}> */}
        <Providers>
          {/* <SplashCursor /> */}
          {children}
        </Providers>
        <ToastContainer />
        {/* </SessionWrapper> */}
      </body>
    </html>
  );
}
