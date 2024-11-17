import {
  useAddAssignmentMutation,
  useDeleteAssignmentMutation,
} from "@/features/assignment/assignmentsApi";
import socket from "@/features/socket";
import { useGetTaskQuery, useGetTasksQuery } from "@/features/task/tasksApi";
import { useGetUsersQuery } from "@/features/user/usersApi";
import { useEffect } from "react";

import LoadingSpinner from "@/components/LoadingSpinner";
import { useSelector } from "react-redux";
import UserTable from "./UserTable";

const AssignmentModal = ({ isOpen, onClose, taskId, loginUser }) => {
  const page = useSelector((state) => state.pagination.page);
  const pageSize = useSelector((state) => state.pagination.pageSize);
  const priority = useSelector((state) => state.pagination.priority);
  const {
    data: taskData,
    isLoading: taskLoading,
    error: taskError,
    refetch,
  } = useGetTaskQuery(taskId);
  const task = taskData?.task;
  const [
    addAssignment,
    { isLoading: addAssignmentLoading, error: addAssignmentError },
  ] = useAddAssignmentMutation();
  const [deleteAssignment] = useDeleteAssignmentMutation();

  const todayQuery = {
    page,
    pageSize,
    priority,
    todaytask: true,
  };
  const { refetch: taskRefetch } = useGetTasksQuery({ ...todayQuery });
  const { refetch: taskRefetchRemaining } = useGetTasksQuery({
    ...todayQuery,
    todaytask: false,
  });

  const {
    data: userData,
    isLoading: usersLoading,
    error: usersError,
  } = useGetUsersQuery();

  //listener in  component to react to the assignmentAdded event.
  useEffect(() => {
    const handleAssignmentAdded = (assignment) => {
      if (assignment.task_id === task?._id) {
        refetch();
      }
    };

    socket.on("assignmentAdded", handleAssignmentAdded);

    return () => {
      socket.off("assignmentAdded", handleAssignmentAdded);
    };
  }, [task, refetch]);

  const loginUserId = loginUser?.id;

  // Filter out the login user from the user list
  const users = userData?.data?.users?.filter(
    (user) => user._id !== loginUserId
  );
  // console.log("users", users);
  // Extract assigned user IDs from the task's assignments
  const assignedUserIds = taskData?.assignments?.map(
    (assignment) => assignment.user_id
  );

  // Filter assigned and unassigned users
  const assignedUsers = users?.filter((user) =>
    assignedUserIds?.includes(user._id)
  );

  const unassignedUsers = users?.filter(
    (user) => !assignedUserIds?.includes(user._id)
  );

  const handleAddUser = async (userId) => {
    const assignment = {
      task_id: taskId,
      user_id: userId,
      role: "assignee",
    };
    await addAssignment(assignment).unwrap();
    await taskRefetch();
    await taskRefetchRemaining();
  };

  const handleRemoveUser = async (userId) => {
    const assignment = {
      task_id: taskId,
      user_id: userId,
    };
    await deleteAssignment(assignment).unwrap();
    await refetch();
    await taskRefetch();
    await taskRefetchRemaining();
  };

  // Loading and error handling
  if (usersLoading || taskLoading) return <LoadingSpinner />;
  // if (usersError || taskError) return <div>Error...</div>;

  return (
    <dialog id="my_modal_3" className={`modal ${isOpen ? "modal-open" : ""}`}>
      <div className="modal-box">
        <form method="dialog">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 bg-red-300"
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
