const express = require("express");
const userModel = require("./model");
const UserController = require("./controller");
const authenticateJWT = require("./auth/authorization");
const authorizeRoles = require("./auth/authorizerole");
const multer = require("multer");
const path = require("path"); // Import the path module
const { verifyToken } = require("./auth/auth");

// const { authenticateJWT, authorizeRoles } = require('./auth/authorization');

const router = express.Router();

router.post("/register", UserController.createRegister);

// Public route - login
router.post("/login", UserController.loginUser);

// Protected route - accessible only by admin
router.get(
  "/admin",
  authenticateJWT,
  authorizeRoles(["admin"]),
  UserController.adminDashboard
);

// Protected route - accessible by admin and employee
router.get(
  "/dashboard",
  authenticateJWT,
  authorizeRoles(["admin", "employee"]),
  UserController.dashboard
);

// Protected route - accessible by all roles
router.get("/profile", authenticateJWT, UserController.profile);
router.post("/user", async (req, res) => {
  const User = new userModel(req.body);
  try {
    const userResult = await User.save();
    res.status(201).send(userResult);
  } catch (error) {
    res.status(400).send(error);
  }
});
// user routes

router.get(
  "/users",
  authenticateJWT,
  authorizeRoles(["admin"]),
  UserController.getUsers
);
router.get(
  "/user/:id",
  authenticateJWT,
  authorizeRoles(["admin"]),
  UserController.getUser
);
router.delete(
  "/user/:id",
  authenticateJWT,
  authorizeRoles(["admin"]),
  UserController.deleteUser
);
router.put(
  "/user/:id",
  authenticateJWT,
  authorizeRoles(["admin"]),
  UserController.updateUser
);

//
router.post("/forgot-password", UserController.forgotPassword);
router.post("/reset-password/:token", UserController.resetPassword);
router.post("/reset-password/:token", async (req, res) => {
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
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadsDir = path.join(__dirname, "../uploads");
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });
router.post("/users", upload.single("image"), UserController.createRegister);

router.post("/user", async (req, res) => {
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

  try {
    const user = new User({
      userName,
      userEmail,
      password,
      role,
      profile_name,
      profile_bio,
      profile_contact_phone,
      status,
    });

    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      res.status(400).json({ message: `${field} already exists` });
    } else {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
});

router.get("/account", verifyToken, async (req, res) => {
  try {
    const user = await userModel.findOne({ userEmail: req.user.email }).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;


