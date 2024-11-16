"use client";

import DashboardSkeleton from "@/components/DashboardSkeleton";
import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import TaskList from "./components/TaskList";
import UsePage from "./UsePage";

export default function Dashboard() {
  const {
    isFormOpen,
    setIsFormOpen,
    tasksData,
    handleLogout,
    handlePageChange,
    handlePageSizeChange,
    page,
    pageSize,
    isLoading,
  } = UsePage();
  console.log("tasksData,", tasksData);
  if (isLoading) return <DashboardSkeleton />;

  return (
    <ProtectedRoute>
      <Navbar handleLogout={tasksData ? handleLogout : null} />
      <div className="flex flex-col space-y-6">
        <TaskList isFormOpen={isFormOpen} setIsFormOpen={setIsFormOpen} />
      </div>
    </ProtectedRoute>
  );
}
