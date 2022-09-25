const fs = require("fs");
const cors = require("cors");
const http = require("http");
const https = require("https");
const config = require("config");
const express = require("express");
const mongoose = require("mongoose");

// const messages = require("./constant/messages");

const PORT = config.get("PORT");
const MONGO_URI = config.get("MONGODB_URL");

let server;
const app = express();

const route = require("./route");
const universal = require("./utils");

console.log("NODE_ENV", process.env.NODE_ENV);
server = http.createServer(app);

//Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  const info = req.method + " " + res.statusCode + " " + req.url;
  console.log("API HIT -------------->", info, "\n|\nv\n|\nv\n");
  if (!req.header("lang") || req.header("lang") == "") req.lang = "en";
  else req.lang = req.header("lang");
  next();
});

// Test Api
app.use("/test", async (req, res, next) => {
  res.status(200).send({ status: 200, message: "TEST API" });
});

// Routes Api
app.use("/api", route);

// Error Middleware
app.use((error, req, res, next) => {
  console.log(
    "Error Midleware=================================>",
    error,
    error.message
  );
  let status = error.status || 400;
  if (error.status !== undefined) error = error.message;
  if (
    error.message == "jwt expired" ||
    error.message == "invalid signature" ||
    error.message == "invalid token"
  ) {
    status = 401;
    error = messages.UN_AUTHORIZED_USER;
    // return res.status(401).send({ status: 401, message: messages.UN_AUTHORIZED_USER });
  }
  if (error.message != undefined && error.message.includes("12 bytes"))
    error = messages.INVALID_ID;
  return universal.errorResponse(res, status, error, req.lang);
});

// Server Listening
server.listen(PORT, () => {
  console.log("====== PORT - " + PORT + " ========");
});

// Mongoose Connection
mongoose
  .connect(MONGO_URI, {
    user: config.get("MONGO_AUTH.USER"),
    pass: config.get("MONGO_AUTH.PASSWORD"),
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((result) => {
    console.log("===== Connected to MongoDB =====");
  })
  .catch((err) => {
    throw new Error("MongoDB Connection Error!", err);
  });
