const mongoose = require("mongoose");
const config = require("../config");

mongoose.Promise = global.Promise;

if (process.env.NODE_ENV !== "test") {
  mongoose.connect(config.mongoUri);
} else {
  mongoose.connect(config.testingMongoUri);
}

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB database");
});

module.exports = mongoose;
