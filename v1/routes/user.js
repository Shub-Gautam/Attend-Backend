const router = require("express").Router();
const authentication = require("../../middleware/authMiddleware");
const { user } = require("../controllers");

router.post("/add", user.registerUser);
router.get("/login", user.loginUser);

module.exports = router;
