const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/authModel");
const Token = require("../models/tokenModel");
const Cryptr = require("cryptr");
const { OAuth2Client } = require("google-auth-library");

const cryptr = new Cryptr(process.env.CRYPTR_KEY);

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

//POST
const register = asyncHandler(async (req, res) => {});
const login = asyncHandler(async (req, res) => {});
const forgotPassword = asyncHandler(async (req, res) => {});
const resetPassword = asyncHandler(async (req, res) => {});
const loginWithGoogle = asyncHandler(async (req, res) => {});
const sendVerificationEmail = asyncHandler(async (req, res) => {});

//GET
const getUser = asyncHandler(async (req, res) => {});
const getUsers = asyncHandler(async (req, res) => {});
const loginStatus = asyncHandler(async (req, res) => {});

//PATCH
const updateUser = asyncHandler(async (req, res) => {});
const verifyUser = asyncHandler(async (req, res) => {});

//DELETE
const deleteUser = asyncHandler(async (req, res) => {
  const user = User.findById(req.params.id);

  !user &&
    (() => {
      res.status(404);
      throw new Error("Not found!");
    })();

  await user.deleteOne();
  res.status(200).json({
    message: "User deleted successfully",
  });
});

module.exports = {
  register,
  login,
  forgotPassword,
  resetPassword,
  loginWithGoogle,
  sendVerificationEmail,
  getUser,
  getUsers,
  loginStatus,
  updateUser,
  verifyUser,
  deleteUser,
};
