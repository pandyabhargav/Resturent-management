const express = require("express");
const Joi = require("joi");

const {
  RestaurantOrdersGet,
  RestaurantOrderDelete,
} = require("../controllers/RestaurantOrderController.js");

const validateRequest = require("../middleware/validate-request.js");

const {
  userAuthMiddleware,
  authMiddleware,
  logout,
} = require("../middleware/authMiddleware.js");
const router = express.Router();

router.get("/restaurantorders-get", authMiddleware, RestaurantOrdersGet);
router.delete(
  "/restaurantorder-delete",
  userAuthMiddleware,
  authMiddleware,
  RestaurantOrderDelete
);

module.exports = router;
