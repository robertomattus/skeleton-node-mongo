const mongoose = require("mongoose");
const config = require("../../config.js");

const dbUri = config.db.development.uri;

const connectDB = async () => {
  try {
    await mongoose.connect(dbUri);
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
