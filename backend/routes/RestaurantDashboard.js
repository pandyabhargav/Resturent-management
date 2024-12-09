const express = require("express");
const Joi = require("joi");

const {
  RestaurantDashboardGet,
} = require("../controllers/RestaurantDashboardController.js");

const validateRequest = require("../middleware/validate-request.js");

const { authMiddleware, logout } = require("../middleware/authMiddleware.js");
const router = express.Router();

router.get("/restaurantdashboard-get", authMiddleware, RestaurantDashboardGet);

module.exports = router;
