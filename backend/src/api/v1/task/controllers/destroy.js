const taskService = require("../../../../lib/task");
const { badRequest } = require("../../../../lib/utils/error");

/**
 * Delete a task.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {void}
 */
const destroy = async (req, res, next) => {
  try {
    const taskId = req.params.id;
    const userId = req.user.id;

    await taskService.deleteTask(taskId, userId);
    req.io.emit("taskDeleted", taskId); // Emit task deletion event
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = destroy;
