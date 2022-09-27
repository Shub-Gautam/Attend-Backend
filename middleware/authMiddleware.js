const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const stCodes = require("../constant/statusCodes");
const messages = require("../constant/messages");
const Model = require("../models/index");
const universal = require("../utils");

exports.isCustomerValid = async (req, res, next) => {
  console.log(req.body);
  try {
    if (req.user && req.user.guestMode && req.params.type !== "forgot") {
      next();
    } else if (req.body.token) {
      const accessToken = req.body.token;
      const decodeData = await universal.jwtVerify(accessToken);
      if (!decodeData) throw messages.INVALID_AUTH;

      console.log(decodeData);

      const userData = await Model.user
        .findOne({ _id: decodeData._id })
        .lean()
        .exec();
      if (userData) {
        req.user = userData;
        next();
      } else {
        return universal.errorResponse(
          res,
          stCodes.BAD_REQUEST,
          messages.CUSTOMER_NOT_EXIST,
          req.lang
        );
      }
    } else {
      throw messages.NO_AUTH;
    }
  } catch (error) {
    next(error);
  }
};
