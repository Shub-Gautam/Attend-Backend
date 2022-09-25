const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const Models = require("../../models");
const universal = require("../../utils");
const statusCodes = require("../../constant/statusCodes");

exports.getBookings = async (req, res, next) => {
  try {
    universal.successResponse(res, statusCodes.OK, `Bookings found.`, bookings);
  } catch (err) {
    next(err);
  }
};

exports.getBookingsHistory = (req, res, next) => {
  try {
    //
  } catch (err) {
    next(err);
  }
};
