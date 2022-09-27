const jwt = require("jsonwebtoken");
const path = require("path");
const config = require("config");
const bcrypt = require("bcryptjs");
const cloudinary = require("cloudinary");
const mongoose = require("mongoose");

exports.successResponse = (res, status, message, data) => {
  return res.status(status).send({ status, message, data: data });
};

exports.errorResponse = (res, status, error) => {
  let message;
  if (/\s/.test(error)) message = error;
  return res.status(status).send({ message, error: message });
};

// Bcrypt Hashing and Compare
exports.bcryptPassword = (password) => {
  return bcrypt.hash(password, 10);
};

exports.bcryptCompare = (password, hashPw) => {
  return bcrypt.compare(password, hashPw);
};

// JasonWebToken
exports.jwtSign = (payload) => {
  return jwt.sign(
    {
      _id: payload._id.toString(),
    },
    config.get("JWT_OPTIONS.SECRET_KEY"),
    { expiresIn: config.get("JWT_OPTIONS.EXPIRES_IN") }
  );
};

exports.jwtVerify = async (token) => {
  return jwt.verify(token, config.get("JWT_OPTIONS.SECRET_KEY"));
};

exports.refreshJwtSign = (payload) => {
  return jwt.sign(
    {
      _id: payload._id.toString(),
    },
    config.get("JWT_OPTIONS.REFRESH_SECRET_KEY"),
    { expiresIn: config.get("JWT_OPTIONS.REFRESH_EXPIRES_IN") }
  );
};

exports.refreshJwtVerify = async (token) => {
  return jwt.verify(token, config.get("JWT_OPTIONS.REFRESH_SECRET_KEY"));
};

exports.consoleRequest = (
  req,
  body = false,
  params = false,
  query = false,
  headers = false
) => {
  if (body)
    console.log(`Req.body ================> , ${JSON.stringify(req.body)}, \n`);
  if (params)
    console.log(
      `Req.params =================> , ${JSON.stringify(req.params)}, \n`
    );
  if (query)
    console.log(`Req.query =============> ', ${JSON.stringify(req.query)}, \n`);
  if (headers)
    console.log(
      `Req.headers =============> ', ${JSON.stringify(req.headers)}, \n`
    );
};

exports.upload_to_cloudinary = async (file_path) => {
  try {
    let rest;
    await cloudinary.v2.uploader.upload(file_path, (err, result) => {
      if (err) console.log(err);
      rest = result;
    });
    return rest;
  } catch (err) {
    console.log(err);
    // next(err);
  }
};
