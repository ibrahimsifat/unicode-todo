import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { IoPersonAddOutline, IoPersonRemoveOutline } from "react-icons/io5";

const UserTable = ({
  assignedUsers,
  unassignedUsers,
  handleAddUser,
  handleRemoveUser,
}) => {
  console.log(assignedUsers, unassignedUsers);
  const t = useTranslations("dashboard");

  // Motion variants for smoother row transitions
  const rowVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  return (
    <div className="overflow-x-auto my-4">
      <p className="text-center lg:text-xl text-lg font-bold mb-2">
        {t("assign_users")}
      </p>
      <table className="table">
        <thead>
          <tr>
            <th>{t("photo")}</th>
            <th>{t("name")}</th>
            <th className="flex justify-center">{t("action")}</th>
          </tr>
        </thead>
        <tbody>
          {/* Assigned Users */}
          {assignedUsers?.map((user) => (
            <motion.tr
              key={user._id}
              variants={rowVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <td className="avatar">
                <div className="mask mask-squircle h-12 w-12">
                  <img src={user?.avatar} alt="Avatar" />
                </div>
              </td>
              <td>{user.name}</td>
              <td className="flex justify-end">
                <button
                  className="btn bg-red-500 space-x-2 px-3 py-2 text-white hover:bg-red-700"
                  onClick={() => handleRemoveUser(user._id)}
                >
                  <IoPersonRemoveOutline />
                  <span>{t("remove")}</span>
                </button>
              </td>
            </motion.tr>
          ))}

          {/* Unassigned Users */}
          {unassignedUsers?.map((user) => (
            <motion.tr
              key={user._id}
              variants={rowVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <td className="avatar">
                <div className="mask mask-squircle h-12 w-12">
                  <img src={user?.avatar} alt="Avatar" />
                </div>
              </td>
              <td>{user.name}</td>

              <td className="flex justify-end">
                <button
                  className="btn bg-green-500 space-x-2 px-3 py-2 text-white hover:bg-green-700"
                  onClick={() => handleAddUser(user._id)}
                >
                  <IoPersonAddOutline />
                  <span>{t("add")}</span>
                </button>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
