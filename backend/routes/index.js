const router = require("express").Router();

//! Auth Router
router.use("/api/v1/auth", require("./Auth.js"));

//! Restaurant Owner Router
router.use("/api/v1/owner", require("./RestaurantOwner.js"));

//! Restaurant Router
router.use("/api/v1/dashboard", require("./RestaurantDashboard.js"));

//! Restaurant Router
router.use("/api/v1/restaurant", require("./Restaurant.js"));

//! Restaurant Category Router
router.use("/api/v1/category", require("./RestaurantCategory.js"));

//! Restaurant Item Router
router.use("/api/v1/item", require("./RestaurantItem.js"));

//! Restaurant Item Router
router.use("/api/v1/cart", require("./RestaurantCart.js"));

//! Restaurant Order Router
router.use("/api/v1/order", require("./RestaurantOrder.js"));

//! Restaurant IMG Upload Router
router.use("/api/v1/upload", require("./Upload.js"));

//! Restaurant User Router
router.use("/api/v1/user", require("./RestaurantUser.js"));

//! Restaurant Payment Request Router
router.use("/api/v1/paymentrequest", require("./RestaurantPaymentRequest.js"));

module.exports = router;
