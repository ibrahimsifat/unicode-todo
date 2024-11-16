// hooks/useDashboard.js
import { useGetTasksQuery } from "@/features/task/tasksApi";
import { logout } from "@/features/user/userSlice";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const UsePage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const page = useSelector((state) => state.pagination.page);
  const pageSize = useSelector((state) => state.pagination.pageSize);
  const priority = useSelector((state) => state.pagination.priority);
  const dispatch = useDispatch();
  const router = useRouter();
  const handleLogout = async () => {
    await signOut({ redirect: false });
    // Dispatch logout action to reset user state in Redux
    dispatch(logout());
    router.push("/");
  };
  const query = {
    page,
    pageSize,
    priority,
    todaytask: true,
  };

  const { data: tasks, error, isLoading } = useGetTasksQuery({ ...query });

  // const tasksData = tasks?.data;
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

  if (error) {
    return <div>Error fetching tasks: {error}</div>;
  }

  return {
    isFormOpen,
    setIsFormOpen,
    tasksData,
    handleLogout,
    setIsFormOpen,
    tasksData,
    handleLogout,
    page,
    pageSize,
    isLoading,
  };
};

export default UsePage;
