"use client";
import DashboardSkeleton from "@/components/DashboardSkeleton";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useGetTasksQuery } from "@/features/task/tasksApi";
import { setPage, setPageSize } from "@/redux/slices/paginationSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "./components/Pagination"; // New Pagination component
import TaskList from "./components/TaskList";

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

  const tasksData = tasks?.data;
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= tasksData?.totalPages) {
      dispatch(setPage(newPage));
    }
  };
  const handlePageSizeChange = (size) => {
    dispatch(setPageSize(size)); // Update page size in Redux store
    dispatch(setPage(1)); // Reset to page 1 when the page size changes
  };

  if (isLoading) return <DashboardSkeleton />;
  if (error) return <p className="text-red-600">Error loading tasks.</p>;

  console.log("Tasks Data:", tasksData); // Debugging: Log tasks data

  return (
    <ProtectedRoute>
      <div className="flex flex-col space-y-6">
        {tasksData && (
          <TaskList
            tasks={tasksData?.tasks}
            isFormOpen={isFormOpen}
            setIsFormOpen={setIsFormOpen}
          />
        )}

        {tasksData && (
          <Pagination
            page={page}
            totalPages={tasksData?.totalPages}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
            pageSize={pageSize}
          />
        )}
      </div>
    </ProtectedRoute>
  );
}
