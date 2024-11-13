const express = require("express");
const Joi = require("joi");

const {
  RestaurantOwnerAdd,
  RestaurantOwnersGet,
  RestaurantOwnerGet,
  RestaurantOwnerUpdate,
  RestaurantOwnerDelete,
} = require("../controllers/RestaurantOwnerController.js");

const validateRequest = require("../middleware/validate-request.js");

const { authMiddleware, logout } = require("../middleware/authMiddleware.js");
const router = express.Router();

router.post("/owner-add", AddValidation, RestaurantOwnerAdd);
router.get("/owners-get", authMiddleware, RestaurantOwnersGet);
router.get("/owner-get/:id", authMiddleware, RestaurantOwnerGet);
router.put(
  "/owner-update/:id",
  authMiddleware,
  UpdateValidation,
  RestaurantOwnerUpdate
);
router.delete("/owner-delete/:id", authMiddleware, RestaurantOwnerDelete);

function AddValidation(req, res, next) {
  const schema = Joi.object({
    firstName: Joi.string().min(1).max(100).required(),
    lastName: Joi.string().min(1).max(100).required(),
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password: Joi.string().min(6).max(255).required(),
    country: Joi.string().min(1).max(100).required(),
    state: Joi.string().min(1).max(100).required(),
    city: Joi.string().min(1).max(100).required(),
    restaurant: Joi.string().required(),
    phoneNumber: Joi.number()
      .integer()
      .min(1000000000)
      .max(9999999999)
      .required(),
  });
  validateRequest(req, res, next, schema);
}

function UpdateValidation(req, res, next) {
  const schema = Joi.object({
    firstName: Joi.string().min(1).max(100).optional(),
    lastName: Joi.string().min(1).max(100).optional(),
    email: Joi.string().email({ minDomainSegments: 2 }).optional(),
    password: Joi.string().min(6).max(255).optional(),
    country: Joi.string().min(1).max(100).optional(),
    state: Joi.string().min(1).max(100).optional(),
    city: Joi.string().min(1).max(100).optional(),
    restaurant: Joi.string().optional(),
    gender: Joi.string().valid("male", "female", "other").optional(),
    phoneNumber: Joi.number()
      .integer()
      .min(1000000000)
      .max(9999999999)
      .optional(),
    isActive: Joi.number().integer().optional(),
  });
  validateRequest(req, res, next, schema);
}

module.exports = router;
