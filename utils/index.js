const jwt = require("jsonwebtoken");
const path = require("path");
const config = require("config");
const bcrypt = require("bcryptjs");

const messages = require("../constant/messages");

exports.successResponse = (res, status, message, data, lang = "en") => {
  if (/\s/.test(message)) message = message;
  else message = Messages[lang][message];
  // console.log({message});
  return res.status(status).send({ status, message, data: data });
};

exports.errorResponse = (res, status, error, lang = "en") => {
  let message;
  if (/\s/.test(error)) message = error;
  else message = Messages[lang][error];
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

// Otp Generate
exports.generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

exports.getMilliseconds = (minutes) => {
  return minutes * 60 * 1000;
};

exports.deleteFiles = async (filePaths) => {
  await filePaths.forEach((eachPath) => {
    console.log("Deleting File  .......", eachPath);
    eachPath = path.join(__dirname, "..", eachPath);
    console.log("Each Path.........", eachPath);
    fs.unlink(eachPath, (err) => {
      if (err) {
        console.log(err);
        throw messages.FILE_UNLINK_ERR;
      }
    });
  });
};

exports.generateRandomPassword = function () {
  var pass = "";
  var str =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "abcdefghijklmnopqrstuvwxyz0123456789@#$";
  for (i = 1; i <= 8; i++) {
    var char = Math.floor(Math.random() * str.length + 1);
    pass += str.charAt(char);
  }
  return pass;
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
