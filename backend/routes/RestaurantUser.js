const express = require("express");
const Joi = require("joi");

const {
  RestaurantUserAdd,
  RestaurantUsersGet,
  RestaurantUserGet,
  RestaurantUserUpdate,
  RestaurantUserDelete,
} = require("../controllers/RestaurantUserController.js");

const validateRequest = require("../middleware/validate-request.js");

const { authMiddleware, logout } = require("../middleware/authMiddleware.js");
const router = express.Router();

router.post("/user-add", AddValidation, RestaurantUserAdd);
router.get("/users-get", authMiddleware, RestaurantUsersGet);
router.get("/user-get/:id", authMiddleware, RestaurantUserGet);
router.put(
  "/user-update/:id",
  authMiddleware,
  UpdateValidation,
  RestaurantUserUpdate
);
router.delete("/user-delete/:id", authMiddleware, RestaurantUserDelete);

function AddValidation(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().min(1).max(100).required(),
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
    name: Joi.string().min(1).max(100).optional(),
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
