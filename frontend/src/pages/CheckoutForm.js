import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMessage, setPaymentMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    if (!stripe || !elements) {
      setPaymentMessage("Stripe is not loaded yet. Try again later.");
      return;
    }

    try {
      // Call Django endpoint to create PaymentIntent
      const { data } = await axios.post(
        "https://your-django-backend.com/create-payment-intent/",
        {
          amount: 5000, // Amount in cents ($50)
          currency: "usd",
        }
      );

      // Confirm payment with Stripe
      const { error, paymentIntent } = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (error) {
        setPaymentMessage(`Payment failed: ${error.message}`);
      } else if (paymentIntent.status === "succeeded") {
        setPaymentMessage("Payment successful!");
        console.log("PaymentIntent:", paymentIntent);
      }
    } catch (error) {
      setPaymentMessage("Error while processing payment. Try again.");
      console.error("Payment Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "auto" }}>
      <CardElement />
      <button type="submit" disabled={!stripe || isLoading}>
        {isLoading ? "Processing..." : "Pay"}
      </button>
      {paymentMessage && <p>{paymentMessage}</p>}
    </form>
  );
};

export default CheckoutForm;
