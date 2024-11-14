import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

export const locales = ["en", "es", "fr"];

export default async function getI18nConfig(locale) {
  if (!locales.includes(locale)) notFound();

  return getRequestConfig({
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  });
}
