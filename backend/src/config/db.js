// src/config/database.js
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const mongoURI =
      "mongodb://admin:pass@mongo:27017/unicode?authSource=admin";
    console.log("Attempting to connect to MongoDB...");

    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    const conn = await mongoose.connect(mongoURI, options);

    console.log(`MongoDB Connected: ${conn.connection.host}`);

    // Error handling
    mongoose.connection.on("error", (err) => {
      console.error("MongoDB connection error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("MongoDB disconnected");
    });

    process.on("SIGINT", async () => {
      await mongoose.connection.close();
      process.exit(0);
    });
  } catch (error) {
    console.error("MongoDB connection error:", error);
    // Log the full error details
    if (error.name === "MongoServerError") {
      console.error("Authentication details:", {
        code: error.code,
        codeName: error.codeName,
        name: error.name,
      });
    }
    process.exit(1);
  }
};

module.exports = connectDB;
