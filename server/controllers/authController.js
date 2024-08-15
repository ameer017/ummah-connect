const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/authModel");
const Token = require("../models/tokenModel");
const Cryptr = require("cryptr");
const { OAuth2Client } = require("google-auth-library");
const { generateToken, hashToken } = require("../utils");
const sendEmail = require("../utils/sendEmail");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const validateUserInput = (reqBody) => {
  const {
    firstName,
    lastName,
    username,
    emailAddress,
    password,
    phone,
    gender,
  } = reqBody;

  
  if (
    !firstName ||
    !lastName ||
    !username ||
    !gender ||
    !phone ||
    !emailAddress ||
    !password
  ) {
    throw new Error("Please fill in all the required fields.");
  }
};
exports.validateUserInput = validateUserInput;

//POST
const register = asyncHandler(async (req, res) => {
  const { emailAddress } = req.body;

  validateUserInput(req.body);

  const userExists = await User.findOne({ emailAddress });

  if (userExists) {
    res.status(400);
    throw new Error("Email already in use.");
  }

  const user = await User.create(req.body);

  // Generate Token
  const token = generateToken(user._id);

  // Send HTTP-only cookie
  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400), // 1 day
    sameSite: "none",
    secure: true,
  });

  if (user) {
    const {
      _id,
      firstName,
      lastName,
      emailAddress,
      phone,
      gender,
      role,
      isVerified,
      photo,
      username,
      location,
      profession,
      interests,
      socialMediaLinks,
      hasBooked
    } = user;

    res.status(201).json({
      _id,
      firstName,
      lastName,
      emailAddress,
      phone,
      gender,
      role,
      isVerified,
      photo,
      username,
      location,
      profession,
      interests,
      socialMediaLinks,
      hasBooked,
      token,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const login = asyncHandler(async (req, res) => {
  const { emailAddress, password } = req.body;

  if (!emailAddress || !password) {
    res.status(400);
    throw new Error("Please add email and password");
  }

  const user = await User.findOne({ emailAddress });

  if (!user) {
    res.status(404);
    throw new Error("User not found, please signup");
  }

  const passwordIsCorrect = await bcrypt.compare(password, user.password);

  if (!passwordIsCorrect) {
    res.status(400);
    throw new Error("Invalid email or password");
  }

  // Generate Token
  const token = generateToken(user._id);

  if (user && passwordIsCorrect) {
    // Send HTTP-only cookie
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400), // 1 day
      sameSite: "none",
      secure: true,
    });

    const {
      _id,
      firstName,
      lastName,
      emailAddress,
      phone,
      gender,
      role,
      isVerified,
      photo,
      username,
      location,
      profession,
      interests,
      socialMediaLinks,
      hasBooked
    } = user;

    res.status(201).json({
      _id,
      firstName,
      lastName,
      emailAddress,
      phone,
      gender,
      role,
      isVerified,
      photo,
      username,
      location,
      profession,
      interests,
      socialMediaLinks,
      token,
      hasBooked
    });
  } else {
    res.status(500);
    throw new Error("Something went wrong, please try again");
  }
});

const forgotPassword = asyncHandler(async (req, res) => {
  const { emailAddress } = req.body;

  const user = await User.findOne({ emailAddress });

  if (!user) {
    res.status(404);
    throw new Error("No user with this email");
  }

  // Delete Token if it exists in DB
  let token = await Token.findOne({ userId: user._id });
  if (token) {
    await token.deleteOne();
  }

  //   Create Verification Token and Save
  const resetToken = crypto.randomBytes(32).toString("hex") + user._id;
  console.log(resetToken);

  // Hash token and save
  const hashedToken = hashToken(resetToken);
  await new Token({
    userId: user._id,
    rToken: hashedToken,
    createdAt: Date.now(),
    expiresAt: Date.now() + 60 * (60 * 1000), // 60mins
  }).save();

  // Construct Reset URL
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

  // Send Email
  const subject = "Password Reset Request - UmmahConnect";
  const send_to = user.emailAddress;
  const sent_from = process.env.EMAIL_USER;
  const reply_to = "noreply@ummahconnect.com";
  const template = "forgotPassword";
  const name = user.firstName;
  const link = resetUrl;

  try {
    await sendEmail(
      subject,
      send_to,
      sent_from,
      reply_to,
      template,
      name,
      link
    );
    res.status(200).json({ message: "Password Reset Email Sent" });
  } catch (error) {
    res.status(500);
    throw new Error("Email not sent, please try again");
  }
});

