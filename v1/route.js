const router = require("express").Router();

const Routes = require("./routes/");

router.use("/auth", Routes.user);
router.use("/class", Routes.classes);

module.exports = router;
