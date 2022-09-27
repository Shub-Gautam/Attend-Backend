const router = require("express").Router();

const Routes = require("./routes/");

router.use("/auth", Routes.user);

module.exports = router;
