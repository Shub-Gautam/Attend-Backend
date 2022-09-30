// Title, Venue, Description, Timings, Duration, EventType
const Joi = require("joi");
const { Schema, model, Types, default: mongoose } = require("mongoose");

const FundSchema = new Schema(
  {
    Note: {
      type: String,
      required: true,
      trim: true,
    },
    donor: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "user",
    },
    Amount: {
      type: String,
      required: true,
      trim: true,
    },
    transactionId: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("fund", FundSchema);
