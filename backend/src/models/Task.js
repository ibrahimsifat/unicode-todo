const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    duedate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["completed", "pending"],
      default: "pending",
    },
    priority: {
      type: String,
      enum: ["high", "medium", "low", "all"],
      default: "medium",
    },
  },
  {
    timestamps: true,
  },
);
taskSchema.index({ user_id: 1, updatedAt: -1, createdAt: -1 });
const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
