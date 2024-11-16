import {
  useAddAssignmentMutation,
  useDeleteAssignmentMutation,
} from "@/features/assignment/assignmentsApi";
import socket from "@/features/socket";
import { useGetTaskQuery, useGetTasksQuery } from "@/features/task/tasksApi";
import { useGetUsersQuery } from "@/features/user/usersApi";
import { useEffect } from "react";
import { IoPersonAddOutline } from "react-icons/io5";

import { IoPersonRemoveOutline } from "react-icons/io5";
import { useSelector } from "react-redux";

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

  console.log("assignedUserIds", assignedUserIds);
  console.log("assignedUser", assignedUsers);

  const unassignedUsers = users?.filter(
    (user) => !assignedUserIds?.includes(user._id)
  );
  console.log("unassignedUser", unassignedUsers);
  console.log(
    "unassignedUsers",
    unassignedUsers,
    "assignedUsers",
    assignedUsers,
    taskData
  );

  // console.log(assignedUserIds);
  // console.log("assignedUsers", assignedUsers);
  // console.log("unassignedUsers", unassignedUsers);

  const handleAddUser = async (userId) => {
    const assignment = {
      task_id: taskId,
      user_id: userId,
      role: "assignee",
    };
    await addAssignment(assignment).unwrap();
    await taskRefetch();
  };

  const handleRemoveUser = async (userId) => {
    const assignment = {
      task_id: taskId,
      user_id: userId,
    };
    await deleteAssignment(assignment).unwrap();
    await refetch();
    await taskRefetch();
  };

  // Loading and error handling
  if (usersLoading || taskLoading) return <div>Loading...</div>;
  if (usersError || taskError) return <div>Error...</div>;

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

// UserTable Component
const UserTable = ({
  assignedUsers,
  unassignedUsers,
  handleAddUser,
  handleRemoveUser,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {/* Assigned Users */}
          {assignedUsers?.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button
                  className="btn bg-red-500 space-x-2 px-3 py-2 text-white hover:bg-red-700"
                  onClick={() => handleRemoveUser(user._id)}
                >
                  <IoPersonRemoveOutline />
                  <span>Remove</span>
                </button>
              </td>
            </tr>
          ))}

          {/* Unassigned Users */}
          {unassignedUsers?.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button
                  className="btn bg-green-500 space-x-2 px-3 py-2 text-white hover:bg-green-700"
                  onClick={() => handleAddUser(user._id)}
                >
                  <IoPersonAddOutline />
                  <span>Add</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
