const assignmentService = require("../../../../lib/assignment");

/**
 * Create a new assignment.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {void}
 */

const create = async (req, res, next) => {
  try {
    const assignmentData = { ...req.body, user_id: req.user.id };
    const assignment = await assignmentService.createAssignment(
      assignmentData,
      req.io,
    );
    res
      .status(201)
      .json({ message: "assignment created successfully", assignment });
  } catch (error) {
    next(error); // Error handling
  }
};

module.exports = create;
