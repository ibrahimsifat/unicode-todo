const taskService = require("../../../../lib/task");
const { badRequest } = require("../../../../lib/utils/error");

/**
 * Update an existing task.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {void}
 */
const edit = async (req, res, next) => {
  try {
    const taskId = req.params.id;
    const updates = req.body;
    const userId = req.user.id;
    const updatedTask = await taskService.updateTask(taskId, updates, userId);
    req.io.emit("taskUpdated", updatedTask); // Emit task update event
    res
      .status(200)
      .json({ message: "Task updated successfully", data: updatedTask });
  } catch (error) {
    next(error);
  }
};
module.exports = edit;
