const router = require("express").Router();

const Routes = require("./routes/");

router.use("/auth", Routes.user);
router.use("/class", Routes.classes);
router.use("/fund", Routes.fund);

module.exports = router;
