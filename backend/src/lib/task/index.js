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
  const newTask = await Task.findByIdAndUpdate(taskId, updates, { new: true });

  return newTask;
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

// Default values for pagination
const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 4;

const getTasksByUser = async (
  userId,
  page = DEFAULT_PAGE,
  pageSize = DEFAULT_PAGE_SIZE,
) => {
  const parsedPage = Math.max(parseInt(page, 10), 1);
  const parsedPageSize = Math.max(parseInt(pageSize, 10), 1); // Ensures pageSize is at least 1

  // Get the tasks with pagination
  const tasks = await Task.find({ user_id: userId })
    .sort({
      updatedAt: -1,
      createdAt: -1,
    })
    .skip((parsedPage - 1) * parsedPageSize)
    .limit(parsedPageSize);

  // Get the total count of tasks for pagination info
  const totalTasks = await Task.countDocuments({ user_id: userId });

  // Calculate total number of pages
  const totalPages = Math.ceil(totalTasks / parsedPageSize);

  return {
    tasks,
    totalPages,
    currentPage: parsedPage,
    totalCount: totalTasks,
  };
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
