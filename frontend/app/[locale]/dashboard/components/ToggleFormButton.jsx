import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { memo, useCallback } from "react";
import { MdOutlineKeyboardCommandKey } from "react-icons/md";

// Memoized ToggleFormButton to prevent unnecessary re-renders
const ToggleFormButton = memo(({ isFormOpen, setIsFormOpen }) => {
  const t = useTranslations("dashboard");

  // Memoize the toggle function to prevent re-creations on every render
  const handleToggle = useCallback(() => {
    setIsFormOpen((prev) => !prev);
  }, [setIsFormOpen]);

  return (
    <motion.button
      className="flex items-center justify-between w-full py-2 mt-4 text-gray-600 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md border-2 border-dashed border-gray-300 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
      onClick={handleToggle} // Use the memoized toggle function
      aria-label={isFormOpen ? "Close new task form" : "Open new task form"}
      whileHover={{ scale: 1.05 }} // Slightly scale the button on hover
      whileTap={{ scale: 0.98 }} // Slightly shrink the button on click
      animate={{ opacity: 1 }} // Ensures the button opacity remains 100%
      initial={{ opacity: 0 }} // Fade-in effect when component mounts
      transition={{ duration: 0.3 }} // Smooth transition
    >
      <div className="w-11/12 flex items-center justify-between mx-auto">
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
    </motion.button>
  );
});

export default ToggleFormButton;
