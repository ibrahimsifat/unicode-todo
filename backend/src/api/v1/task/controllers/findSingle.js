const taskService = require("../../../../lib/task");

/**
 * Get a specific task by ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {void}
 */
const findSingle = async (req, res, next) => {
  try {
    const task = await taskService.getTaskById(req.params.id);
    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};
module.exports = findSingle;
