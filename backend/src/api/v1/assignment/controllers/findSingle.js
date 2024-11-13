const assignmentService = require("../../../../lib/assignment");
const { notFound } = require("../../../../lib/utils/error");

/**
 * Create a new assignment.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {void}
 */

const findSingle = async (req, res, next) => {
  const { id: assignmentId } = req.params;
  try {
    // Call the service method to find the assignment
    const assignment = await assignmentService.findSingle(assignmentId);
    return res.status(200).json(assignment);
  } catch (error) {
    next(error);
  }
};

module.exports = findSingle;
