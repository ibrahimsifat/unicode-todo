import { FaAnglesDown } from "react-icons/fa6";
import { FcCalendar } from "react-icons/fc";

const TaskNotFound = ({ headerTitle, taskLength }) => {
  return (
    <div className="bg-base-100 collapse collapse-arrow my-6 collapse-open">
      <input type="checkbox" className="peer" />
      <div className="collapse-title bg-gray-50 peer-checked:bg-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <FcCalendar size={20} />
            <span className="text-lg font-semibold text-gray-700">
              {/* {t("remaining")} */}
              {headerTitle}
            </span>
            <span className="bg-gray-200 text-gray-800 text-sm font-medium px-2 mx-3 py-1 rounded">
              {taskLength}
            </span>
          </div>
        </div>
      </div>

      <div className="collapse-content bg-gray-100 peer-checked:bg-gray-100  ">
        <div className="my-10 flex flex-col items-center justify-center">
          <div className="text-6xl mb-4">😕</div>
          <h1 className="lg:text-3xl md:text-2xl text-xl font-bold mb-2">
            Oops! Today Task Not Found
          </h1>
          <p className="text-gray-600 mb-6 text-center">
            It seems the task you're looking for doesn't exist.
          </p>
          {/* Action Buttons */}
          <div className="flex space-x-4 items-center">
            <button className="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg cursor-not-allowed">
              <div className="flex items-center gap-4">
                Add New Task By Bellow <FaAnglesDown />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskNotFound;
