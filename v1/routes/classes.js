const router = require("express").Router();
const authentication = require("../../middleware/authMiddleware");
const { classes } = require("../controllers");

router.post(
  "/add/student",
  authentication.isCustomerValid,
  classes.markAttendance
);

router.post("/add/event", authentication.isCustomerValid, classes.createEvent);

router.post(
  "/fetch/events",
  authentication.isCustomerValid,
  classes.fetchUserEvents
);

router.post("/fetch/event", authentication.isCustomerValid, classes.fetchEvent);

router.post(
  "/fetch/attendance",
  authentication.isCustomerValid,
  classes.fetchAttendance
);

router.post(
  "/download/attendance",
  authentication.isCustomerValid,
  classes.downloadAttendance
);

module.exports = router;
