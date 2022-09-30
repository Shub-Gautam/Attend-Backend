// Title, Venue, Description, Timings, Duration, EventType
const Joi = require("joi");
const { Schema, model, Types, default: mongoose } = require("mongoose");

const EventSchema = new Schema(
  {
    Title: {
      type: String,
      required: true,
      trim: true,
    },
    Venue: {
      type: String,
      required: true,
      trim: true,
    },
    Description: {
      type: String,
      trim: true,
    },
    Organizer: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    Duration: {
      type: String,
      required: true,
    },
    EventType: {
      type: String,
      enum: ["class", "event"],
      default: "class",
    },
    Timings: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("event", EventSchema);
