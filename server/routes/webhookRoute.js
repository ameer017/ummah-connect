const express = require("express");
const { handleStripeWebhook } = require("../controllers/paymentController");


const router = express.Router();
router.post("/webhook", handleStripeWebhook);

module.exports = router;
