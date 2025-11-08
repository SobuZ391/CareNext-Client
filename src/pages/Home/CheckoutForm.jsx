// src/components/CheckoutForm.js
import React, { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import { Helmet } from "react-helmet-async";
import { useCart } from "../../CartPage/CartContext";

const CheckoutForm = ({ totalAmount, navigate, cartItems }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { clearCart } = useCart();

  // ✅ Get backend URL safely (fallback for dev)
  const BASE_URL =
    import.meta.env.VITE_SERVER_URL || "https://y-plum-nine.vercel.app";

  useEffect(() => {
    if (totalAmount > 0) {
      axios
        .post(`${BASE_URL}/create-payment-intent`, {
          amount: totalAmount * 100, // convert to cents
        })
        .then((response) => {
          setClientSecret(response.data.clientSecret);
        })
        .catch((error) => {
          console.error("Error creating payment intent:", error);
          Swal.fire({
            title: "Server Error",
            text: "Failed to initialize payment. Please try again later.",
            icon: "error",
          });
        });
    }
  }, [totalAmount, BASE_URL]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements || !clientSecret) return;
    if (!user) {
      Swal.fire("Login Required", "Please login to complete payment.", "info");
      return;
    }

    setLoading(true);

    const cardElement = elements.getElement(CardElement);

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: user.displayName || "Anonymous",
            email: user.email,
          },
        },
      }
    );

    if (error) {
      Swal.fire({
        title: "Payment Failed",
        text: error.message,
        icon: "error",
      });
      setLoading(false);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      try {
        // ✅ Build order data for invoice + DB
        const orderData = {
          transactionId: paymentIntent.id,
          amount: totalAmount,
          status: "paid",
          email: user.email,
          buyerName: user.displayName,
          items: cartItems.map((item) => ({
            id: item._id,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
          })),
          date: new Date().toISOString(),
        };

        // ✅ Save order to backend
        await axios.post(`${BASE_URL}/confirm-payment`, orderData);

        // ✅ Clear cart
        clearCart();

        // ✅ Success message and redirect
        Swal.fire({
          title: "Payment Successful 🎉",
          text: `Your payment of $${totalAmount.toFixed(2)} was successful.`,
          icon: "success",
        }).then(() => {
          navigate("/invoice", { state: { order: orderData } });
        });
      } catch (err) {
        console.error("Error saving payment:", err);
        Swal.fire({
          title: "Error",
          text: "There was an error saving the payment confirmation.",
          icon: "error",
        });
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
      Swal.fire({
        title: "Payment Incomplete",
        text: "The payment did not complete successfully.",
        icon: "warning",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 border rounded-xl shadow-lg bg-white mt-10"
    >
      <Helmet>
        <title>CareNext Pharmacy | Payment Checkout</title>
      </Helmet>

      <h2 className="text-2xl font-bold mb-4 text-gray-800">Payment Details</h2>

      <div className="mb-5 border p-3 rounded-md">
        <CardElement options={{ style: { base: { fontSize: "16px" } } }} />
      </div>

      <button
        type="submit"
        disabled={!stripe || !clientSecret || loading}
        className={`w-full py-2 px-4 text-white font-bold rounded-md ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-700"
        }`}
      >
        {loading ? "Processing..." : `Pay $${totalAmount.toFixed(2)}`}
      </button>

      <div className="mt-4 flex justify-center">
        <img
          className="rounded-lg shadow-md w-64"
          src="https://img.freepik.com/free-photo/3d-payment-terminal-bank-card-blue-checkmark_107791-17014.jpg"
          alt="Payment Illustration"
        />
      </div>
    </form>
  );
};

export default CheckoutForm;
