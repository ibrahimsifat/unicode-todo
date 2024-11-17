import LoadingSpinner from "@/components/LoadingSpinner";
import {
  useAddAssignmentMutation,
  useDeleteAssignmentMutation,
} from "@/features/assignment/assignmentsApi";
import socket from "@/features/socket";
import { useGetTaskQuery, useGetTasksQuery } from "@/features/task/tasksApi";
import { useGetUsersQuery } from "@/features/user/usersApi";
import { useCallback, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import UserTable from "./UserTable";

const AssignmentModal = ({ isOpen, onClose, taskId, loginUser }) => {
  const page = useSelector((state) => state.pagination.page);
  const pageSize = useSelector((state) => state.pagination.pageSize);
  const priority = useSelector((state) => state.pagination.priority);

  const {
    data: taskData,
    isLoading: taskLoading,
    refetch: taskRefetch,
  } = useGetTaskQuery(taskId);
  const { data: userData, isLoading: usersLoading } = useGetUsersQuery();

  const [addAssignment] = useAddAssignmentMutation();
  const [deleteAssignment] = useDeleteAssignmentMutation();

  const todayQuery = { page, pageSize, priority, todaytask: true };
  const { refetch: taskRefetchToday } = useGetTasksQuery(todayQuery);
  const { refetch: taskRefetchRemaining } = useGetTasksQuery({
    ...todayQuery,
    todaytask: false,
  });

  // Handle socket events only if the modal is open
  useEffect(() => {
    if (!isOpen) return;

    const handleAssignmentAdded = (assignment) => {
      if (assignment.task_id === taskData?.task?._id) {
        taskRefetch();
      }
    };

    socket.on("assignmentAdded", handleAssignmentAdded);
    return () => {
      socket.off("assignmentAdded", handleAssignmentAdded);
    };
  }, [isOpen, taskData, taskRefetch]);

  // Memoize the users list and filter out the login user
  const users = useMemo(() => {
    return userData?.data?.users?.filter((user) => user._id !== loginUser?.id);
  }, [userData, loginUser]);

  const assignedUserIds = useMemo(
    () => taskData?.assignments?.map((assignment) => assignment.user_id),
    [taskData]
  );

  // Memoize assigned and unassigned users to avoid recalculating on every render
  const assignedUsers = useMemo(
    () => users?.filter((user) => assignedUserIds?.includes(user._id)),
    [users, assignedUserIds]
  );
  const unassignedUsers = useMemo(
    () => users?.filter((user) => !assignedUserIds?.includes(user._id)),
    [users, assignedUserIds]
  );

  // useCallback ensures handleAddUser doesn't get recreated on each render
  const handleAddUser = useCallback(
    async (userId) => {
      const assignment = { task_id: taskId, user_id: userId, role: "assignee" };
      await addAssignment(assignment).unwrap();
      taskRefetchToday();
      taskRefetchRemaining();
    },
    [addAssignment, taskId, taskRefetchToday, taskRefetchRemaining]
  );

  const handleRemoveUser = useCallback(
    async (userId) => {
      const assignment = { task_id: taskId, user_id: userId };
      await deleteAssignment(assignment).unwrap();
      taskRefetch();
      taskRefetchToday();
      taskRefetchRemaining();
    },
    [
      deleteAssignment,
      taskId,
      taskRefetch,
      taskRefetchToday,
      taskRefetchRemaining,
    ]
  );

  // Loading and error handling
  if (usersLoading || taskLoading) return <LoadingSpinner />;

  return (
    <dialog id="my_modal_3" className={`modal ${isOpen ? "modal-open" : ""}`}>
      <div className="modal-box">
        <form method="dialog">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 bg-red-400"
            onClick={onClose}
          >
            ✕
          </button>
        </form>
        <UserTable
          assignedUsers={assignedUsers}
          unassignedUsers={unassignedUsers}
          handleAddUser={handleAddUser}
          handleRemoveUser={handleRemoveUser}
        />
      </div>
    </dialog>
  );
};

export default AssignmentModal;
