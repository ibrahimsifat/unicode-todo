"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next-intl/client";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (e) => {
    router.replace(pathname, { locale: e.target.value });
  };

  return (
    <select value={locale} onChange={handleChange}>
      <option value="en">English</option>
      <option value="ar">Arabic</option>
    </select>
  );
}
