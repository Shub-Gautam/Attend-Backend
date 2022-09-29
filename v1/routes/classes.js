const router = require("express").Router();
const authentication = require("../../middleware/authMiddleware");
const { classes } = require("../controllers");

router.post(
  "/add/student",
  authentication.isCustomerValid,
  classes.markAttendance
);

router.post("/add/event", authentication.isCustomerValid, classes.createEvent);

module.exports = router;
