const express = require("express");
const { handleStripeWebhook, eventPaymentHook } = require("../controllers/paymentController");
const bodyParser = require("body-parser")

const router = express.Router();
router.post("/webhook", handleStripeWebhook);
router.post("/webhook/event", eventPaymentHook);

module.exports = router;
