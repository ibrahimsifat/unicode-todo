const taskService = require("../../../../lib/task");
/**
 * Get tasks for a specific user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {void}
 */
const findUsersTasks = async (req, res, next) => {
  const { page, pageSize, priority, todaytask } = req.query;
  const filteredPriority = priority === "all" ? null : priority;

  try {
    const tasks = await taskService.getTasksByUser(
      req.user.id,
      page,
      pageSize,
      filteredPriority,
      todaytask,
    );
    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

module.exports = findUsersTasks;
