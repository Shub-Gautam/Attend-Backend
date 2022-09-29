const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const path = require("path");
const Models = require("../../models");
const universal = require("../../utils");
const statusCodes = require("../../constant/statusCodes");
const messages = require("../../constant/messages");
const qr = require("qrcode");

exports.registerUser = async (req, res, next) => {
  try {
    console.log(req.body);

    const createdUser = await Models.user.create({
      name: req.body.name,
      password: req.body.password,
      "email.id": req.body.email,
      "phone.number": Number(req.body.phone),
      username: req.body.username,
      gender: req.body.gender,
      city: "Rohini",
      role: "a",
      dateOfBirth: new Date(req.body.dob),
    });

    qr.toFile("assets/foo.png", `${createdUser._id}`, (err, result) => {
      if (err) {
        console.log(err);
        universal.errorResponse(res, statusCodes.BAD, err);
      } else {
        console.log(result + "File Saved ===== QR");
      }
    });

    const link = await universal.upload_to_cloudinary("assets/foo.png");

    await Models.user.updateOne(
      { _id: createdUser._id },
      { qrlink: link.secure_url }
    );

    const token = await universal.jwtSign(createdUser);

    console.log(token);

    universal.successResponse(res, statusCodes.OK, messages.USER_CREATED, {
      userID: createdUser._id,
      token: token,
    });
  } catch (err) {
    await Models.user.deleteOne({ username: req.body.username });
    next(err);
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    console.log(req.body);
    req.user = await Models.user.findOne({ "email.id": req.body.email });
    if (!req.user) {
      return universal.errorResponse(res, statusCodes.BAD, {
        messages: messages.USER_NOT_FOUND,
      });
    }

    let token;
    if (
      req.user.password === req.body.password &&
      req.user.email.id === req.body.email
    ) {
      token = await universal.jwtSign(req.user);
    } else {
      return universal.successResponse(
        res,
        statusCodes.INVALID_CRED,
        messages.FAILED,
        {}
      );
    }
    universal.successResponse(res, statusCodes.OK, messages.SUCCESSFULL, {
      token: token,
    });
  } catch (err) {
    next(err);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    console.log(req.body);
    console.log(req.user);

    if (!req.user)
      return universal.successResponse(
        res,
        statusCodes.USER_NOT_FOUND,
        messages.FAILED,
        {}
      );

    universal.successResponse(res, statusCodes.OK, messages.SUCCESSFULL, {
      user: req.user,
    });
  } catch (err) {
    next(err);
  }
};
