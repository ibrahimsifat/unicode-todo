const taskService = require("../../../../lib/task");

/**
 * Create a new task.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {void}
 */

const create = async (req, res, next) => {
  try {
    const taskData = { ...req.body, user_id: req.user.id }; // Assuming user is authenticated
    const task = await taskService.createTask(taskData); // Create the task

    // Emit taskCreated event to all connected clients
    if (req.io) {
      req.io.emit("taskCreated", task);
    } else {
      console.error("Socket.IO instance not found");
    }

    res.status(201).json({ message: "Task created successfully", task });
  } catch (error) {
    next(error); // Error handling
  }
};

module.exports = create;
