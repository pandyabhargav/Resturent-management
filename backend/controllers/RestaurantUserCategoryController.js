const Category = require("../models/Category.js");
const RestaurantItem = require("../models/Item.js");

const RestaurantCategorysGet = async (req, res) => {
  try {
    const { name, page = 1, limit = 10 } = req.query;

    const filter = {
    };
    if (name) {
      filter.name = { $regex: name, $options: "i" }; // Case-insensitive regex search
    }

    const skip = (page - 1) * limit;

    const existingRestaurantCategory = await Category.find(filter)
      .skip(skip)
      .limit(parseInt(limit))
      .exec();

    if (!existingRestaurantCategory) {
      return res.status(400).json({
        success: false,
        message: "The Category data does not exist.",
      });
    }
    const categoriesWithItems = await Promise.all(
      existingRestaurantCategory.map(async (category) => {
        const items = await RestaurantItem.find({
          category: category._id,
        }).exec();
        return {
          ...category.toObject(),
          items, // Add items to the category
        };
      })
    );

    const totalCategories = await Category.countDocuments(filter);

    return res.status(200).json({
      success: true,
      pagination: {
        total: totalCategories,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(totalCategories / limit),
      },
      data: categoriesWithItems,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  RestaurantCategorysGet,
};
