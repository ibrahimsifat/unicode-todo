const assignmentService = require("../../../../lib/assignment");

/**
 * Create a new assignment.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {void}
 */

const destroy = async (req, res, next) => {
  const { task_id, user_id } = req.query;

  try {
    await assignmentService.deleteAssignment(task_id, user_id, req.io);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = destroy;
