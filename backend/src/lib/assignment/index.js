const { Assignment } = require("../../models");
const { serverError, badRequest, notFound } = require("../utils/error");

/**
 * Create a new assignment if it does not already exist.
 * @param {Object} data - The assignment data containing task_id, user_id, and role.
 * @param {SocketIO.Server} io - The Socket.IO instance for emitting events.
 * @returns {Promise<Object>} The created assignment or an error if duplicate.
 */
async function createAssignment(data, io) {
  if (!data.task_id || !data.user_id) {
    throw badRequest("Both task_id and user_id are required.");
  }
  // Check for existing assignment with the same task_id and user_id
  const existingAssignment = await Assignment.findOne({
    task_id: data.task_id,
    user_id: data.user_id,
  });

  if (existingAssignment) {
    // If a duplicate exists, throw an error
    throw badRequest("Assignment already exists for this task and user.");
  }

  // Create a new assignment if no duplicate exists
  const assignment = new Assignment(data);
  await assignment.save();

  // Emit a socket event when a new assignment is created
  if (io) {
    io.emit("assignmentCreated", assignment);
  } else {
    console.error("Socket.IO instance not found");
  }

  return assignment;
}

async function getAssignments() {
  return await Assignment.find({}).populate("task_id user_id");
}

async function updateAssignment(id, data, io) {
  const assignment = await Assignment.findByIdAndUpdate(id, data, {
    new: true,
  });

  // Emit a socket event on update
  io.emit("assignmentUpdated", assignment);
  return assignment;
}

// Find a single assignment by ID
const findSingle = async (assignmentId) => {
  const assignment = await Assignment.findById(assignmentId);

  if (!assignment) {
    throw notFound("Assignment not found");
  }

  return assignment;
};

async function deleteAssignment(task_id, user_id, io) {
  const assignment = await Assignment.findOne({ task_id, user_id });
  if (!assignment) {
    throw notFound("Assignment not found");
  }
  await Assignment.findOneAndDelete({ task_id, user_id });

  // Emit a socket event on delete
  io.emit("assignmentDeleted", { task_id, user_id });
  return assignment;
}

module.exports = {
  createAssignment,
  getAssignments,
  updateAssignment,
  deleteAssignment,
  findSingle,
};
