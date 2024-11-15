"use client";
import Navbar from "@/components/Navbar";
import { setCredentials } from "@/features/auth/authSlice";
import { store } from "@/features/store";
import { SessionProvider, useSession } from "next-auth/react";
import { NextIntlClientProvider } from "next-intl";
import { Inter, Noto_Kufi_Arabic } from "next/font/google";
import React, { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import ClientProvider from "../ClientProvider";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const notoKufiArabic = Noto_Kufi_Arabic({
  subsets: ["arabic"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

// SessionHandler to sync session data with Redux
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

  return null;
}

// RootLayout Component
export default function LocaleLayout({ children, params }) {
  // Use React.use() to unwrap params
  const unwrappedParams = React.use(params);
  const { locale } = unwrappedParams;
  // Import messages dynamically based on locale
  const messages = require(`../../messages/${locale}.json`);
  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body
        className={`${
          locale === "ar" ? notoKufiArabic.className : inter.className
        } antialiased`}
      >
        <Navbar />
        <Provider store={store}>
          <SessionProvider>
            <NextIntlClientProvider locale={locale} messages={messages}>
              <SessionHandler />
              <ClientProvider>{children}</ClientProvider>
            </NextIntlClientProvider>
          </SessionProvider>
        </Provider>
      </body>
    </html>
  );
}
