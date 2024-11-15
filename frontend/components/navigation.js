import { createSharedPathnamesNavigation } from "next-intl/navigation";

export const locales = ["en", "ar"];
export const { Link, redirect, useRouter, usePathname } =
  createSharedPathnamesNavigation({ locales });
