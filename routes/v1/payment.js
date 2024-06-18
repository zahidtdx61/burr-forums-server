const express = require("express");
const { verifyJWT } = require("../../middlewares");
const secretsConfig = require("../../configs/secretsConfig");
const serverConfig = require("../../configs/serverConfig");
const { StatusCodes } = require("http-status-codes");

const router = express.Router();
const stripe = require("stripe")(secretsConfig.STRIPE_SECRET_KEY);

const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 400;
};

router.post("/create-checkout-session", verifyJWT, async (req, res) => {
  const { items } = req.body;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "usd",
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  });

  return res.status(StatusCodes.OK).json({
    success: true,
    message: "Payment intent created!",
    data: {
      clientSecret: paymentIntent.client_secret,
    },
    error: {},
  });
});

module.exports = router;
