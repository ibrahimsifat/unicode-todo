"use client";
import {
  useDeleteTaskMutation,
  useGetTasksQuery,
  useToggleStatusMutation,
  useUpdateTaskMutation,
} from "@/features/task/tasksApi";
import dayjs from "dayjs";
import { useMemo, useState } from "react";
import { FcCalendar } from "react-icons/fc";
import { useSelector } from "react-redux";
import Header from "./Header";
import InsertTodoForm from "./InsertTodoForm";
import TaskItems from "./TaskItems";
import ToggleFormButton from "./ToggleFormButton";

const TaskList = ({ tasks, isFormOpen, setIsFormOpen }) => {
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("all");
  const page = useSelector((state) => state.pagination.page);
  const pageSize = useSelector((state) => state.pagination.pageSize);

  const { refetch, isLoading, isError } = useGetTasksQuery({ page, pageSize });
  const [toggleStatus] = useToggleStatusMutation();
  const [deleteTask] = useDeleteTaskMutation();
  const [updateTask] = useUpdateTaskMutation();

  // Handle task status toggle
  const handleStatusChange = async (e, taskId) => {
    const newStatus = e.target.checked ? "completed" : "pending";
    await toggleStatus({ id: taskId, status: newStatus });
    await refetch();
  };

  // Handle task deletion
  const handleDelete = async (taskId) => {
    try {
      await deleteTask(taskId);
      await refetch();
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  // Toggle task editing
  const handleEditToggle = (task) => {
    setEditTaskId((prevId) => (prevId === task._id ? null : task._id));
    setEditTitle(task._id === editTaskId ? "" : task.title);
  };

  // Save edited task title
  const handleEditSave = async () => {
    try {
      await updateTask({ id: editTaskId, data: { title: editTitle } });
      setEditTaskId(null);
      await refetch();
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  const today = dayjs().startOf("day");

  // Memoized filters to avoid unnecessary re-renders
  const filteredTasks = useMemo(() => {
    return selectedPriority === "all"
      ? tasks
      : tasks.filter((task) => task.priority === selectedPriority);
  }, [tasks, selectedPriority]);

  const todayTasks = useMemo(
    () =>
      tasks?.filter((task) => {
        const taskDate = task.duedate
          ? dayjs(task.duedate).startOf("day")
          : null;
        return taskDate && taskDate.isSame(today, "day");
      }),
    [tasks, today]
  );

  const upcomingTasks = useMemo(
    () =>
      tasks?.filter((task) => {
        const taskDate = task.duedate
          ? dayjs(task.duedate).startOf("day")
          : null;
        return taskDate && !taskDate.isSame(today, "day");
      }),
    [tasks, today]
  );

  const expiredTasks = useMemo(
    () =>
      tasks?.filter((task) => {
        const taskDate = task.duedate
          ? dayjs(task.duedate).startOf("day")
          : null;
        return taskDate && taskDate.isBefore(today, "day");
      }),
    [tasks, today]
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading tasks.</div>;

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
                  {filteredTasks.length}
                </span>
              </div>
            </div>
          </div>

          <div className="collapse-content bg-gray-100 peer-checked:bg-gray-100">
            <TaskItems
              handleEditToggle={handleEditToggle}
              tasks={filteredTasks}
              editTaskId={editTaskId}
              editTitle={editTitle}
              setEditTitle={setEditTitle}
              handleEditSave={handleEditSave}
              handleDelete={handleDelete}
              handleStatusChange={handleStatusChange}
              filteredTasks={filteredTasks}
            />
          </div>
        </div>
      )}

      {/* New Task Form Toggle */}
      {!isFormOpen ? (
        <ToggleFormButton
          isFormOpen={isFormOpen}
          setIsFormOpen={setIsFormOpen}
        />
      ) : (
        <InsertTodoForm isFormOpen={isFormOpen} setIsFormOpen={setIsFormOpen} />
      )}
    </div>
  );
};

export default TaskList;
