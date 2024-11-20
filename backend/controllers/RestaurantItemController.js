const RestaurantItem = require("../models/Item.js");
const RestaurantItemCustomization = require("../models/Customization.js");

const RestaurantItemAdd = async (req, res) => {
  try {
    const { name, customization } = req.body;

    const restaurantitems = await RestaurantItem.findOne({ name });
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

    if (customizationIds.length > 0) {
      const restaurantitem = new RestaurantItem({
        ...req.body,
        customization: customizationIds,
      });
      await restaurantitem.save();
      res.status(201).json({ success: true, data: restaurantitem });
    }
  } catch (error) {
    res
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
      .skip(skip)
      .limit(parseInt(limit))
      .exec();

    if (!existingRestaurantItem) {
      return res.status(400).json({
        success: false,
        message: "The Restaurant Item data does not exist.",
      });
    }

    const totalCategories = await RestaurantItem.countDocuments();

    res.status(200).json({
      success: true,
      pagination: {
        total: totalCategories,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(totalCategories / limit),
      },
      data: existingRestaurantItem,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const RestaurantItemGet = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurantitems = await RestaurantItem.findById(id).populate("customization");
    if (!restaurantitems) {
      return res.status(400).json({
        success: false,
        message: "The Restaurant Item data does not exist.",
      });
    }
    res.status(200).json({ success: true, data: restaurantitems });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
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

    res.status(200).json({ success: true, data: updatedRestaurantItem });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
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
    res.status(200).json({ success: true, data: "Restaurant Item Delete" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  RestaurantItemAdd,
  RestaurantItemsGet,
  RestaurantItemGet,
  RestaurantItemUpdate,
  RestaurantItemDelete,
};
