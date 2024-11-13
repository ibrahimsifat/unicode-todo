const router = require("express").Router();
const userRoutes = require("./user.routes");
const authRoutes = require("./auth.route");
const taskRoutes = require("./task.route");
const assignmentRoutes = require("./assignment.route");
router.use("/users", userRoutes);
router.use("/auth", authRoutes);
router.use("/tasks", taskRoutes);
router.use("/assignments", assignmentRoutes);
module.exports = router;
