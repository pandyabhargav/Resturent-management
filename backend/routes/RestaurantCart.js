const express = require("express");
const Joi = require("joi");

const {
  RestaurantCartAdd,
  RestaurantCartsGet,
  RestaurantCartGet,
  RestaurantCartUpdate,
  RestaurantCartDelete,
} = require("../controllers/RestaurantCartController.js");

const validateRequest = require("../middleware/validate-request.js");

const { authMiddleware, logout } = require("../middleware/authMiddleware.js");
const router = express.Router();
router.use(authMiddleware);

router.post("/restaurantcart-add", AddValidation, RestaurantCartAdd);
router.get("/restaurantcarts-get", RestaurantCartsGet);
router.get("/restaurantcart-get/:id", authMiddleware, RestaurantCartGet);
router.put(
  "/restaurantcart-update/:id",
  authMiddleware,
  UpdateValidation,
  RestaurantCartUpdate
);
router.delete(
  "/restaurantcart-delete/:id",
  authMiddleware,
  RestaurantCartDelete
);

function AddValidation(req, res, next) {
  const schema = Joi.object({
    user: Joi.string().default(req.user._id),
    items: Joi.array()
      .items(
        Joi.object({
          item: Joi.string()
            .pattern(/^[0-9a-fA-F]{24}$/)
            .required(),
          customizationList: Joi.array()
            .items(
              Joi.string()
                .pattern(/^[0-9a-fA-F]{24}$/)
                .required()
            )
            .required(),
          quantity: Joi.number().integer().min(1).required(),
          price: Joi.number().optional(),
        })
      )
      .required(),
  });
  validateRequest(req, res, next, schema);
}

function UpdateValidation(req, res, next) {
  const schema = Joi.object({
    restaurantcartName: Joi.string().min(1).max(100).optional(),
    restaurantcartAddress: Joi.string().min(1).max(100).optional(),
    country: Joi.string().min(1).max(100).optional(),
    state: Joi.string().min(1).max(100).optional(),
    city: Joi.string().min(1).max(100).optional(),
    zipCode: Joi.number().integer().min(100000).max(999999).optional(),
  });
  validateRequest(req, res, next, schema);
}

module.exports = router;
