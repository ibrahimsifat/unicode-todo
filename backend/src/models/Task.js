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
      enum: ["high", "medium", "low"],
      default: "medium",
    },
  },
  {
    timestamps: true,
  },
);
const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
