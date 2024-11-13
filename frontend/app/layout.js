// app/layout.js
"use client";
import { SessionProvider } from "next-auth/react";
import { Inter } from "next/font/google";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import ClientProvider from "./ClientProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"], // Or other subsets like 'latin-ext' or 'cyrillic'
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], // Optional, specify the font weights you need
  display: "swap", // Optional, specify display property
});
// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={` ${inter.className} antialiased`}>
        <Provider store={store}>
          <SessionProvider>
            <ClientProvider>{children}</ClientProvider>
          </SessionProvider>
        </Provider>
      </body>
    </html>
  );
}
