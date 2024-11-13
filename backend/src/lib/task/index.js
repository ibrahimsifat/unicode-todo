const { Task } = require("../../models");
const { badRequest, notFound } = require("../utils/error");

/**
 * Create a task.
 * @param {Object} taskData - The data for the new task.
 * @returns {Object} The created task.
 */
const createTask = async (taskData) => {
  const task = new Task(taskData);
  await task.save();
  return task;
};

/**
 * Update a task.
 * @param {String} taskId - The ID of the task to update.
 * @param {Object} updates - The updated task data.
 * @returns {Object} The updated task.
 */
const updateTask = async (taskId, updates, userId) => {
  const task = await getTaskById(taskId);
  if (!task) throw notFound("The task is not found");

  if (task?.user_id?.toString() !== userId?.toString()) {
    throw badRequest("You are not authorized to edit this task");
  }

  // You can add additional validation here if necessary (e.g., check allowed fields)
  const allowedFields = ["title", "duedate", "status", "priority"]; // List of valid fields to update
  const updateKeys = Object.keys(updates);

  // Ensure only valid fields are being updated
  const invalidFields = updateKeys.filter(
    (key) => !allowedFields.includes(key),
  );
  if (invalidFields.length > 0) {
    throw badRequest(`Invalid fields: ${invalidFields.join(", ")}`);
  }

  // Perform the update
  await Task.findByIdAndUpdate(taskId, updates, { new: true });

  return task;
};

/**
 * Delete a task.
 * @param {String} taskId - The ID of the task to delete.
 * @returns {Boolean} True if the task is deleted, else false.
 */
const deleteTask = async (taskId, userId) => {
  const task = await getTaskById(taskId);
  if (!task) throw notFound("The task is not found");

  if (task?.user_id?.toString() !== userId?.toString()) {
    throw badRequest("You are not authorized to delete this task");
  }
  await Task.findByIdAndDelete(taskId);
  return true;
};

/**
 * Get all tasks for a user.
 * @param {String} userId - The ID of the user whose tasks to fetch.
 * @returns {Array} List of tasks for the given user.
 */
const getTasksByUser = async (userId) => {
  return await Task.find({ user_id: userId });
};

/**
 * Get a single task by its ID.
 * @param {String} taskId - The ID of the task to fetch.
 * @returns {Object} The task object.
 */
const getTaskById = async (taskId) => {
  return await Task.findById(taskId);
};

module.exports = {
  createTask,
  updateTask,
  deleteTask,
  getTasksByUser,
  getTaskById,
};
