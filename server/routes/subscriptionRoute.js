const express = require("express");
const Subscription = require("../models/subscribeModel");
const { sendEmail } = require("../utils");
const router = express.Router();

router.post("/subscribe", async (req, res) => {
  try {
    const { email } = req.body;

    // Check if email already exists
    const exists = await Subscription.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Email already subscribed." });
    }

    // Create a new subscription
    const newSubscription = new Subscription({ email });
    const subscribe = await newSubscription.save();

    if (subscribe) {
      const unsubscribeLink = `${
        process.env.FRONTEND_URL
      }/unsubscribe?email=${encodeURIComponent(subscribe.email)}`;

      await sendEmail({
        from: process.env.EMAIL_USER,
        to: subscribe.email,
        subject: "Subscription Confirmation - Welcome to Ummah Connect!",
        html: `
            <p>As-salamu 'alaikum,</p>
            <p>Thank you for subscribing to Ummah Connect!</p>
            <p>We are thrilled to have you join our community. Your subscription has been successfully confirmed, and you are now set to receive all the latest updates, exclusive content, and special offers from us.</p>
            <p>Here's what you can expect as a subscriber:</p>
            <ul>
              <li>Monthly newsletters with the latest news and insights.</li>
              <li>Early access to new features and updates.</li>
            </ul>
            <p>We hope you enjoy being part of our community. If you have any questions or need assistance, feel free to reach out to our support team at ${process.env.EMAIL_USER}.</p>
            <p>Thank you once again for subscribing!</p>
            <p>Best regards,</p>
            Ummah Connect
            <p>If you did not subscribe to this service or believe this message was sent in error, please contact our support team immediately.</p>
          <p>If you wish to unsubscribe, please click <a href="${unsubscribeLink}">here</a>.</p>
        
          `,
      });
    }

    res.status(201).json({ message: "Subscription successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/unsubscribe", async (req, res) => {
  try {
    const { email } = req.body;
    await Subscription.findOneAndDelete({ email });
    res.status(200).json({ message: "Unsubscribed successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/unsubscribe", async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    await Subscription.findOneAndDelete({ email });
    res.status(200).send("You have successfully unsubscribed.");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/subscriptions", async (req, res) => {
  try {
    const subscriptions = await Subscription.find();
    res.status(200).json(subscriptions);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
