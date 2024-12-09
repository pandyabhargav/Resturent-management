const express = require("express");
const Joi = require("joi");

const {
  RestaurantUserCartAdd,
  RestaurantUserCartsGet,
  RestaurantUserCartGet,
  RestaurantUserCartDelete,
} = require("../controllers/RestaurantUserCartController.js");

const validateRequest = require("../middleware/validate-request.js");

const {
  userAuthMiddleware,
  logout,
} = require("../middleware/authMiddleware.js");
const router = express.Router();
router.use(userAuthMiddleware);

router.post("/restaurantusercart-add", AddValidation, RestaurantUserCartAdd);
router.get("/restaurantusercarts-get", RestaurantUserCartsGet);
router.get("/restaurantusercart-get/:id", RestaurantUserCartGet);
router.delete("/restaurantusercart-delete", DeleteValidation, RestaurantUserCartDelete);

function AddValidation(req, res, next) {
  const schema = Joi.object({
    user: Joi.string().default(req.user._id),
    restaurant: Joi.string()
      .pattern(/^[0-9a-fA-F]{24}$/)
      .required(),
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
                .optional()
            )
            .optional(),
          quantity: Joi.number().integer().min(1).required(),
        })
      )
      .required(),
  });
  validateRequest(req, res, next, schema);
}

function DeleteValidation(req, res, next) {
  const schema = Joi.object({
    itemsId: Joi.array()
      .items(
        Joi.string()
          .pattern(/^[0-9a-fA-F]{24}$/) // Matching MongoDB ObjectId pattern
          .required()
      )
      .required(),
  });
  validateRequest(req, res, next, schema);
}

module.exports = router;
