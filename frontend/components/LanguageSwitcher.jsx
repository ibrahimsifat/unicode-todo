"use client";

import { usePathname, useRouter } from "next/navigation";

export default function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();

  // Extract the locale from the path
  const getLocaleFromPath = (path) => path.split("/")[1];
  const currentLocale = getLocaleFromPath(pathname);

  // Determine the next locale
  const toggleLocale = currentLocale === "en" ? "ar" : "en";

  const changeLocale = () => {
    // Replace the locale in the path
    const newPath = pathname.replace(`/${currentLocale}`, `/${toggleLocale}`);
    router.push(newPath);
  };

  return (
    <button
      onClick={changeLocale}
      className="btn px-5 py-1 text-sm font-medium rounded-full border bg-gray-300 text-black hover:bg-[#2f2b43] hover:text-white"
    >
      {toggleLocale === "en" ? "Switch to English" : "التبديل إلى العربية"}
    </button>
  );
}
