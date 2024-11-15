"use client";
import { setCredentials } from "@/features/auth/authSlice";
import { SessionProvider, useSession } from "next-auth/react";
import { Inter } from "next/font/google";
import { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";

import { store } from "@/features/store";
import ClientProvider from "./ClientProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

// Separate component for session handling
function SessionHandler() {
  const { data: session } = useSession();
  const dispatch = useDispatch();

  useEffect(() => {
    if (session?.accessToken) {
      dispatch(
        setCredentials({
          accessToken: session?.accessToken,
          user: session.user,
        })
      );
    }
  }, [session, dispatch]);

  return null; // This component does not render UI, it only runs logic
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={` ${inter.className} antialiased`}>
        {/* Wrapping the entire application in SessionProvider and Redux Provider */}
        <Provider store={store}>
          <SessionProvider>
            <SessionHandler /> {/* Handles session side effects */}
            <ClientProvider>{children}</ClientProvider>
          </SessionProvider>
        </Provider>
      </body>
    </html>
  );
}
