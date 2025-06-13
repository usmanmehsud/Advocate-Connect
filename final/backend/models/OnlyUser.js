const mongoose = require("mongoose")

// Schema & Model
const onlyUserSchema = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true },
  password: String,
  gender: String,
  cnic: String,
  age: String,
  qualification: String,
  phone: String, // Add phone field
  picture: String,
  otp: String,
  role: { type: String, enum: ["user", "admin", "lawyer"], default: "user" },
  isVerified: { type: Boolean, default: false },
});

module.exports = mongoose.model("OnlyUser", onlyUserSchema);