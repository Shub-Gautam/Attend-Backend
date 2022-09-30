const router = require("express").Router();
const authentication = require("../../middleware/authMiddleware");
const { fund } = require("../controllers");

router.post("/fetch", authentication.isCustomerValid, fund.fetDonations);

router.post("/donate", authentication.isCustomerValid, fund.donate);

module.exports = router;
