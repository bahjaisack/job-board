const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  userEmail: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [4, "Password must be at least 4 characters long"],
  },
  role: {
    type: String,
    enum: ["admin", "employer", "employee", "user"],
    default: "user",
  },
  profile_name: {
    type: String,
    require: true,
  },
  profile_bio: {
    type: String,
    require: true,
  },
  profile_contact_phone: {
    type: Number,
    require: true,
  },
  status: {
    type: String,
    default: "active",
    enum: ["active", "inactive", "suspended"],
  },
  image: {
    type: String,
    required: true,
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  // image: { type: String }, // URL or path of the profile image
});

module.exports = mongoose.model("User", userSchema);
