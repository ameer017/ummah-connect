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
} = require("../controllers/authController");
const route = express.Router();

route.post("/register", register);
route.post("/login", login);
route.post("/forgot-password", forgotPassword);
route.post("/reset-password", resetPassword);
route.post("/sendVerificationEmail", sendVerificationEmail);

route.post("/login-with-google/callback", loginWithGoogle);

route.get("/get-user/:userId", getUser);
route.get("/get-users", getUsers);
route.get("/login-status", loginStatus);

route.patch("/update-user", updateUser);
route.patch("/verify-user/:verificationToken", verifyUser);

route.delete("/:id", deleteUser);

module.exports = route;
