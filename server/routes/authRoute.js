const express = require("express");
const {
  register,
  login,
  forgotPassword,
  resetPassword,
  loginWithGoogle,
  getUser,
  getUsers,
  loginStatus,
  updateUser,
  verifyUser,
  sendVerificationEmail,
  deleteUser,
  upgradeUser,
  logoutUser,
  sendAutomatedEmail,
  getUserBookedEvents,
} = require("../controllers/authController");
const { protect, adminOnly } = require("../middleware/authMiddleware");
const route = express.Router();

route.post("/register", register);
route.post("/login", login);
route.post("/forgot-password", forgotPassword);
route.post("/sendVerificationEmail", protect, sendVerificationEmail);
route.post("/upgradeUser", protect, adminOnly, upgradeUser);
route.post("/logout", logoutUser);
route.post("/sendAutomatedEmail", protect, sendAutomatedEmail);

route.post("/login-with-google/callback", loginWithGoogle);

route.get("/get-user/:userId", protect, getUser);
route.get("/get-users", protect, getUsers);
route.get("/login-status", loginStatus);

route.patch("/update-user", protect, updateUser);
route.patch("/reset-password/:resetToken", resetPassword);
route.patch("/verify-user/:verificationToken", verifyUser);
route.get("/:userId/booked-events", protect, getUserBookedEvents);

route.delete("/:id", protect, deleteUser);

module.exports = route;
