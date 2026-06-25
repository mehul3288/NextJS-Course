import { Outfit } from "next/font/google";
import "./globals.css";

import { Toaster } from "react-hot-toast";
import { AppContextProvider } from "@/context/AppContext";
import { SessionProvider } from "next-auth/react";
import Providers from "@/providers/providers";

const outfit = Outfit({ subsets: ['latin'], weight: ["300", "400", "500"] })

export const metadata = {
  title: "QuickCart - GreatStack",
  description: "E-Commerce with Next.js ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${outfit.className} antialiased text-gray-700`} >
        <Toaster />

        <AppContextProvider>
        {/* <SessionProvider> */}
        <Providers>
          {children}
        </Providers>
        {/* </SessionProvider> */}
        </AppContextProvider>
        {/* </SessionProvider> */}
      </body>
    </html>
  );
}
