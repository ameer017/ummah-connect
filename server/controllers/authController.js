const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/authModel");
const Token = require("../models/tokenModel");
const { OAuth2Client } = require("google-auth-library");
const { generateToken, hashToken, sendEmail } = require("../utils");
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
  try {
    const { emailAddress, password } = req.body;

    if (!emailAddress || !password) {
      console.error("Email or password not provided");
      res.status(400);
      throw new Error("Please add email and password");
    }

    const user = await User.findOne({ emailAddress });

    if (!user) {
      console.error(`User not found with email: ${emailAddress}`);
      res.status(404);
      throw new Error("User not found, please signup");
    }

    const passwordIsCorrect = await bcrypt.compare(password, user.password);

    if (!passwordIsCorrect) {
      console.error("Password mismatch for user:", emailAddress);
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
        socialMediaLinks
      } = user;

      console.log("User logged in successfully:", emailAddress, token);

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
        token
      });
    } else {
      console.error("Unexpected error during login for user:", emailAddress);
      res.status(500);
      throw new Error("Something went wrong, please try again");
    }
  } catch (error) {
    console.error("Error during login process:", error.message);
    res.status(500).json({ message: error.message });
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

  // Create Verification Token and Save
  const resetToken = crypto.randomBytes(32).toString("hex") + user._id;
  // console.log(resetToken);

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

  // Construct email HTML template
  const emailHtml = `
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Password Reset Request</title>
        <style>
          body {
            background-color: #0a1930;
            padding: 30px;
            font-family: Arial, Helvetica, sans-serif;
          }

          .container {
            background-color: #eee;
            padding: 10px;
            border-radius: 3px;
          }

          .color-primary {
            color: #007bff;
          }

          .color-danger {
            color: orangered;
          }

          .color-success {
            color: #28a745;
          }

          .color-white {
            color: #fff;
          }

          .color-blue {
            color: #0a1930;
          }

          a {
            font-size: 1.4rem;
            text-decoration: none;
          }

          .btn {
            font-size: 1.4rem;
            font-weight: 400;
            padding: 6px 8px;
            margin: 0 5px 0 0;
            border: 1px solid transparent;
            border-radius: 3px;
            cursor: pointer;
          }

          .btn-primary {
            color: #fff;
            background: #007bff;
          }

          .btn-secondary {
            color: #fff;
            border: 1px solid #fff;
            background: transparent;
          }

          .btn-danger {
            color: #fff;
            background: orangered;
          }

          .btn-success {
            color: #fff;
            background: #28a745;
          }

          .flex-center {
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .logo {
            padding: 5px;
            background-color: #1f93ff;
          }

          .my {
            margin: 2rem 0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="logo flex-center">
            <h2 class="color-white">UmmahConnect</h2>
          </div>
          <h2>As Salam Alaekum Wa Rahmatullahi Wa Barokatuhu <span class="color-danger">${user.firstName}</span></h2>
          <p>Please use the URL below to reset your password:</p>
          <p>This link is valid for 1 hour.</p>
          <a href="${resetUrl}" class="btn btn-success">Reset Password</a>
          <div class="my">
            <p>Regards...</p>
            <p><b class="color-danger">UmmahConnect</b> Team</p>
          </div>
        </div>
      </body>
    </html>
  `;

  // Send Email
  try {
    await sendEmail({
      subject: "Password Reset Request - UmmahConnect",
      send_to: user.emailAddress,
      sent_from: process.env.EMAIL_USER,
      reply_to: "noreply@ummahconnect.com",
      html: emailHtml,
    });
    res.status(200).json({ message: "Password Reset Email Sent" });
  } catch (error) {
    res.status(500);
    throw new Error("Email not sent, please try again");
  }
});

