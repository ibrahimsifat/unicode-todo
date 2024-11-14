"use client";
import DashboardSkeleton from "@/components/DashboardSkeleton";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useGetTasksQuery } from "@/features/task/tasksApi";
import { setPage, setPageSize } from "@/redux/slices/paginationSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TaskList from "./components/TaskList"; // Assuming TaskList is separated

export default function Dashboard() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const page = useSelector((state) => state.pagination.page);
  const pageSize = useSelector((state) => state.pagination.pageSize);
  const dispatch = useDispatch();

  const {
    data: tasks,
    error,
    isLoading,
  } = useGetTasksQuery({ page, pageSize });

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.ctrlKey && event.key === "f") {
        event.preventDefault();
        setIsFormOpen((prevState) => !prevState);
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

 const handlePageChange = (newPage) => {
   if (newPage > 0 && newPage <= tasksData?.totalPages) {
     dispatch(setPage(newPage));
   }
 };

 const handlePageSizeChange = (size) => {
   dispatch(setPageSize(size));
   dispatch(setPage(1)); // Reset to page 1 when page size changes
 };


  if (isLoading) return <DashboardSkeleton />;
  if (error) return <p>Error loading tasks.</p>;

  const tasksData = tasks?.data;

  return (
    <ProtectedRoute>
      {tasksData && (
        <TaskList
          tasks={tasksData?.tasks}
          isFormOpen={isFormOpen}
          setIsFormOpen={setIsFormOpen}
        />
      )}
      <div className="flex flex-col items-center space-y-6 py-6 bg-gray-50 rounded-xl max-w-2xl p-8 mx-auto">
        <div className="flex items-center space-x-6">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className={`px-5 py-1 rounded-full shadow-sm text-sm font-semibold transition-all duration-200 ${
              page === 1
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-gray-200 text-gray-900 hover:bg-gray-400"
            }`}
          >
            Previous
          </button>

          <span className="text-sm font-medium text-gray-800">
            Page {page} of {tasksData?.totalPages}
          </span>

          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === tasksData?.totalPages}
            className={`px-5 py-1 rounded-full shadow-sm text-sm font-semibold transition-all duration-200 ${
              page === tasksData?.totalPages
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-gray-200 text-gray-900 hover:bg-gray-400"
            }`}
          >
            Next
          </button>
        </div>

        <div className="flex items-center space-x-3">
          <label className="text-gray-800 text-sm font-semibold">
            Page Size:
          </label>
          <select
            value={pageSize}
            onChange={(e) => handlePageSizeChange(Number(e.target.value))}
            className="px-3 py-1 rounded-full bg-gray-300 border border-gray-700 text-gray-700 text-sm font-medium focus:outline-none"
          >
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
          </select>
        </div>
      </div>
    </ProtectedRoute>
  );
}
