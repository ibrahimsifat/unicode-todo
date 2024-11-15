import dayjs from "dayjs";
import "dayjs/locale/ar";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { FaFilter } from "react-icons/fa";
import { IoGrid } from "react-icons/io5";
import { useSelector } from "react-redux";

const priorityData = [
  {
    name: "All",
    value: "all",
  },
  {
    name: "High",
    value: "high",
  },
  {
    name: "Medium",
    value: "medium",
  },
  {
    name: "Low",
    value: "low",
  },
];
const Header = ({ selectedPriority, setSelectedPriority }) => {
  const t = useTranslations("dashboard");
  const { user } = useSelector((state) => state?.user);
  const { locale } = useRouter(); // Get the current locale from the router
  console.log(locale);
  dayjs.locale(locale); // Change locale dynamically based on current language

  // Get the current day name
  const currentDay = dayjs().format("dddd").toLowerCase();

  // Get the translated day name from the translation files
  const translatedDay = t(`days.${currentDay}`);

  // Get the current date in the format: Day, Date Month Year
  const formattedDate = dayjs().format("D M YYYY");

  // translate the priority options
  const translatedPriorityOptions = priorityData.map((option) => ({
    ...option,
    label: t(`priorityNameList.${option.value}`), // Translate using the key for the label
  }));
  console.log(translatedPriorityOptions);
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">
          {t("greeting")}, {user?.name || "Camero"}
          <span role="img" aria-label="smiling face">
            🤩
          </span>
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          {/* <span>{t("todayIs")}</span> {formattedDate} */}
          <span>{t("todayIs")}</span> {translatedDay}, {formattedDate}
          {/* It's {formattedDate} */}
        </p>
      </div>

      <div className="flex items-center space-x-2">
        <FaFilter size={20} />
        {translatedPriorityOptions.map((priority) => (
          <button
            key={priority.value}
            onClick={() => setSelectedPriority(priority.value)}
            className={`px-3 rounded-full text-sm ${
              selectedPriority === priority.value
                ? "bg-[#2F2B43] text-white"
                : "bg-gray-200"
            } transition duration-200 hover:bg-[#110f1d] hover:text-white focus:outline-none`}
          >
            {priority.label}
          </button>
        ))}
      </div>

      <button className="focus:outline-none bg-gray-50 p-1 rounded-md">
        <IoGrid size={22} />
      </button>
    </div>
  );
};

export default Header;
