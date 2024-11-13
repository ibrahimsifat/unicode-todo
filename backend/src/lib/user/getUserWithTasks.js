const { notFound } = require("../utils/error");
const { User, Task, Assignment } = require("../../models");

const getUserWithTasks = async (userId) => {
  try {
    const user = await User.findById(userId)
      .select("name email avatar createdAt updatedAt")
      .populate({
        path: "tasks",
        model: "Task",
        match: { user_id: userId },
      })
      .populate({
        path: "assignedTasks",
        model: "Assignment",
        match: { user_id: userId },
        populate: {
          path: "task_id",
          model: "Task",
          select: "title duedate status priority",
        },
      });

    if (!user) {
      throw notFound("User not found");
    }

    const assignedTasks = await Promise.all(
      user.assignedTasks.map(async (assignment) => ({
        id: assignment._id,
        task: assignment.task_id,
        role: assignment.role,
        createdAt: assignment.createdAt,
        updatedAt: assignment.updatedAt,
      })),
    );

    return {
      id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      tasks: user.tasks,
      assignedTasks,
    };
  } catch (error) {
    throw error;
  }
};

module.exports = getUserWithTasks;
