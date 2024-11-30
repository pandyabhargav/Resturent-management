const express = require("express");
const Joi = require("joi");

const {
  RestaurantCategorysGet,
} = require("../controllers/RestaurantUserCategoryController.js");

const validateRequest = require("../middleware/validate-request.js");

const { authMiddleware, logout } = require("../middleware/authMiddleware.js");
const router = express.Router();

router.get("/restaurantusercategorys-get", RestaurantCategorysGet);

module.exports = router;
