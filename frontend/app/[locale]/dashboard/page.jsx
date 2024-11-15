"use client";
import DashboardSkeleton from "@/components/DashboardSkeleton";
import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import { setPage, setPageSize } from "@/features/pagination/paginationSlice";
import { useGetTasksQuery } from "@/features/task/tasksApi";
import { logout } from "@/features/user/userSlice";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "./components/Pagination"; // New Pagination component
import TaskList from "./components/TaskList";

export default function Dashboard() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const page = useSelector((state) => state.pagination.page);
  const pageSize = useSelector((state) => state.pagination.pageSize);
  const dispatch = useDispatch();
  const router = useRouter();
  const handleLogout = async () => {
    await signOut({ redirect: false });
    // Dispatch logout action to reset user state in Redux
    dispatch(logout());

    router.push("/");
  };
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
  if (error) return handleLogout();

  return (
    <ProtectedRoute>
      <Navbar handleLogout={tasksData ? handleLogout : null} />
      <div className="flex flex-col space-y-6">
        {/* <LogoutButton handleLogout={handleLogout} /> */}
        {/* <button onClick={handleLogout}>Logout</button> */}
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
