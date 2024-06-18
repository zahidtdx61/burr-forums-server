const { Mongoose } = require("../configs");

const paymentSchema = new Mongoose.Schema({
  transactionId: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: Mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  paidAt: {
    type: Date,
    default: Date.now,
  },
});

const Payment = Mongoose.model("Payment", paymentSchema);
module.exports = Payment;