const resetPassword = asyncHandler(async (req, res) => {
  const { resetToken } = req.params;
  const { password } = req.body;
  // console.log(resetToken);
  // console.log(password);

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
  // console.log(userToken);

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

  // Create Verification Token and Save
  const verificationToken = crypto.randomBytes(32).toString("hex") + user._id;

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

  // Prepare the HTML email content
  const emailTemplate = `
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Verify Your Account</title>
      <style>
        body { background-color: #0a1930; padding: 30px; font-family: Arial, Helvetica, sans-serif; }
        .container { background-color: #eee; padding: 10px; border-radius: 3px; }
        .color-primary { color: #007bff; }
        .color-danger { color: orangered; }
        .color-success { color: #28a745; }
        .color-white { color: #fff; }
        .color-blue { color: #0a1930; }
        a { font-size: 1.4rem; text-decoration: none; }
        .btn { font-size: 1.4rem; font-weight: 400; padding: 6px 8px; margin: 0 5px 0 0; border: 1px solid transparent; border-radius: 3px; cursor: pointer; }
        .btn-primary { color: #fff; background: #007bff; }
        .btn-secondary { color: #fff; border: 1px solid #fff; background: transparent; }
        .btn-danger { color: #fff; background: orangered; }
        .btn-success { color: #fff; background: #28a745; }
        .flex-center { display: flex; justify-content: center; align-items: center; }
        .logo { padding: 5px; background-color: #1f93ff; }
        .my { margin: 2rem 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="logo flex-center">
          <h2 class="color-white">UmmahConnect</h2>
        </div>
        <h2>Dear <span class="color-danger">${user.firstName}</span>,</h2>
        <p>As Salam Alaekum Wa Rahmatullahi Wa Barokatuhu </p>
        <p>Please use the URL below to verify your account. This link is valid for 60 minutes.</p>
        <a href="${verificationUrl}" class="btn btn-success">Verify Account</a>
        <div class="my">
          <p>Regards,</p>
          <p><strong class="color-danger">UmmahConnect</strong> Team</p>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    await sendEmail({
      to: user.emailAddress,
      from: process.env.EMAIL_USER,
      subject: "Verify Your Account - UmmahConnect",
      html: emailTemplate,
      replyTo: "noreply@ummahconnect.com"
    });

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

  // Construct email content
  const subject = "Your Account Role Updated - UmmahConnect";
  const send_to = user.emailAddress;
  const sent_from = process.env.EMAIL_USER;
  const reply_to = "noreply@ummahconnect.com";
  const name = user.name;
  const link = `${process.env.FRONTEND_URL}/login`;

  const emailContent = `
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Account Role Update</title>
    <style>
      body {
        background-color: #0a1930;
        padding: 30px;
        font-family: Arial, Helvetica, sans-serif;
      }
      .container {
        background-color: #eee;
        padding: 10px;
        border-radius: 3px;
      }
      .color-primary {
        color: #007bff;
      }
      .color-danger {
        color: orangered;
      }
      .color-success {
        color: #28a745;
      }
      .color-white {
        color: #fff;
      }
      .color-blue {
        color: #0a1930;
      }
      a {
        font-size: 1.4rem;
        text-decoration: none;
      }
      .btn {
        font-size: 1.4rem;
        font-weight: 400;
        padding: 6px 8px;
        margin: 0 5px 0 0;
        border: 1px solid transparent;
        border-radius: 3px;
        cursor: pointer;
      }
      .btn-primary {
        color: #fff;
        background: #007bff;
      }
      .btn-secondary {
        color: #fff;
        border: 1px solid #fff;
        background: transparent;
      }
      .btn-danger {
        color: #fff;
        background: orangered;
      }
      .btn-success {
        color: #fff;
        background: #28a745;
      }
      .flex-center {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .logo {
        padding: 5px;
        background-color: #1f93ff;
      }
      .my {
        margin: 2rem 0;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="logo flex-center">
        <h2 class="color-white">UmmahConnect</h2>
      </div>
      <h2>Dear <span class="color-danger">${name}</span>,</h2>
      <p>This is to notify you that your account role was changed to <strong>${role}</strong>.</p>
      <p>Please login for confirmation.</p>
      <a href="${link}" class="btn btn-success">Login</a>
      <div class="my">
        <p>Regards,</p>
        <p><b class="color-danger">UmmahConnect</b> Team</p>
      </div>
    </div>
  </body>
  </html>`;

  try {
    await sendEmail({
      subject,
      send_to,
      sent_from,
      reply_to,
      html: emailContent
    });
    res.status(200).json({ message: `User role upgraded to ${role}` });
  } catch (error) {
    res.status(500);
    throw new Error("Email not sent, please try again");
  }
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
      bookedEvents,
      enrolledCourses
    } = user;

    res.status(200).json({
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
      bookedEvents,
      enrolledCourses
    });
  } else {
    res.status(404); // Return 404 if the user is not found
    throw new Error("User not found");
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
  const userId = req.user._id;

  try {
    // Find the user by ID and populate the booked events
    const user = await User.findById(userId).populate("bookedEvents");

    if (!user) {
      // Return 404 if the user is not found
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the user has booked any events
    // if (!user.bookedEvents.length) {
    //   return res.status(404).json({ message: "No booked events found for this user" });
    // }

    // Retrieve the event details for the booked events
    const bookedEvents = await Event.find({ _id: { $in: user.bookedEvents } })
      .populate("tickets")
      .select("title description date location");

    // Return the list of booked events
    res.status(200).json({ bookedEvents });
  } catch (error) {
    // Handle any errors during the process
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
