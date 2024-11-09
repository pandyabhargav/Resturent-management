const Restaurant = require("../models/Restaurant.js");

const RestaurantAdd = async (req, res) => {
  try {
    const { restaurantName } = req.body;

    const restaurants = await Restaurant.findOne({ restaurantName });
    if (restaurants) {
      return res.status(400).json({
        success: false,
        message:
          "This Restaurant Name has already been used. Please use a different Restaurant Name.",
      });
    }

    const restaurant = new Restaurant({
      ...req.body,
    });

    await restaurant.save();
    res.status(201).json({ success: true, data: restaurant });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: error, message: error.message });
  }
};

const RestaurantsGet = async (req, res) => {
  try {
    const existingRestaurant = await Restaurant.find();
    if (!existingRestaurant) {
      return res.status(400).json({
        success: false,
        message: "The Restaurant data does not exist.",
      });
    }
    res.status(200).json({ success: true, data: existingRestaurant });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const RestaurantGet = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurants = await Restaurant.findById(id);
    if (!restaurants) {
      return res.status(400).json({
        success: false,
        message: "The Restaurant data does not exist.",
      });
    }
    res.status(200).json({ success: true, data: restaurants });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const RestaurantUpdate = async (req, res) => {
  try {
    const { id } = req.params;

    const existingRestaurant = await Restaurant.findById(id);
    if (!existingRestaurant) {
      return res.status(400).json({
        success: false,
        message: "The Restaurant data does not exist.",
      });
    }
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      id,
      {
        ...req.body,
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({ success: true, data: updatedRestaurant });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const RestaurantDelete = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurants = await Restaurant.findByIdAndDelete(id);
    if (!restaurants) {
      return res.status(400).json({
        success: false,
        message: "The Restaurant data does not exist.",
      });
    }
    res.status(200).json({ success: true, data: "Restaurant Delete" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  RestaurantAdd,
  RestaurantsGet,
  RestaurantGet,
  RestaurantUpdate,
  RestaurantDelete,
};
