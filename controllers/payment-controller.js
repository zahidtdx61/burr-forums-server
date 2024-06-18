const { StatusCodes } = require("http-status-codes");
const User = require("../../models/user");
const Payment = require("../../models/payment");
const { Mongoose } = require("../../configs");
const secretsConfig = require("../../configs/secretsConfig");

const stripe = require("stripe")(secretsConfig.STRIPE_SECRET_KEY);

const createCheckoutSession = async (req, res) => {
  const { price } = req.body;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: price,
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
};

module.exports = {
  createCheckoutSession,
};
