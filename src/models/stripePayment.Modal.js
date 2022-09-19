const mongoose = require("mongoose");
var Schema = mongoose.Schema
const stripePaymentSchema = mongoose.Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId, ref: 'metaMask',
      required: [true, 'User id is required.'],
    },
    payment_id: {
      type: String,
      required: [true, 'Payment id is required.'],
    },
    payment_intent: {
      type: String,
      required: [true, 'payment intent id is required.'],
    },
    amount: {
      type: Number,
      required: [true, 'Amount is required.'],
      default: 0
    },
    raw_data: {
      type: String,
      default: ''
    },
    payment_status: {
      type: String,
      default: ''
    },
    payment_url: {
      type: String,
      default: ""
    },
  },
  {
    timestamps: true,
  }
);


const stripePayment = mongoose.model('stripePayment', stripePaymentSchema);

module.exports = stripePayment;
