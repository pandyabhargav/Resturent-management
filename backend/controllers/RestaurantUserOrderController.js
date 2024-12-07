const RestaurantOrder = require("../models/Order.js");
const RestaurantCart = require("../models/Cart.js");

const RestaurantUserOrderAdd = async (req, res) => {
    try {
        const { user } = req.body;

        const restaurantcart = await RestaurantCart.findOne({
            user,
            status: "Visible",
        });
        if (!restaurantcart) {
            return res.status(404).json({
                success: false,
                message: "The cart is currently empty. Please add items to your cart.",
            });
        }
        const restaurantuserorder = new RestaurantOrder({
            ...req.body,
            cart: restaurantcart._id,
            restaurant: restaurantcart.restaurant,
        });

        await restaurantuserorder.save();
        if (restaurantuserorder) {

            const updatedCart = await RestaurantCart.findOneAndUpdate(
                { _id: restaurantcart._id, user: user }, // Use the cart ID and user for specificity
                { $set: { status: "Hide" } }, // Update operation
                { new: true } // Return the updated document
            );

            // Check if the cart update was successful
            if (!updatedCart) {
                return res.status(400).json({
                    success: false,
                    message: "Failed to update the cart status.",
                });
            }

            return res.status(201).json({ success: true, data: restaurantuserorder });
        }
        return res.status(400).json({
            success: false,
            message: "Failed to create the order.",
        });
    } catch (error) {
        return res
            .status(404)
            .json({ success: false, error: error, message: error.message });
    }
};

const RestaurantUserOrdersGet = async (req, res) => {
    try {
        const { type, page = 1, limit = 10, paymentStatus, status } = req.query;

        const skip = (page - 1) * limit;

        let filter = {
            user: req.user._id,
        };

        if (type) {
            filter.type = type;
        }

        if (paymentStatus) {
            filter.paymentStatus = paymentStatus;
        }

        if (status) {
            filter.status = status;
        }

        console.log("Filter:", filter);

        const existingRestaurantUserOrder = await RestaurantOrder.find(filter)
            .populate("user", "-createdBy -createdAt -updatedAt -__v -isActive")
            .skip(skip)
            .limit(parseInt(limit))
            .exec();

        if (!existingRestaurantUserOrder) {
            return res.status(400).json({
                success: false,
                message: "The Restaurant User Order data does not exist.",
            });
        }

        const totalRestaurantUserOrder = await RestaurantOrder.countDocuments(filter);

        return res.status(200).json({
            success: true,
            pagination: {
                total: totalRestaurantUserOrder,
                page: parseInt(page),
                limit: parseInt(limit),
                totalPages: Math.ceil(totalRestaurantUserOrder / limit),
            },
            data: existingRestaurantUserOrder,
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

const RestaurantUserOrderUpdate = async (req, res) => {
    try {
        const { id } = req.params;

        const existingRestaurantUserOrder = await RestaurantOrder.findById(id);
        if (!existingRestaurantUserOrder) {
            return res.status(400).json({
                success: false,
                message: "The Restaurant User Order data does not exist.",
            });
        }
        const updatedRestaurantUserOrder = await RestaurantOrder.findByIdAndUpdate(
            id,
            {
                ...req.body,
            },
            { new: true, runValidators: true }
        );

        return res.status(200).json({ success: true, data: updatedRestaurantUserOrder });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

const RestaurantUserOrderDelete = async (req, res) => {
    try {
        const { id } = req.params;
        const restaurantuserorders = await RestaurantOrder.findByIdAndDelete(id);
        if (!restaurantuserorders) {
            return res.status(400).json({
                success: false,
                message: "The Restaurant User Order data does not exist.",
            });
        }
        return res.status(200).json({ success: true, data: "Restaurant User Order Delete" });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    RestaurantUserOrderAdd,
    RestaurantUserOrdersGet,
    RestaurantUserOrderUpdate,
    RestaurantUserOrderDelete,
};
