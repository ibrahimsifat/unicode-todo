import { setPriority } from "@/features/pagination/paginationSlice";
import { useGetTasksQuery } from "@/features/task/tasksApi";
import dayjs from "dayjs";
import "dayjs/locale/ar";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { FaFilter } from "react-icons/fa";
import { IoGrid } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

const priorityData = [
  { name: "All", value: "all" },
  { name: "High", value: "high" },
  { name: "Medium", value: "medium" },
  { name: "Low", value: "low" },
];

const Header = () => {
  const t = useTranslations("dashboard");
  const priorityValue = useSelector((state) => state.pagination.priority);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state?.user);
  const page = useSelector((state) => state.pagination.page);
  const pageSize = useSelector((state) => state.pagination.pageSize);
  const priority = useSelector((state) => state.pagination.priority);

  const todayQuery = {
    page,
    pageSize,
    priority,
    todaytask: true,
  };
  const { refetch, isLoading, isError } = useGetTasksQuery({ ...todayQuery });

  // Handle priority change
  const handlePriorityChange = (value) => {
    dispatch(setPriority(value));
    refetch();
  };

  // Get the current day name
  const currentDay = dayjs().format("dddd").toLowerCase();

  // Get the translated day name from the translation files
  const translatedDay = t(`days.${currentDay}`);

  // Get the current date in the format: Day, Date Month Year
  const formattedDate = dayjs().format("D M YYYY");

  // Translate the priority options
  const translatedPriorityOptions = priorityData.map((option) => ({
    ...option,
    label: t(`priorityNameList.${option.value}`),
  }));

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  const buttonVariants = {
    hover: { scale: 1.1, transition: { duration: 0.2 } },
    tap: { scale: 0.95 },
  };

  return (
    <motion.div
      className="md:flex md:items-center md:justify-between mb-6 md:space-y-0 space-y-4"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div>
        <motion.h1
          className="lg:text-2xl md:text-xl text-lg font-semibold text-gray-800"
          variants={containerVariants}
        >
          {t("greeting")}, {user?.name || "Camero"}
          <span role="img" aria-label="smiling face">
            🤩
          </span>
        </motion.h1>
        <motion.p
          className="text-sm text-gray-500 mt-1"
          variants={containerVariants}
        >
          <span>{t("todayIs")}</span> {translatedDay}, {formattedDate}
        </motion.p>
      </div>

      <motion.div
        className="flex items-center space-x-2"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <FaFilter size={20} />
        {translatedPriorityOptions.map((priority) => (
          <motion.button
            key={priority.value}
            onClick={() => handlePriorityChange(priority.value)}
            className={`px-3 rounded-full text-sm ${
              priorityValue === priority.value
                ? "bg-[#2F2B43] text-white"
                : "bg-gray-200"
            } transition duration-200 hover:bg-[#110f1d] hover:text-white focus:outline-none`}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            {priority.label}
          </motion.button>
        ))}
        <motion.button
          className="focus:outline-none bg-gray-50 p-1 rounded-md"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <IoGrid size={22} />
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default Header;
