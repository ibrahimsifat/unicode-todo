"use client";

import DashboardSkeleton from "@/components/DashboardSkeleton";
import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import Pagination from "./components/Pagination";
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
