const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const path = require("path");
const Models = require("../../models");
const universal = require("../../utils");
const statusCodes = require("../../constant/statusCodes");
const messages = require("../../constant/messages");
const qr = require("qrcode");

exports.fetDonations = async (req, res, next) => {
  try {
    console.log(req.body);

    const donations = await Models.Fund.find({
      donor: req.user._id,
    });

    universal.successResponse(res, statusCodes.OK, messages.USER_CREATED, {
      donations,
    });
  } catch (err) {
    await Models.user.deleteOne({ username: req.body.username });
    next(err);
  }
};

exports.donate = async (req, res, next) => {
  try {
    console.log(req.body);
    console.log(req.user);

    const { amount, note } = req.body;

    await Models.Fund.create({
      Amount: amount,
      Note: note,
      donor: req.user._id,
      transactionId: req.user.transactionId,
    });

    await Models.universal.successResponse(
      res,
      statusCodes.OK,
      messages.DONATION_SUCCESSFULL,
      {
        user: req.user,
      }
    );
  } catch (err) {
    next(err);
  }
};
