"use client";

import { localeNames, locales, usePathname, useRouter } from "@/i18n.config";
const flags = {
  en: { src: "/english_flag.png", alt: "English Flag", label: "English" },
  ar: { src: "/saudi_flag.png", alt: "Arabic Flag", label: "عربي" },
};
export default function LocaleSwitcher({ locale }) {
  // `pathname` will contain the current
  // route without the locale e.g. `/about`...
  const pathname = usePathname();
  const router = useRouter();

  const changeLocale = (event) => {
    const newLocale = event.target.value;

    // ...if the user chose Arabic ("ar-eg"),
    // router.replace() will prefix the pathname
    // with this `newLocale`, effectively changing
    // languages by navigating to `/ar-eg/about`.
    router.replace(pathname, { locale: newLocale });
  };
  console.log(locale);
  return (
    <div>
      <select
        value={locale}
        onChange={changeLocale}
        className="select select-bordered focus:outline-none"
      >
        {locales.map((loc) => (
          <option key={loc} value={loc} className="capitalize py-2">
            {localeNames[loc]}
          </option>
        ))}
      </select>
    </div>
  );
}
