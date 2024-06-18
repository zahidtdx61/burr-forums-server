const { Mongoose } = require("../configs");

const paymentSchema = new Mongoose.Schema({
  transactionId: {
    type: String,
    required: true,
  },
  userId: {
    type: Mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  paidAT: {
    type: Date,
    default: Date.now,
  },
});

const Payment = Mongoose.model("Payment", paymentSchema);
module.exports = Payment;
