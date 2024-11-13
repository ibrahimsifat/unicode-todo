const socketIo = require("socket.io");
const taskService = require("../task");

/**
 * Set up and configure Socket.IO
 * @param {http.Server} server - The HTTP server object for socket connection.
 * @returns {Socket.IO.Server} socketServer
 */
const setupSocket = (server) => {
  const io = socketIo(server); // Create a new Socket.IO server instance

  // Handle client connections
  io.on("connection", (socket) => {
    console.log("A user connected: " + socket.id);

    // Handle task-related socket events
    socket.on("taskCreated", async (taskData) => {
      try {
        const task = await taskService.createTask(taskData); // Call your taskService to create a task
        io.emit("taskCreated", task); // Emit the event to all connected clients
      } catch (error) {
        console.error("Error in taskCreated event:", error);
      }
    });

    socket.on("taskUpdated", async (taskId, updates) => {
      try {
        const updatedTask = await taskService.updateTask(taskId, updates);
        io.emit("taskUpdated", updatedTask);
      } catch (error) {
        console.error("Error in taskUpdated event:", error);
      }
    });

    socket.on("taskDeleted", async (taskId) => {
      try {
        await taskService.deleteTask(taskId);
        io.emit("taskDeleted", taskId);
      } catch (error) {
        console.error("Error in taskDeleted event:", error);
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected: " + socket.id);
    });
  });

  return io;
};

module.exports = setupSocket;
