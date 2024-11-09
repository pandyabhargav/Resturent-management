const express = require("express");
const Joi = require("joi");

const {
  RestaurantAdd,
  RestaurantsGet,
  RestaurantGet,
  RestaurantUpdate,
  RestaurantDelete,
} = require("../controllers/RestaurantController.js");

const validateRequest = require("../middleware/validate-request.js");

const { authMiddleware, logout } = require("../middleware/authMiddleware.js");
const router = express.Router();

router.post("/restaurant-add", AddValidation, RestaurantAdd);
router.get("/restaurants-get", RestaurantsGet);
router.get("/restaurant-get/:id", authMiddleware, RestaurantGet);
router.put(
  "/restaurant-update/:id",
  authMiddleware,
  UpdateValidation,
  RestaurantUpdate
);
router.delete("/restaurant-delete/:id", authMiddleware, RestaurantDelete);

function AddValidation(req, res, next) {
  const schema = Joi.object({
    restaurantName: Joi.string().min(1).max(100).required(),
    restaurantAddress: Joi.string().min(1).max(100).required(),
    country: Joi.string().min(1).max(100).required(),
    state: Joi.string().min(1).max(100).required(),
    city: Joi.string().min(1).max(100).required(),
    zipCode: Joi.number().integer().min(3).required(),
  });
  validateRequest(req, res, next, schema);
}

function UpdateValidation(req, res, next) {
  const schema = Joi.object({
    restaurantName: Joi.string().min(1).max(100).optional(),
    restaurantAddress: Joi.string().min(1).max(100).optional(),
    country: Joi.string().min(1).max(100).optional(),
    state: Joi.string().min(1).max(100).optional(),
    city: Joi.string().min(1).max(100).optional(),
    zipCode: Joi.number().integer().min(100000).max(999999).optional(),
  });
  validateRequest(req, res, next, schema);
}

module.exports = router;
