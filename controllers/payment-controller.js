const { StatusCodes } = require("http-status-codes");
const { SecretsConfig, Mongoose } = require("../configs");
const User = require("../models/user");
const Payment = require("../models/payment");


const stripe = require("stripe")(SecretsConfig.STRIPE_SECRET_KEY);

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

const completePayment = async (req, res) => {
  const { transactionId, uid } = req.body;

  try {
    const user = await User.findOne({ uid })
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "User not found",
        data: {},
        error: {},
      });
    }

    const payment = await Payment.create({
      transactionId,
      userId: user._id,
    })

    const userUpdate = await User.updateOne(
      { _id: user._id },
      { badge: "gold" }
    )

    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Payment completed successfully",
      data: payment,
      error: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Payment not completed",
      data: {},
      error: error.message,
    });
  }
};

module.exports = {
  createCheckoutSession,
  completePayment,
};
