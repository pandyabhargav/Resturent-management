const express = require("express");
const Joi = require("joi");

const {
    RestaurantUserOrderAdd,
    RestaurantUserOrdersGet,
    RestaurantUserOrderDelete,
} = require("../controllers/RestaurantUserOrderController.js");

const validateRequest = require("../middleware/validate-request.js");

const {
    userAuthMiddleware,
    authMiddleware,
    logout,
} = require("../middleware/authMiddleware.js");
const router = express.Router();

router.post(
    "/restaurantuserorder-add",
    userAuthMiddleware,
    AddValidation,
    RestaurantUserOrderAdd
);
router.get("/restaurantuserorders-get", userAuthMiddleware, RestaurantUserOrdersGet);
router.delete(
    "/restaurantuserorder-delete",
    userAuthMiddleware,
    authMiddleware,
    RestaurantUserOrderDelete
);

function AddValidation(req, res, next) {
    const schema = Joi.object({
        user: Joi.string().default(req.user._id),
        // cart: Joi.string()
        //   .pattern(/^[0-9a-fA-F]{24}$/)
        //   .required(),
        cookingRequest: Joi.string().allow("").max(255),
        payableAmount: Joi.number().required(),
        type: Joi.string().valid("Parcel", "Onsite").required(),
        // restaurantStatus: Joi.string().valid("Accept").optional(),
        paymentStatus: Joi.string().valid("Online", "Cash").optional(),
        status: Joi.string()
            .valid("Cancelled", "Pending", "Confirm")
            .default("Pending"),
    });
    validateRequest(req, res, next, schema);
}

module.exports = router;
