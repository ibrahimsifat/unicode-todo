"use client";
import {
  setPage,
  setPageSize,
  setRemainingTaskPage,
  setRemainingTaskPageSize,
} from "@/features/pagination/paginationSlice";
import {
  useDeleteTaskMutation,
  useGetTasksQuery,
  useToggleStatusMutation,
  useUpdateTaskMutation,
} from "@/features/task/tasksApi";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { FcCalendar } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import Header from "./Header";
import InsertTodoForm from "./InsertTodoForm";
import Pagination from "./Pagination";
import TaskItems from "./TaskItems";
import TaskNotFound from "./TaskNotFound";
import ToggleFormButton from "./ToggleFormButton";

const TaskList = ({ isFormOpen, setIsFormOpen }) => {
  const t = useTranslations("dashboard");
  const dispatch = useDispatch();
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const page = useSelector((state) => state.pagination.page);
  const pageSize = useSelector((state) => state.pagination.pageSize);
  const remainingTaskPage = useSelector(
    (state) => state.pagination.remainingTaskPage
  );
  const remainingTaskPageSize = useSelector(
    (state) => state.pagination.remainingTaskPageSize
  );
  const priority = useSelector((state) => state.pagination.priority);

  const todayQuery = {
    page,
    pageSize,
    priority,
    todaytask: true,
  };
  const {
    data: todayData,
    refetch: todayRefetch,
    isLoading: todayIsLoading,
    isError: todayIsError,
  } = useGetTasksQuery({ ...todayQuery });

  const query = {
    page: remainingTaskPage,
    pageSize: remainingTaskPageSize,
    priority,
    todaytask: false,
  };
  const { data, refetch, isLoading, isError } = useGetTasksQuery({ ...query });

  const remainingTask = data?.data.tasks;
  const remainingTotalPages = data?.data.totalPages;

  // Today task
  const todayTask = todayData?.data.tasks;
  const todayTotalPages = todayData?.data.totalPages;
  const [toggleStatus] = useToggleStatusMutation();
  const [deleteTask] = useDeleteTaskMutation();
  const [updateTask] = useUpdateTaskMutation();

  // Handle task status toggle
  const handleStatusChange = async (e, taskId) => {
    const newStatus = e.target.checked ? "completed" : "pending";
    await toggleStatus({ id: taskId, status: newStatus });
    await refetch();
    await todayRefetch();
  };

  // Handle task deletion
  const handleDelete = async (taskId) => {
    try {
      await deleteTask(taskId);
      await todayRefetch();
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
      await todayRefetch();
      await refetch();
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };
  // Handle page change for today's tasks
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= todayTotalPages) {
      dispatch(setPage(newPage));
    }
  };

  const handlePageSizeChange = (size) => {
    dispatch(setPageSize(size)); // Update page size in Redux store
    dispatch(setPage(1)); // Reset to page 1 when the page size changes
  };

  // Handle page change for remaining tasks
  const handleRemainingPageChange = (newPage) => {
    if (newPage > 0 && newPage <= remainingTotalPages) {
      dispatch(setRemainingTaskPage(newPage));
    }
  };

  // Handle page size change for remaining tasks
  const handleRemainingPageSizeChange = (size) => {
    dispatch(setRemainingTaskPageSize(size));
    dispatch(setRemainingTaskPage(1));
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div className="text-red-500">Error loading tasks.</div>;

  return (
    <div className="w-full max-w-3xl mx-auto p-8 bg-white rounded-xl mt-10">
      {/* Greeting Section */}
      <Header />

      {/* Task List for Today */}
      {todayTask?.length > 0 ? (
        <TodayTask
          tasks={todayTask}
          page={page}
          totalPages={todayTotalPages}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          pageSize={pageSize}
          handleEditToggle={handleEditToggle}
          editTaskId={editTaskId}
          editTitle={editTitle}
          setEditTitle={setEditTitle}
          handleEditSave={handleEditSave}
          handleDelete={handleDelete}
          handleStatusChange={handleStatusChange}
          handlePageChange={handlePageChange}
          handlePageSizeChange={handlePageSizeChange}
        />
      ) : (
        <TaskNotFound headerTitle={t("today")} taskLength={todayTask?.length} />
      )}

      {/* remaining tasklist */}
      {remainingTask?.length > 0 && (
        <div className="bg-base-100 collapse collapse-arrow my-6">
          <input type="checkbox" className="peer" />
          <div className="collapse-title bg-gray-50 peer-checked:bg-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <FcCalendar size={20} />
                <span className="text-lg font-semibold text-gray-700">
                  {t("remaining")}
                </span>
                <span className="bg-gray-200 text-gray-800 text-sm font-medium px-2 mx-3 py-1 rounded">
                  {remainingTask?.length}
                </span>
              </div>
            </div>
          </div>

          <div className="collapse-content bg-gray-100 peer-checked:bg-gray-100">
            <TaskItems
              handleEditToggle={handleEditToggle}
              tasks={remainingTask}
              editTaskId={editTaskId}
              editTitle={editTitle}
              setEditTitle={setEditTitle}
              handleEditSave={handleEditSave}
              handleDelete={handleDelete}
              handleStatusChange={handleStatusChange}
            />
            <Pagination
              page={remainingTaskPage}
              totalPages={remainingTotalPages}
              onPageChange={handleRemainingPageChange}
              onPageSizeChange={handleRemainingPageSizeChange}
              pageSize={remainingTaskPageSize}
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

const TodayTask = ({
  tasks,
  page,
  totalPages,
  pageSize,
  handleEditToggle,
  editTaskId,
  editTitle,
  setEditTitle,
  handleEditSave,
  handleDelete,
  handleStatusChange,
  handlePageChange,
  handlePageSizeChange,
}) => {

  const t = useTranslations("dashboard");
  return (
    <div className="bg-base-100 collapse collapse-arrow collapse-open">
      <input type="checkbox" className="peer" />
      <div className="collapse-title bg-gray-50 peer-checked:bg-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <FcCalendar size={20} />
            <span className="text-lg font-semibold text-gray-700">
              {t("today")}
            </span>
            <span className="bg-gray-200 text-gray-800 text-sm font-medium px-2 mx-3 py-1 rounded">
              {tasks?.length}
            </span>
          </div>
        </div>
      </div>

      <div className="collapse-content bg-gray-100 peer-checked:bg-gray-100">
        <TaskItems
          handleEditToggle={handleEditToggle}
          tasks={tasks}
          editTaskId={editTaskId}
          editTitle={editTitle}
          setEditTitle={setEditTitle}
          handleEditSave={handleEditSave}
          handleDelete={handleDelete}
          handleStatusChange={handleStatusChange}
        />
        {tasks.length && (
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
            pageSize={pageSize}
          />
        )}
      </div>
    </div>
  );
};

const RemainingTask = ({
  remainingTask,
  remainingTaskPage,
  remainingTotalPages,
  remainingTaskPageSize,
  handleEditToggle,
  editTaskId,
  editTitle,
  setEditTitle,
  handleEditSave,
  handleDelete,
  handleStatusChange,
  handleRemainingPageChange,
  handleRemainingPageSizeChange,
}) => {
  <div className="bg-base-100 collapse collapse-arrow my-6">
    <input type="checkbox" className="peer" />
    <div className="collapse-title bg-gray-50 peer-checked:bg-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <FcCalendar size={20} />
          <span className="text-lg font-semibold text-gray-700">
            {t("remaining")}
          </span>
          <span className="bg-gray-200 text-gray-800 text-sm font-medium px-2 mx-3 py-1 rounded">
            {remainingTask?.length}
          </span>
        </div>
      </div>
    </div>

    <div className="collapse-content bg-gray-100 peer-checked:bg-gray-100">
      <TaskItems
        handleEditToggle={handleEditToggle}
        tasks={remainingTask}
        editTaskId={editTaskId}
        editTitle={editTitle}
        setEditTitle={setEditTitle}
        handleEditSave={handleEditSave}
        handleDelete={handleDelete}
        handleStatusChange={handleStatusChange}
      />
      <Pagination
        page={remainingTaskPage}
        totalPages={remainingTotalPages}
        onPageChange={handleRemainingPageChange}
        onPageSizeChange={handleRemainingPageSizeChange}
        pageSize={remainingTaskPageSize}
      />
    </div>
  </div>;
};
