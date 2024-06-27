import axios from "axios";

const BACKEND_URL = "http://localhost:5000";
export const API_URL = `${BACKEND_URL}/auth/`;

export const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

// Register User
const register = async (userData) => {
  const response = await axios.post(API_URL + "register", userData);
  return response.data;
};

// Login User
const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);
  return response.data;
};

// Logout User
const logout = async () => {
  const response = await axios.post(API_URL + "logout");
  return response.data.message;
};

// Get Login Status
const getLoginStatus = async () => {
  const response = await axios.get(API_URL + "login-status");
  return response.data;
};

const getUser = async (userId) => {
  const response = await axios.get(`${API_URL}get-user/${userId}`);
  return response.data;
};

// Update profile
const updateUser = async (userData) => {
  const response = await axios.patch(API_URL + "update-user", userData);
  return response.data;
};

// Send Verification Email
const sendVerificationEmail = async () => {
  const response = await axios.post(API_URL + "sendVerificationEmail");
  return response.data.message;
};

// Verify User
const verifyUser = async (verificationToken) => {
  const response = await axios.patch(
    `${API_URL}verify-user/${verificationToken}`
  );

  return response.data.message;
};

const changePassword = async (userData) => {
  const response = await axios.patch(API_URL + "changePassword", userData);

  return response.data.message;
};

// Reset Password
const resetPassword = async (userData, resetToken) => {
  const response = await axios.patch(
    `${API_URL}resetPassword/${resetToken}`,
    userData
  );

  return response.data.message;
};

// fORGOT Password
const forgotPassword = async (userData) => {
  const response = await axios.post(API_URL + "forgotPassword", userData);

  return response.data.message;
};

// Get Users
const getUsers = async () => {
  const response = await axios.get(API_URL + "get-users");

  return response.data;
};
// Delete User
const deleteUser = async (id) => {
  const response = await axios.delete(API_URL + id);

  return response.data.message;
};

// Upgrade User
const upgradeUser = async (userData) => {
  const response = await axios.post(API_URL + "upgradeUser", userData);

  return response.data.message;
};

// Login With Google
const loginWithGoogle = async (userToken) => {
  const response = await axios.post(
    API_URL + "login-with-google/callback",
    userToken
  );

  return response.data;
};

const authService = {
  register,
  login,
  logout,
  getLoginStatus,
  getUser,
  updateUser,
  sendVerificationEmail,
  verifyUser,
  changePassword,
  forgotPassword,
  resetPassword,
  getUsers,
  deleteUser,
  upgradeUser,
  loginWithGoogle,
};

export default authService;
