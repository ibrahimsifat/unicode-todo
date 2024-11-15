import { useTranslations } from "next-intl";
import { MdOutlineKeyboardCommandKey } from "react-icons/md";
const ToggleFormButton = ({ isFormOpen, setIsFormOpen }) => {
  const t = useTranslations("dashboard");
  return (
    <button
      className="flex items-center justify-center w-full py-2 mt-4 text-gray-600 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md border-2 border-dashed border-gray-300"
      onClick={() => setIsFormOpen(!isFormOpen)}
    >
      <div className="w-11/12 flex items-center justify-between">
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          <span className="text-sm font-semibold">{t("newTask")}</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="bg-white rounded px-2 py-1">
            <MdOutlineKeyboardCommandKey size={17} />
          </div>
          <span className="text-sm font-semibold bg-white rounded px-3 py-0.5">
            T
          </span>
        </div>
      </div>
    </button>
  );
};

export default ToggleFormButton;
