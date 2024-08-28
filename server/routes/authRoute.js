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

	generateStripeAccountLink,
	completeStripeConnectOnboarding,
} = require("../controllers/authController");
const { protect, adminOnly } = require("../middleware/authMiddleware");
const { getPayoutDetails, initiatePayout } = require("../controllers/courseController");

const router = express.Router();
router.post("/login", login);
router.post("/register", register);
router.post("/forgot-password", forgotPassword);
router.post("/sendVerificationEmail", protect, sendVerificationEmail);
router.post("/upgradeUser", protect, adminOnly, upgradeUser);
router.post("/logout", logoutUser);
router.post("/sendAutomatedEmail", protect, sendAutomatedEmail);

router.post("/login-with-google/callback", loginWithGoogle);

router.get("/get-user/:userId", protect, getUser);
router.get("/get-users", protect, getUsers);
router.get("/login-status", loginStatus);

router.patch("/update-user", protect, updateUser);
router.patch("/reset-password/:resetToken", resetPassword);
router.patch("/verify-user/:verificationToken", verifyUser);
router.post(
	"/generate-stripe-account-link",
	protect,
	generateStripeAccountLink
);
router.post(
	"/complete-stripe-connect-onboarding",
	protect,
	completeStripeConnectOnboarding
);

router.get("/payouts/get-payout-details", protect, getPayoutDetails)
router.post("/payouts/initiate-payout", protect, initiatePayout)
router.get("/:userId/booked-events", protect, getUserBookedEvents);

router.delete("/:id", protect, deleteUser);

module.exports = router;
