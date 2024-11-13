const assignmentService = require("../../../../lib/assignment");

/**
 * Create a new assignment.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {void}
 */

const find = async (req, res, next) => {
  try {
    const assignment = await assignmentService.getAssignments();
    if (!assignment) {
      return res.status(404).json({ error: "Assignment not found" });
    }
    res.status(200).json(assignment);
  } catch (error) {
    next(error);
  }
};

module.exports = find;
