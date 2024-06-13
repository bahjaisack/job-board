const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("./model");
const transporter = require("./nodemailer");
const crypto = require("crypto");

//
exports.createUser = async (req, res) => {
  const {
    userName,
    userEmail,
    password,
    role,
    profile_name,
    profile_bio,
    profile_contact_phone,
    status,
  } = req.body;

  // Ensure essential fields are present
  if (!userName || !userEmail || !password) {
    return res
      .status(400)
      .json({ message: "userName, userEmail, and password are required" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const image = req.file ? req.file.path : "";

  const user = new User({
    userName,
    userEmail,
    password: hashedPassword,
    role,
    profile_name,
    profile_bio,
    profile_contact_phone,
    image, // Add image field here
    status: "active",
  });

  try {
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      res.status(400).json({ message: `${field} already exists` });
    } else {
      res.status(500).json({ message: "Server error" });
    }
  }
};

//Create a new user

exports.createRegister = async (req, res) => {
  const {
    userName,
    userEmail,
    password,
    role,
    profile_name,
    profile_bio,
    profile_contact_phone,
    status,
    image,
  } = req.body;

  const user = new User({
    userName,
    userEmail,
    password, // Storing the password in plain text (NOT recommended)
    role,
    profile_name,
    profile_bio,
    profile_contact_phone,
    status: status || "active",
    image,
  });

  try {
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      res.status(400).json({ message: `${field} already exists` });
    } else {
      res.status(500).json({ message: "Server error" });
    }
  }
};

exports.createRegister = async (req, res) => {
  const {
    userName,
    userEmail,
    password,
    role,
    profile_name,
    profile_bio,
    profile_contact_phone,
    status,
    image,
  } = req.body;

  const user = new User({
    userName,
    userEmail,
    password, // Storing the password in plain text (NOT recommended)
    role,
    profile_name,
    profile_bio,
    profile_contact_phone,
    status: status || "active",
    image,
  });

  try {
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      res.status(400).json({ message: `${field} already exists` });
    } else {
      res.status(500).json({ message: "Server error" });
    }
  }
};

// // Login user
exports.loginUser = async (req, res) => {
  const { userEmail, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ userEmail });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the provided password with the stored password
    if (password !== user.password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Respond with the generated token
    res.json({ token });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Admin dashboard
exports.adminDashboard = (req, res) => {
  res.send("Admin Dashboard");
};

// General dashboard
exports.dashboard = (req, res) => {
  res.status(200).send({ message: "Dashboard for Admin and Employee" });
};

// User profile
exports.profile = (req, res) => {
  res.send("User Profile");
};

// user authorization
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
exports.getUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const user = await User.findByIdAndUpdate(id, updates, { new: true });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User updated successfully", user });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// controller for forget password
exports.forgotPassword = async (req, res) => {
  const { userEmail } = req.body;

  try {
    const user = await User.findOne({ userEmail });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const token = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    const resetURL = `http://localhost:3000/reset/${token}`;

    const mailOptions = {
      to: userEmail,
      from: process.env.EMAIL_USER,
      subject: "Password Reset",
      text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
                   Please click on the following link, or paste this into your browser to complete the process:\n\n
                   ${resetURL}\n\n
                   If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ message: "Error sending email" });
      } else {
        console.log("Email sent:", info.response);
        res.status(200).json({ message: "Password reset link sent" });
      }
    });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
// reset password controller
exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
    res.status(200).json({ message: "Password reset successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
