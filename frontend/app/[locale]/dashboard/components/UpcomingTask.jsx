"use client";
import { FcCalendar } from "react-icons/fc";
import {
  MdOutlineDragIndicator
} from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";

const UpcomingTask = ({ upcomingTasks }) => {
  return (
    <div className="bg-base-100 collapse collapse-arrow">
      <input type="checkbox" className="peer" />
      <div className="collapse-title bg-gray-50 peer-checked:bg-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <FcCalendar size={20} />
            <span className="text-lg font-semibold text-gray-700">
              Upcoming Tasks
            </span>
            <span className="bg-gray-200 text-gray-800 text-sm font-medium px-2 mx-3 py-1 rounded">
              {upcomingTasks?.length}
            </span>
          </div>
        </div>
      </div>

      <div className="collapse-content bg-gray-100 peer-checked:bg-gray-100">
        {/* Task Items for Upcoming Tasks */}
        <div className="space-y-4">
          {upcomingTasks?.map((task) => (
            <div
              key={task._id}
              className="flex items-center justify-between p-4 rounded-lg bg-gray-50"
            >
              <div className="flex items-center space-x-2">
                <MdOutlineDragIndicator size={23} color="gray" />
                <input
                  type="checkbox"
                  defaultChecked={task.status === "completed"}
                  className="checkbox text-gray-400"
                />
                <span
                  className={`text-sm text-gray-800 ${
                    task.status === "completed" ? "line-through" : ""
                  }`}
                >
                  {task.title}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-2">
                  <div className="avatar-group -space-x-4 rtl:space-x-reverse">
                    <div className="avatar">
                      <div className="w-8">
                        <img
                          src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                          alt="avatar"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <span className="bg-red-100 text-red-600 text-xs font-semibold px-2 py-0.5 rounded">
                  {task.priority}
                </span>
                <button className="text-gray-400 hover:text-gray-600">
                  <RiDeleteBin6Line />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UpcomingTask;
