"use client";
import {
  useDeleteTaskMutation,
  useGetTasksQuery,
  useToggleStatusMutation,
  useUpdateTaskMutation,
} from "@/features/task/tasksApi";
import dayjs from "dayjs";
import { useState } from "react";
import { FaFilter, FaRegEdit } from "react-icons/fa";
import { FcCalendar, FcOk } from "react-icons/fc";
import { IoCloseCircleSharp, IoGrid } from "react-icons/io5";
import {
  MdOutlineDragIndicator,
  MdOutlineKeyboardCommandKey,
} from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useSelector } from "react-redux";
import InsertTodoForm from "./InsertTodoForm";

const TaskList = ({ tasks, isFormOpen, setIsFormOpen }) => {
  const [editTaskId, setEditTaskId] = useState(null); // To track which task is being edited
  const [editTitle, setEditTitle] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("all"); // State for priority filter
  const page = useSelector((state) => state.pagination.page);
  const pageSize = useSelector((state) => state.pagination.pageSize);
  const [toggleStatus] = useToggleStatusMutation();
  const [deleteTask] = useDeleteTaskMutation();
  const { refetch } = useGetTasksQuery({
    page,
    pageSize,
  });
  const [updateTask] = useUpdateTaskMutation(); // Initialize the mutation hook

  // Handle status change
  const handleStatusChange = async (e, taskId) => {
    const newStatus = e.target.checked ? "completed" : "pending";
    await toggleStatus({ id: taskId, status: newStatus });
    await refetch();
  };

  // Handle delete task
  const handleDelete = async (taskId) => {
    try {
      await deleteTask(taskId);
      await refetch();
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  // Handle edit toggle
  const handleEditToggle = (task) => {
    // If we are already editing this task, toggle it off; otherwise, set it to this task's ID
    if (editTaskId === task._id) {
      setEditTaskId(null);
      setEditTitle(""); // Clear edit title
    } else {
      setEditTaskId(task._id);
      setEditTitle(task.title); // Set the current title for editing
    }
  };

  const handleEditSave = async () => {
    try {
      await updateTask({ id: editTaskId, data: { title: editTitle } });
      setEditTaskId(null); // Exit edit mode after saving
      await refetch();
    } catch (error) {
      console.error("Failed to update task title:", error);
    }
  };

  // Filter tasks based on selected priority
  const filteredTasks =
    selectedPriority === "all"
      ? tasks
      : tasks.filter((task) => task.priority === selectedPriority);
  console.log("filteredTasks", filteredTasks);
  console.log("tasks", tasks);
  const today = dayjs().startOf("day"); // Get today's date at midnight (start of the day)

  // Filter today's tasks
  const todayTasks = tasks?.filter((task) => {
    const taskDate = task.duedate ? dayjs(task.duedate).startOf("day") : null;
    return taskDate && taskDate.isSame(today, "day"); // Tasks that are exactly today
  });

  // Filter upcoming tasks (not today)
  const upcomingTasks = tasks?.filter((task) => {
    const taskDate = task.duedate ? dayjs(task.duedate).startOf("day") : null;
    return taskDate && !taskDate.isSame(today, "day"); // Tasks that are not today
  });

  // Filter expired tasks (before today)
  const expiredTasks = tasks?.filter((task) => {
    const taskDate = task.duedate ? dayjs(task.duedate).startOf("day") : null;
    return taskDate && taskDate.isBefore(today, "day"); // Tasks that are before today
  });
  console.log("todayTasks", todayTasks);
  console.log("upcomingTasks", upcomingTasks);
  console.log("expiredTasks", expiredTasks);

  return (
    <div className="w-full max-w-3xl mx-auto p-8 bg-white rounded-xl mt-10">
      {/* Greeting Section */}
      <Header
        selectedPriority={selectedPriority}
        setSelectedPriority={setSelectedPriority}
      />

      {/* Task List for Today */}
      {filteredTasks?.length > 0 && (
        <div className="bg-base-100 collapse collapse-arrow collapse-open">
          <input type="checkbox" className="peer" />
          <div className="collapse-title bg-gray-50 peer-checked:bg-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <FcCalendar size={20} />
                <span className="text-lg font-semibold text-gray-700">
                  Today
                </span>
                <span className="bg-gray-200 text-gray-800 text-sm font-medium px-2 mx-3 py-1 rounded">
                  {filteredTasks?.length}
                </span>
              </div>
            </div>
          </div>

          <div className="collapse-content bg-gray-100 peer-checked:bg-gray-100">
            {/* Task Items for Today */}
            <div className="space-y-4 mt-4">
              {filteredTasks?.map((task) =>
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
                      <button
                        onClick={handleEditSave}
                        className="text-green-500"
                      >
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
                    <div className="flex items-center space-x-2 ">
                      {/* Edit Icon (Visible on Hover) */}
                      <FaRegEdit
                        size={20}
                        className=" opacity-0 group-hover:opacity-100 text-gray-800 hover:text-gray-600 cursor-pointer"
                        onClick={() => handleEditToggle(task)}
                      />
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

                      <span
                        className={`${
                          task.priority == "high" && "bg-red-100 text-red-600"
                        } ${
                          task.priority == "medium" &&
                          "bg-yellow-100 text-yellow-600"
                        } ${
                          task.priority == "low" &&
                          "bg-green-100 text-green-600"
                        } text-sm font-semibold px-2 py-1 rounded cursor-pointer`}
                      >
                        {task.priority}
                      </span>
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
          </div>
        </div>
      )}

      {/* Task List for Upcoming Tasks */}
      {/* {upcomingTasks?.length > 0 && (
        <UpcomingTask upcomingTasks={upcomingTasks} />
      )} */}

      {/* Task List for Expired Tasks */}
      {/* {expiredTasks?.length > 0 && <ExpireTask expiredTasks={expiredTasks} />} */}

      {/* Add New Task */}
      {!isFormOpen ? (
        <ToggleFormButton
          isFormOpen={isFormOpen}
          setIsFormOpen={setIsFormOpen}
        />
      ) : (
        <>
          <InsertTodoForm
            isFormOpen={isFormOpen}
            setIsFormOpen={setIsFormOpen}
          />
        </>
      )}
    </div>
  );
};

const ToggleFormButton = ({ isFormOpen, setIsFormOpen }) => {
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
          <span className="text-sm font-semibold">New Task</span>
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

// Header Component
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

export default TaskList;