const resetPassword = asyncHandler(async (req, res) => {
  const { resetToken } = req.params;
  const { password } = req.body;
  console.log(resetToken);
  console.log(password);

  const hashedToken = hashToken(resetToken);

  const userToken = await Token.findOne({
    rToken: hashedToken,
    expiresAt: { $gt: Date.now() },
  });

  if (!userToken) {
    res.status(404);
    throw new Error("Invalid or Expired Token");
  }

  // Find User
  const user = await User.findOne({ _id: userToken.userId });

  // Now Reset password
  user.password = password;
  await user.save();

  res.status(200).json({ message: "Password Reset Successful, please login" });
});

const loginWithGoogle = asyncHandler(async (req, res) => {
  const { userToken } = req.body;
  console.log(userToken);

  const ticket = await client.verifyIdToken({
    idToken: userToken,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();
  const { firstName, lastName, email, picture, sub } = payload;
  const password = Date.now() + sub;

  // Check if user exists
  const user = await User.findOne({ email });

  if (!user) {
    //   Create new user
    const newUser = await User.create({
      firstName,
      lastName,
      emailAddress: email,
      password,
      phone,
      gender,
      photo: picture,
      isVerified: true,
    });

    if (newUser) {
      // Generate Token
      const token = generateToken(newUser._id);

      // Send HTTP-only cookie
      res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400), // 1 day
        sameSite: "none",
        secure: true,
      });

      const {
        _id,
        firstName,
        lastName,
        emailAddress,
        phone,
        gender,
        role,
        isVerified,
        username,
        location,
        profession,
        interests,
        socialMediaLinks,
      } = user;

      res.status(201).json({
        _id,
        firstName,
        lastName,
        emailAddress,
        phone,
        gender,
        role,
        isVerified,
        token,
        username,
        location,
        profession,
        interests,
        socialMediaLinks,
      });
    }
  }

  // User exists, login
  if (user) {
    const token = generateToken(user._id);

    // Send HTTP-only cookie
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400), // 1 day
      sameSite: "none",
      secure: true,
    });

    const {
      _id,
      firstName,
      lastName,
      emailAddress,
      phone,
      gender,
      role,
      isVerified,
      username,
      location,
      profession,
      interests,
      socialMediaLinks,
    } = user;

    res.status(201).json({
      _id,
      firstName,
      lastName,
      emailAddress,
      phone,
      gender,
      role,
      isVerified,
      token,
      username,
      location,
      profession,
      interests,
      socialMediaLinks,
    });
  }
});

const sendVerificationEmail = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  if (user.isVerified) {
    res.status(400);
    throw new Error("User already verified");
  }

  // Delete Token if it exists in DB
  let token = await Token.findOne({ userId: user._id });
  if (token) {
    await token.deleteOne();
  }

  //   Create Verification Token and Save
  const verificationToken = crypto.randomBytes(32).toString("hex") + user._id;
  console.log(verificationToken);

  // Hash token and save
  const hashedToken = hashToken(verificationToken);
  await new Token({
    userId: user._id,
    vToken: hashedToken,
    createdAt: Date.now(),
    expiresAt: Date.now() + 60 * (60 * 1000), // 60mins
  }).save();

  // Construct Verification URL
  const verificationUrl = `${process.env.FRONTEND_URL}/verify/${verificationToken}`;

  // Send Email
  const subject = "Verify Your Account - UmmahConnect";
  const send_to = user.emailAddress;
  const sent_from = process.env.EMAIL_USER;
  const reply_to = "noreply@ummahconnect.com";
  const template = "verifyEmail";
  const name = user.name;
  const link = verificationUrl;

  try {
    await sendEmail(
      subject,
      send_to,
      sent_from,
      reply_to,
      template,
      name,
      link
    );
    res.status(200).json({ message: "Verification Email Sent" });
  } catch (error) {
    res.status(500);
    throw new Error("Email not sent, please try again");
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    path: "/",
    httpOnly: true,
    expires: new Date(0), // 1 day
    sameSite: "none",
    secure: true,
  });
  return res.status(200).json({ message: "Logout successful" });
});

