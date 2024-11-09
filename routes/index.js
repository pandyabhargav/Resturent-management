const router = require("express").Router();

//! Auth Router
router.use("/api/v1/auth", require("./Auth.js"));

//! Restaurant Owner Router
router.use("/api/v1/owner", require("./RestaurantOwner.js"));

//! Restaurant Router
router.use("/api/v1/restaurant", require("./Restaurant.js"));

module.exports = router;