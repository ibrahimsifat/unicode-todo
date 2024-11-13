const userServices = require("../../../../lib/user");
const { User } = require("../../../../models");
const userSelf = async (req, res, next) => {
  const userId = req.user.id?.toString();
  // console.log(userId);

  try {
    const getUserWithTasks = async (userId) => {
      try {
        const user = await User.findById(userId)
          .select("name email avatar createdAt updatedAt")
          .populate([
            {
              path: "tasks",
              model: "Task",
              select: "title duedate status priority user_id",
              populate: {
                path: "user_id",
                model: "User",
                select: "name email",
              },
            },
            {
              path: "assignedTasks",
              model: "Assignment",
              select: "role createdAt updatedAt",
              populate: [
                {
                  path: "task_id",
                  model: "Task",
                  select: "title duedate status priority user_id",
                  populate: {
                    path: "user_id",
                    model: "User",
                    select: "name email",
                  },
                },
                {
                  path: "user_id",
                  model: "User",
                  select: "name email",
                },
              ],
            },
          ]);
        console.log(user);

        if (!user) {
          throw notFound("User not found");
        }

        return user;
      } catch (error) {
        throw error;
      }
    };

    const userData = await getUserWithTasks(userId);
    return res.status(200).json({
      message: "User data fetched successfully",
      data: userData,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = userSelf;
