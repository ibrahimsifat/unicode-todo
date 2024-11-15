import { createSharedPathnamesNavigation } from "next-intl/navigation";
export const locales = ["en", "ar"];

export const localeNames = {
  en: "English",
  ar: "العربية (Arabic)",
};
export const { Link, usePathname, useRouter } = createSharedPathnamesNavigation(
  { locales }
);
