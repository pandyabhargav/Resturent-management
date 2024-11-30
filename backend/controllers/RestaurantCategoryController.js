const Category = require("../models/Category.js");
const RestaurantItem = require("../models/Item.js");

const RestaurantCategoryAdd = async (req, res) => {
  try {
    const { name, restaurant } = req.body;
    console.log("req.user.restaurant", req.user.restaurant);

    const restaurantcategorys = await Category.findOne({
      name: name,
      restaurant: restaurant,
    });
    if (restaurantcategorys) {
      return res.status(400).json({
        success: false,
        message:
          "This Category Name has already been used. Please use a different Category Name.",
      });
    }

    const restaurantcategory = new Category({
      ...req.body,
      restaurant: req.user.restaurant,
    });

    await restaurantcategory.save();
    return res.status(201).json({ success: true, data: restaurantcategory });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: error, message: error.message });
  }
};

const RestaurantCategorysGet = async (req, res) => {
  try {
    const { name, page = 1, limit = 10 } = req.query;

    const filter = {
      restaurant: req.body.restaurant,
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

const RestaurantCategoryGet = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurantcategory = await Category.findById(id);
    if (!restaurantcategory) {
      return res.status(400).json({
        success: false,
        message: "The Category data does not exist.",
      });
    }
    res.status(200).json({ success: true, data: restaurantcategory });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const RestaurantCategoryUpdate = async (req, res) => {
  try {
    const { id } = req.params;

    const existingRestaurantCategory = await Category.findById(id);
    if (!existingRestaurantCategory) {
      return res.status(400).json({
        success: false,
        message: "The Category data does not exist.",
      });
    }
    const updatedRestaurantCategory = await Category.findByIdAndUpdate(
      id,
      {
        ...req.body,
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({ success: true, data: updatedRestaurantCategory });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const RestaurantCategoryDelete = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurantcategorys = await Category.findByIdAndDelete(id);
    if (!restaurantcategorys) {
      return res.status(400).json({
        success: false,
        message: "The Category data does not exist.",
      });
    }
    res.status(200).json({ success: true, data: "Category Delete" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  RestaurantCategoryAdd,
  RestaurantCategorysGet,
  RestaurantCategoryGet,
  RestaurantCategoryUpdate,
  RestaurantCategoryDelete,
};
