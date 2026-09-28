const mongoose = require("mongoose");
const adminSeeder = require("../../adminSeeder");

const connectToDatabase = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("database connected successfully");
  adminSeeder();
};

module.exports = connectToDatabase;