const upgradeUser = asyncHandler(async (req, res) => {
  const { role, id } = req.body;

  const user = await User.findById(id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  user.role = role;
  await user.save();

  res.status(200).json({
    message: `User role upgraded to ${role}`,
  });
});
//GET
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    const {
      _id,
      firstName,
      lastName,
      emailAddress,
      phone,
      gender,
      role,
      photo,
      isVerified,
      username,
      location,
      profession,
      interests,
      socialMediaLinks,
      tag,
      expertise,
      availableTimes,
      hasBooked
    } = user;

    res.status(201).json({
      _id,
      firstName,
      lastName,
      emailAddress,
      phone,
      gender,
      role,
      photo,
      isVerified,
      username,
      location,
      profession,
      interests,
      socialMediaLinks,
      tag,
      expertise,
      availableTimes,
      hasBooked
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find().sort("-createdAt").select("-password");
  if (!users) {
    res.status(500);
    throw new Error("Something went wrong");
  }
  res.status(200).json(users);
});

const loginStatus = asyncHandler(async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json(false);
  }

  // Verify token
  const verified = jwt.verify(token, process.env.JWT_SECRET);

  if (verified) {
    return res.json(true);
  }
  return res.json(false);
});

//PATCH
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    const {
      _id,
      firstName,
      lastName,
      emailAddress,
      phone,
      gender,
      role,
      photo,
      isVerified,
      username,
      location,
      profession,
      interests,
      socialMediaLinks,
    } = user;

    const updatedSocialMediaLinks = {
      ...socialMediaLinks.toObject(),
      ...req.body.socialMediaLinks,
    };

    user.gender = gender;
    user.emailAddress = emailAddress;
    user.firstName = req.body.firstName || firstName;
    user.lastName = req.body.lastName || lastName;
    user.phone = req.body.phone || phone;
    user.photo = req.body.photo || photo;
    user.username = req.body.username || username;
    user.location = req.body.location || location;
    user.profession = req.body.profession || profession;
    user.interests = req.body.interests || interests;
    user.socialMediaLinks = updatedSocialMediaLinks;

    await user.save();

    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      emailAddress: user.emailAddress,
      phone: user.phone,
      gender: user.gender,
      role: user.role,
      photo: user.photo,
      isVerified: user.isVerified,
      username: user.username,
      location: user.location,
      profession: user.profession,
      interests: user.interests,
      socialMediaLinks: user.socialMediaLinks,
    });
  } else {
    res.status(400);
    throw new Error("User not found!");
  }
});

const verifyUser = asyncHandler(async (req, res) => {
  const { verificationToken } = req.params;

  const hashedToken = hashToken(verificationToken);

  const userToken = await Token.findOne({
    vToken: hashedToken,
    expiresAt: { $gt: Date.now() },
  });

  if (!userToken) {
    res.status(404);
    throw new Error("Invalid or Expired Token");
  }

  // Find User
  const user = await User.findOne({ _id: userToken.userId });

  if (user.isVerified) {
    res.status(400);
    throw new Error("User is already verified");
  }

  // Now verify user
  user.isVerified = true;
  await user.save();

  res.status(200).json({ message: "Account Verification Successful" });
});

const changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, password } = req.body;
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  if (!oldPassword || !password) {
    res.status(400);
    throw new Error("Please enter old and new password");
  }

  // Check if old password is correct
  const passwordIsCorrect = await bcrypt.compare(oldPassword, user.password);

  // Save new password
  if (user && passwordIsCorrect) {
    user.password = password;
    await user.save();

    res
      .status(200)
      .json({ message: "Password change successful, please re-login" });
  } else {
    res.status(400);
    throw new Error("Old password is incorrect");
  }
});

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

const sendAutomatedEmail = asyncHandler(async (req, res) => {

  const { subject, send_to, reply_to, template, url } = req.body;

  if (!subject || !send_to || !reply_to || !template) {
    
    res.status(500);
    throw new Error("Missing email parameter");
  }

  // Get user
  const user = await User.findOne({ emailAddress: send_to });

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const sent_from = process.env.EMAIL_USER;
  const name = user.firstName;
  const link = `${process.env.FRONTEND_URL}${url}`;

  try {
    await sendEmail(
      subject,
      send_to,
      sent_from,
      reply_to,
      template,
      name,
      link
    );
    res.status(200).json({ message: "Email Sent" });
  } catch (error) {
    res.status(500);
    throw new Error("Email not sent, please try again");
  }
});

const getUserBookedEvents = async (req, res) => {
  try {
    const userId = await User.findById(req.user._id);

    // Find the user by ID and populate the bookedEvents field
    const userEvent = await User.findById(userId).populate("bookedEvents");
    console.log(userEvent);

    if (!userEvent) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(userEvent.bookedEvents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  register,
  login,
  forgotPassword,
  resetPassword,
  loginWithGoogle,
  sendVerificationEmail,
  logoutUser,
  upgradeUser,
  getUser,
  getUsers,
  loginStatus,
  updateUser,
  verifyUser,
  changePassword,
  deleteUser,
  sendAutomatedEmail,
  getUserBookedEvents,
};
