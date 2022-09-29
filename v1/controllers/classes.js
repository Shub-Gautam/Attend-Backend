const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const path = require("path");
const Models = require("../../models");
const universal = require("../../utils");
const statusCodes = require("../../constant/statusCodes");
const messages = require("../../constant/messages");
const qr = require("qrcode");

exports.markAttendance = async (req, res, next) => {
  try {
    console.log(req.body);

    if (req.user.role !== "a")
      return universal.successResponse(
        res,
        statusCodes.OK,
        messages.NOT_AUTHORIZED,
        {}
      );

    const { eventId, studentId } = req.body;

    const Attandence = Models.attendance.create({
      eventId,
      studentId,
    });

    Models.universal.successResponse(
      res,
      statusCodes.OK,
      messages.ATTENDANCE_MARKED,
      {}
    );
  } catch (err) {
    await Models.user.deleteOne({ username: req.body.username });
    next(err);
  }
};

exports.createEvent = async (req, res, next) => {
  try {
    console.log(req.body);

    if (req.user.role !== "a")
      return universal.successResponse(
        res,
        statusCodes.OK,
        messages.NOT_AUTHORIZED,
        {}
      );

    const { Title, Venue, Description, Timings, Duration, EventType } =
      req.body;

    const organizer = req.user._id;

    const createdEvent = await Models.event.create({
      Title,
      Venue,
      Duration,
      EventType,
      Timings,
      Organizer: organizer,
      Description,
    });

    universal.successResponse(res, statusCodes.OK, messages.EVENT_CREATED, {});
  } catch (err) {
    await Models.user.deleteOne({ username: req.body.username });
    next(err);
  }
};
