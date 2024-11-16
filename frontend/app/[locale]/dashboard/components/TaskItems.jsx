import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { FcOk } from "react-icons/fc";
import { IoCloseCircleSharp, IoPersonAdd } from "react-icons/io5";
import { MdOutlineDragIndicator } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useSelector } from "react-redux";
import AssignmentModal from "./assignment/AssignmentModal";
dayjs.extend(relativeTime);
const TaskItems = ({
  isTodayTask,
  handleEditToggle,
  tasks,
  editTaskId,
  editTitle,
  setEditTitle,
  handleEditSave,
  handleDelete,
  handleStatusChange,
}) => {
  const t = useTranslations("dashboard");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = useSelector((state) => state?.user?.user);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="space-y-4 mt-4">
      {tasks?.map((task) =>
        editTaskId === task._id ? (
          // Edit Mode View
          <div className="flex items-center space-x-2 w-full py-3 bg-gray-50 rounded-lg ">
            <div className="flex items-center space-x-2 mx-3 w-full">
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="input flex-grow text-md bg-gray-200 w-auto focus:outline-none"
              />
              <button onClick={handleEditSave} className="text-green-500">
                <FcOk size={33} />
              </button>
              <button
                onClick={() => handleEditToggle(task)}
                className="text-red-500"
              >
                <IoCloseCircleSharp size={33} />
              </button>
            </div>
          </div>
        ) : (
          <div
            key={task._id}
            className="flex items-center justify-between p-4 rounded-lg bg-gray-50 group"
          >
            <div className="flex items-center space-x-2">
              <MdOutlineDragIndicator size={23} color="gray" />
              <input
                type="checkbox"
                defaultChecked={task.status === "completed"}
                className="checkbox text-gray-400"
                onChange={(e) => handleStatusChange(e, task._id)}
              />
              <span
                className={`text-sm text-gray-800 ${
                  task.status === "completed" ? "line-through" : ""
                }`}
              >
                {task.title}
              </span>
            </div>
            <div className="flex items-center lg:space-x-3 space-x-2 ">
              {/* Edit Icon (Visible on Hover) */}
              <FaRegEdit
                size={20}
                className=" opacity-0 group-hover:opacity-100 text-gray-900 hover:text-gray-700 cursor-pointer"
                onClick={() => handleEditToggle(task)}
              />
              <IoPersonAdd
                size={20}
                className=" opacity-0 group-hover:opacity-100 text-gray-900 hover:text-gray-700 cursor-pointer"
                onClick={() => {
                  openModal();
                }}
              />
              <AssignmentModal
                loginUser={user}
                isOpen={isModalOpen}
                onClose={closeModal}
                taskId={task?._id}
              />
              <button
                className="flex -space-x-2"
                // onClick={() => {
                //   openModal();
                // }}
              >
                <div className="avatar-group -space-x-4 rtl:space-x-reverse">
                  {task?.assignments?.map((assignment) => (
                    <div className="avatar">
                      <div className="w-8">
                        <img src={assignment?.user_id?.avatar} alt="avatar" />
                      </div>
                    </div>
                  ))}
                </div>
              </button>
              <span
                className={`${
                  task.priority == "high" && "bg-red-100 text-red-600"
                } ${
                  task.priority == "medium" && "bg-yellow-100 text-yellow-600"
                } ${
                  task.priority == "low" && "bg-green-100 text-green-600"
                } text-sm font-semibold px-2 py-1 rounded cursor-pointer`}
              >
                {t(`priorityNameList.${task.priority}`)}
              </span>

              {/*  task da*/}
              {isTodayTask ? (
                <span className="bg-red-100 text-red-600 text-sm font-semibold px-2 py-1 rounded cursor-pointer">
                  {dayjs().diff(task.duedate, "day") < 1
                    ? t(`today`)
                    : "overdue"}
                </span>
              ) : (
                task.duedate &&
                (dayjs(task.duedate).isBefore(dayjs()) ? (
                  <span className="bg-red-500 text-white text-sm font-semibold px-2 py-1 rounded cursor-pointer">
                    {`${t("overdue")} ${dayjs(task.duedate).fromNow()}`}
                  </span>
                ) : (
                  <span className="bg-gray-300 text-gray-600 text-sm font-semibold px-2 py-1 rounded cursor-pointer">
                    {`${t("next")} ${dayjs(task.duedate).format("DD MMM")}`}
                  </span>
                ))
              )}

              <button
                className="text-gray-400 hover:text-gray-600"
                onClick={() => handleDelete(task._id)}
              >
                <RiDeleteBin6Line size={20} />
              </button>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default TaskItems;
