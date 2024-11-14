import { createSharedPathnamesNavigation } from "next-intl/navigation";

export const locales = ["en", "es", "fr"];
export const { Link, redirect, useRouter, usePathname } =
  createSharedPathnamesNavigation({ locales });
