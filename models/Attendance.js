// Title, Venue, Description, Timings, Duration, EventType
const Joi = require("joi");
const { Schema, model, Types, default: mongoose } = require("mongoose");

const AttendanceSchema = new Schema(
  {
    eventId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "event",
    },
    studentId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "user",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("attendance", AttendanceSchema);
