import React from "react";
import { FlutterWaveButton } from 'flutterwave-react-v3';
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
const URL = import.meta.env.VITE_APP_BACKEND_URL;


const stripePromise = loadStripe(import.meta.env.VITE_APP_STRIPE_PUBLIC_KEY);


const PaymentOptionModal = ({ show, onClose, fwConfig, eventId, quantity, userId, price }) => {
  if (!show) return null;

  const handleStripePayment = async () => {
    console.log("loooading!!!")
    try {
      // Create a checkout session in the backend
      const response = await axios.post(`${URL}/api/webhook/event`, {
        eventId,
        quantity,
        userId,
        price,
      });

      const { sessionId } = response.data;

      // Redirect to Stripe Checkout
      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId });
    } catch (error) {
      console.error("Error with Stripe payment:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] md:w-[500px] cursor-pointer" onClick={onClose}>
        <div className="flex justify-between my-4">
          <h3 className="text-lg font-bold mb-4">Choose your payment method</h3>
          <button onClick={onClose} className="  text-red-500 p-2 rounded border">Close</button>

        </div>
        <div className="flex flex-col gap-4">

          <FlutterWaveButton className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700" {...fwConfig} text="Pay with flutterwave" />

          {/* Stripe Payment */}
          <button
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
            onClick={handleStripePayment}
          >
            Pay with Stripe
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentOptionModal;
