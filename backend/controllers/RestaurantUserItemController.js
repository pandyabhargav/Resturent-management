const RestaurantItem = require("../models/Item.js");
const RestaurantItemCustomization = require("../models/Customization.js");
const RestaurantCategory = require("../models/Category.js");

const RestaurantUserItemsGet = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;

        const skip = (page - 1) * limit;

        const existingRestaurantItem = await RestaurantItem.find()
            .populate("customization")
            .populate({
                path: "category",
                select: "_id restaurant",
<<<<<<< HEAD
=======
                match: { restaurant: req.user.restaurant },
>>>>>>> f252d322f86300329252685c828efa076b1ca23e
            })
            .skip(skip)
            .limit(parseInt(limit))
            .exec();

        if (!existingRestaurantItem) {
            return res.status(400).json({
                success: false,
                message: "The Restaurant Item data does not exist.",
            });
        }
        const filteredRestaurantItems = existingRestaurantItem.filter(
            (item) => item.category !== null
        );
        const totalCategories = filteredRestaurantItems.length;

        return res.status(200).json({
            success: true,
            pagination: {
                total: totalCategories,
                page: parseInt(page),
                limit: parseInt(limit),
                totalPages: Math.ceil(totalCategories / limit),
            },
            data: filteredRestaurantItems,
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

const RestaurantUserItemGet = async (req, res) => {
    try {
        const { id } = req.params;
        const restaurantitems = await RestaurantItem.findById(id).populate(
            "customization"
        );
        if (!restaurantitems) {
            return res.status(400).json({
                success: false,
                message: "The Restaurant Item data does not exist.",
            });
        }
        return res.status(200).json({ success: true, data: restaurantitems });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};


module.exports = {
    RestaurantUserItemsGet,
    RestaurantUserItemGet,
};