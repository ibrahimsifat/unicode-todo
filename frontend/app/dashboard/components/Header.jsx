import { FaFilter } from "react-icons/fa";
import { IoGrid } from "react-icons/io5";

const Header = ({ selectedPriority, setSelectedPriority }) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">
          Good Evening, Camero{" "}
          <span role="img" aria-label="smiling face">
            🤩
          </span>
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          It's Monday, 25 September 2023
        </p>
      </div>

      <div className="flex items-center space-x-2">
        <FaFilter size={20} />
        {priorityData.map((priority) => (
          <button
            key={priority.value}
            onClick={() => setSelectedPriority(priority.value)}
            className={`px-3 rounded-full text-sm ${
              selectedPriority === priority.value
                ? "bg-[#2F2B43] text-white"
                : "bg-gray-200"
            } transition duration-200 hover:bg-[#110f1d] hover:text-white focus:outline-none`}
          >
            {priority.name}
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
