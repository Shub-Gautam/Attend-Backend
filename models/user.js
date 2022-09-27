const { Schema, model, Types } = require("mongoose");

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    password: {
      type: String,
      trim: true,
    },
    email: {
      id: {
        type: String,
        required: true,
        trim: true,
        index: {
          unique: true,
          sparse: true,
        },
      },
      verified: {
        type: Boolean,
        default: false,
      },
      _id: false,
    },
    phone: {
      number: {
        type: Number,
        required: true,
        trim: true,
        index: {
          unique: true,
          sparse: true,
        },
      },
      verified: {
        type: Boolean,
        default: false,
      },
      _id: false,
    },
    picture: {
      type: String,
      trim: true,
      default: "",
    },
    qrlink: {
      type: String,
    },
    dateOfBirth: {
      type: Date,
    },
    gender: {
      type: String,
      enum: ["m", "f", "o", "d"],
    },
    city: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      enum: ["a", "v", "s"],
      default: "s",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("user", UserSchema);
