import { IoPersonAddOutline, IoPersonRemoveOutline } from "react-icons/io5";

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

export default UserTable;
