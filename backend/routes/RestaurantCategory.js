const express = require("express");
const Joi = require("joi");

const {
  RestaurantCategoryAdd,
  RestaurantCategorysGet,
  RestaurantCategoryGet,
  RestaurantCategoryUpdate,
  RestaurantCategoryDelete,
} = require("../controllers/RestaurantCategoryController.js");

const validateRequest = require("../middleware/validate-request.js");

const { authMiddleware, logout } = require("../middleware/authMiddleware.js");
const router = express.Router();

router.post(
  "/restaurantcategory-add",
  authMiddleware,
  AddValidation,
  RestaurantCategoryAdd
);
router.get("/restaurantcategorys-get", RestaurantCategorysGet);
router.get("/restaurantcategory-get/:id", RestaurantCategoryGet);
router.put(
  "/restaurantcategory-update/:id",
  UpdateValidation,
  authMiddleware,
  RestaurantCategoryUpdate
);
router.delete(
  "/restaurantcategory-delete/:id",
  authMiddleware,
  RestaurantCategoryDelete
);

function AddValidation(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().min(1).max(100).required(),
    restaurant: Joi.string().default(req.user.restaurant),
    image: Joi.string().required(),
    createdBy: Joi.string().default(
      req.user.firstName + " " + req.user.lastName
    ),
    lastModifiedBy: Joi.string().default(
      req.user.firstName + " " + req.user.lastName
    ),
  });
  validateRequest(req, res, next, schema);
}

function GetValidation(req, res, next) {
  const schema = Joi.object({
    restaurant: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
  });
  validateRequest(req, res, next, schema);
}

function UpdateValidation(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().min(1).max(100).optional(),
    image: Joi.string().optional(),
    lastModifiedBy: Joi.string().default(
      req.user.firstName + " " + req.user.lastName
    ),
  });
  validateRequest(req, res, next, schema);
}

module.exports = router;
