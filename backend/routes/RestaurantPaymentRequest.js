const express = require("express");
const Joi = require("joi");

const {
  RestaurantPaymentRequestConfirm,
} = require("../controllers/RestaurantPaymentRequestController.js");

const validateRequest = require("../middleware/validate-request.js");

const { authMiddleware, logout } = require("../middleware/authMiddleware.js");
const router = express.Router();
router.use(authMiddleware);

router.post(
  "/restaurantpayment-confirm",
  AddValidation,
  RestaurantPaymentRequestConfirm
);
// router.get("/restaurants-get", authMiddleware, RestaurantsGet);
// router.get("/restaurant-get/:id", authMiddleware, RestaurantGet);
// router.put(
//   "/restaurant-update/:id",
//   authMiddleware,
//   UpdateValidation,
//   RestaurantUpdate
// );
// router.delete("/restaurant-delete/:id", authMiddleware, RestaurantDelete);

function AddValidation(req, res, next) {
  const schema = Joi.object({
    cart: Joi.string()
      .pattern(/^[0-9a-fA-F]{24}$/)
      .required(),
    type: Joi.string().valid("Parcel", "Onsite").required(),
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
