const mongoose = require("mongoose");
const { hashing } = require("../lib/utils");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    avatar: {
      type: String,
      select: false,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    tasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
      },
    ],
    assignedTasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Assignment",
      },
    ],
  },
  {
    timestamps: true,
  },
);
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next(); // If the password hasn't changed, no need to rehash
  }
  try {
    const hashedPassword = await hashing.generateHash(this.password);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("User", UserSchema);
