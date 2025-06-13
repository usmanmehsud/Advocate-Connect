// Schema & Model
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true },
  password: String,
  image: String,
  gender: String,
  cnic: String,
  age: String,
  fee: Number,
  qualification: String,
  phone: String, // Add phone field
  otp: String,
  role: { type: String, enum: ["user", "admin", "lawyer"], default: "lawyer" },
  isVerified: { type: Boolean, default: false },
  experience: Number,
  totalCases: Number,
  specializedIn: {
  type: [String],
  default:"civil law"
},
// specializedIn:{type:String, default:"Civil"},
  status: {
    type: String,
    enum: ["available", "inactive"],
    default: "available",
  },
  address: String,
  ratings: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "OnlyUser" },
      rating: Number,
    },
  ],
  averageRating: { type: Number, default: 0 },
});

module.exports = mongoose.model("User", userSchema);