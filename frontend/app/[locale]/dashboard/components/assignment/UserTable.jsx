import { useTranslations } from "next-intl";
import { IoPersonAddOutline, IoPersonRemoveOutline } from "react-icons/io5";

const UserTable = ({
  assignedUsers,
  unassignedUsers,
  handleAddUser,
  handleRemoveUser,
}) => {
  console.log(assignedUsers);
  const t = useTranslations("dashboard");
  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>{t("photo")}</th>
            <th>{t("name")}</th>
            <th>{t("email")}</th>
            <th>{t("action")}</th>
          </tr>
        </thead>
        <tbody>
          {/* Assigned Users */}
          {assignedUsers?.map((user) => (
            <tr key={user._id}>
              <td className="avatar">
                <div className="mask mask-squircle h-12 w-12">
                  <img src={user?.avatar} alt="Avatar Tailwind CSS Component" />
                </div>
              </td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button
                  className="btn bg-red-500 space-x-2 px-3 py-2 text-white hover:bg-red-700"
                  onClick={() => handleRemoveUser(user._id)}
                >
                  <IoPersonRemoveOutline />
                  <span>{t("remove")}</span>
                </button>
              </td>
            </tr>
          ))}

          {/* Unassigned Users */}
          {unassignedUsers?.map((user) => (
            <tr key={user._id}>
              <td className="avatar">
                <div className="mask mask-squircle h-12 w-12">
                  <img
                    src={user.user?.avatar}
                    alt="Avatar Tailwind CSS Component"
                  />
                </div>
              </td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button
                  className="btn bg-green-500 space-x-2 px-3 py-2 text-white hover:bg-green-700"
                  onClick={() => handleAddUser(user._id)}
                >
                  <IoPersonAddOutline />
                  <span>{t("add")}</span>
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
