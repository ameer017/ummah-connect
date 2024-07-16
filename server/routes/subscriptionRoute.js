const express = require('express');
const Subscription = require('../models/subscribeModel');
const router = express.Router();


router.post('/subscribe', async (req, res) => {
    try {
        const { email } = req.body;
        const newSubscription = new Subscription({ email });
        await newSubscription.save();
        res.status(201).json({ message: 'Subscription successful' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


router.post('/unsubscribe', async (req, res) => {
    try {
        const { email } = req.body;
        await Subscription.findOneAndDelete({ email });
        res.status(200).json({ message: 'Unsubscribed successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


router.get('/subscriptions', async (req, res) => {
    try {
        const subscriptions = await Subscription.find();
        res.status(200).json(subscriptions);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
