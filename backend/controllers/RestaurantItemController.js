const RestaurantItem = require("../models/Item.js");
const RestaurantItemCustomization = require("../models/Customization.js");
const RestaurantCategory = require("../models/Category.js");

const RestaurantItemAdd = async (req, res) => {
  try {
    const { name, customization, category } = req.body;

    const restaurantcategory = await RestaurantCategory.findById(category);
    if (!restaurantcategory) {
      return res.status(400).json({
        success: false,
        message: "This Restaurant Category has not found.",
      });
    }
    const restaurantitems = await RestaurantItem.findOne({
      name: name,
      restaurant: req.user.restaurant,
      category: category,
    });
    if (restaurantitems) {
      return res.status(400).json({
        success: false,
        message:
          "This Restaurant Item Name has already been used. Please use a different Restaurant Item Name.",
      });
    }

    let customizationIds = [];
    if (customization && customization.length > 0) {
      const savedCustomizations = await Promise.all(
        customization.map(async (custom) => {
          const newCustomization = new RestaurantItemCustomization(custom);
          const savedCustomization = await newCustomization.save();
          return savedCustomization._id;
        })
      );
      customizationIds = savedCustomizations; // Store all IDs
    }

    const restaurantitem = new RestaurantItem({
      ...req.body,
      customization: customizationIds.length > 0 ? customizationIds : undefined,
    });
    await restaurantitem.save();
    return res.status(201).json({ success: true, data: restaurantitem });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: error, message: error.message });
  }
};

const RestaurantItemsGet = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const skip = (page - 1) * limit;

    const existingRestaurantItem = await RestaurantItem.find()
      .populate("customization")
      .populate({
        path: "category",
        select: "_id restaurant",
        match: { restaurant: req.user.restaurant },
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

const RestaurantItemGet = async (req, res) => {
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

const RestaurantItemUpdate = async (req, res) => {
  try {
    const { id } = req.params;

    const existingRestaurantItem = await RestaurantItem.findById(id);
    if (!existingRestaurantItem) {
      return res.status(400).json({
        success: false,
        message: "The Restaurant Item data does not exist.",
      });
    }
    const updatedRestaurantItem = await RestaurantItem.findByIdAndUpdate(
      id,
      {
        ...req.body,
      },
      { new: true, runValidators: true }
    );

    return res.status(200).json({ success: true, data: updatedRestaurantItem });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const RestaurantItemDelete = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurantitems = await RestaurantItem.findByIdAndDelete(id);
    if (!restaurantitems) {
      return res.status(400).json({
        success: false,
        message: "The Restaurant Item data does not exist.",
      });
    }
    return res
      .status(200)
      .json({ success: true, data: "Restaurant Item Delete" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  RestaurantItemAdd,
  RestaurantItemsGet,
  RestaurantItemGet,
  RestaurantItemUpdate,
  RestaurantItemDelete,
};
