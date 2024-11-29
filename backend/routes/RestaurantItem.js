const express = require("express");
const Joi = require("joi");

const {
  RestaurantItemAdd,
  RestaurantItemsGet,
  RestaurantItemGet,
  RestaurantItemUpdate,
  RestaurantItemDelete,
} = require("../controllers/RestaurantItemController.js");

const validateRequest = require("../middleware/validate-request.js");

const { authMiddleware, logout } = require("../middleware/authMiddleware.js");
const router = express.Router();

router.use(authMiddleware);
router.post("/restaurantitem-add", AddValidation, RestaurantItemAdd);
router.get("/restaurantitems-get", RestaurantItemsGet);
router.get("/restaurantitem-get/:id", RestaurantItemGet);
router.put(
  "/restaurantitem-update/:id",
  UpdateValidation,
  RestaurantItemUpdate
);
router.delete("/restaurantitem-delete/:id", RestaurantItemDelete);

function AddValidation(req, res, next) {
  const schema = Joi.object({
    category: Joi.string()
      .required()
      .regex(/^[0-9a-fA-F]{24}$/),
    name: Joi.string().min(1).max(100).required(),
    ingredients: Joi.string().optional(),
    price: Joi.number().min(0).max(999).required(),
    discount: Joi.number().min(0).max(100).optional(),
    itemType: Joi.string().valid("Veg", "Nonveg").required(),
    type: Joi.string().valid("Spicy", "Sweet").required(),
    options: Joi.string().valid("Less", "Regular", "Extra").required(),
    image: Joi.string().uri().optional(),
    customization: Joi.array()
      .items(
        Joi.object({
          title: Joi.string().required(),
          selection: Joi.string().valid("Single", "Multiple").required(),
          list: Joi.array()
            .items(
              Joi.object({
                name: Joi.string().required(),
                detail: Joi.string().optional(),
                extraRate: Joi.number().min(0).max(999).required(),
              })
            )
            .optional(),
        })
      )
      .optional(),
    createdBy: Joi.string().default(
      req.user.firstName + " " + req.user.lastName
    ),
    lastModifiedBy: Joi.string().default(
      req.user.firstName + " " + req.user.lastName
    ),
  });
  validateRequest(req, res, next, schema);
}

function UpdateValidation(req, res, next) {
  const schema = Joi.object({
    // category: Joi.string().optional().regex(/^[0-9a-fA-F]{24}$/),
    name: Joi.string().min(1).max(100).optional(),
    ingredients: Joi.string().optional(),
    price: Joi.number().positive().optional(),
    discount: Joi.number().positive().min(0).max(100).optional(),
    itemType: Joi.string().valid("Veg", "Nonveg").optional(),
    type: Joi.string().valid("Spicy", "Sweet").optional(),
    options: Joi.string().valid("Less", "Regular", "Extra").optional(),
    image: Joi.string().uri().optional(),
    // customization: Joi.array()
    //   .items(
    //     Joi.object({
    //       customizationid: Joi.string()
    //         .optional()
    //         .regex(/^[0-9a-fA-F]{24}$/),
    //       title: Joi.string().optional(),
    //       selection: Joi.string().valid("Single", "Multiple").optional(),
    //       list: Joi.array()
    //         .items(
    //           Joi.object({
    //             listid: Joi.string()
    //               .optional()
    //               .regex(/^[0-9a-fA-F]{24}$/),
    //             name: Joi.string().optional(),
    //             detail: Joi.string().optional(),
    //             extraRate: Joi.number().positive().optional(),
    //           })
    //         )
    //         .optional(),
    //     })
    //   ).optional(),
    availability: Joi.string().valid("Available", "Unavailable").optional(),
    lastModifiedBy: Joi.string().default(
      req.user.firstName + " " + req.user.lastName
    ),
  });
  validateRequest(req, res, next, schema);
}

module.exports = router;
