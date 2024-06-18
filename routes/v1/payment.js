const express = require("express");
const { verifyJWT } = require("../../middlewares");
const serverConfig = require("../../configs/serverConfig");
const { PaymentController } = require("../../controllers");


const router = express.Router();

router.post("/create-checkout-session", verifyJWT, PaymentController.createCheckoutSession);

router.post("/complete-payment", verifyJWT, PaymentController.completePayment);

module.exports = router;
