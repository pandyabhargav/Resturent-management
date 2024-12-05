const express = require("express");
const Joi = require("joi");

const {
  RestaurantUserItemsGet, RestaurantUserItemGet
} = require("../controllers/RestaurantUserItemController.js");

const validateRequest = require("../middleware/validate-request.js");

const { authMiddleware, userAuthMiddleware, logout } = require("../middleware/authMiddleware.js");
const router = express.Router();

router.get("/restaurantuseritems-get", userAuthMiddleware, RestaurantUserItemsGet);
router.get("/restaurantuseritem-get/:id", userAuthMiddleware, RestaurantUserItemGet);

module.exports = router;
