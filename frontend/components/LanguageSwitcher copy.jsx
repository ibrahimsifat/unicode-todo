"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const flags = {
  en: { src: "/english_flag.png", alt: "English Flag", label: "English" },
  ar: { src: "/saudi_flag.png", alt: "Arabic Flag", label: "عربي" },
};

const LanguageSwitcher = () => {
  const { locale, asPath = "/" } = useRouter();

  return (
    <div className="relative group inline-block">
      {/* Dropdown button */}
      <button className="outline-none focus:outline-none px-2 bg-white flex items-center min-w-32">
        <li className="rounded-sm py-1 flex justify-start items-center cursor-pointer">
          <Image
            src={flags[locale]?.src || flags.en.src}
            alt={flags[locale]?.alt || "Flag"}
            width="30"
            height="25"
          />
          <span className="mx-2">{flags[locale]?.label || flags.en.label}</span>
        </li>
        <svg
          className="fill-current h-4 w-4 transform group-hover:-rotate-180 transition duration-150 ease-in-out"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </button>

      {/* Dropdown menu */}
      <ul className="bg-white border rounded-sm transform scale-0 group-hover:scale-100 absolute transition duration-150 ease-in-out origin-top min-w-36 font-bold z-10">
        {Object.keys(flags).map((lang) => (
          <Link key={lang} href={asPath} locale={lang}>
            <li
              className={`rounded-sm px-3 py-1 hover:bg-gray-100 flex justify-start items-center cursor-pointer ${
                lang === locale ? "font-bold text-blue-500" : ""
              }`}
            >
              <Image
                src={flags[lang].src}
                alt={flags[lang].alt}
                width="30"
                height="25"
              />
              <span className="mx-2">{flags[lang].label}</span>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default LanguageSwitcher;
