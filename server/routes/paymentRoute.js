const express = require("express");

const { protect } = require("../middleware/authMiddleware");
const {
	generateStripeAccountLink,
	completeStripeConnectOnboarding,
	getPayoutDetails,
	initiatePayout,
    getTransactionHistory
} = require("../controllers/paymentController");

const router = express.Router();
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

router.get("/get-payout-details", protect, getPayoutDetails);
router.get("/get-transaction-history", protect, getTransactionHistory);
router.post("/initiate-payout", protect, initiatePayout);

module.exports = router;
