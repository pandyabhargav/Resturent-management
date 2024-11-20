const RestaurantCart = require("../models/Cart.js");

const RestaurantCartAdd = async (req, res) => {
  try {
    const { items } = req.body;

    const restaurantcarts = await RestaurantCart.findOne({
      user: req.user._id,
    });

    if (restaurantcarts) {
      // Push all new items to the existing items array
      restaurantcarts.items = [...restaurantcarts.items, ...items];
      await restaurantcarts.save();

      return res.status(200).json({
        success: true,
        data: restaurantcarts,
        message: "Cart updated successfully with new items.",
      });
    }

    const restaurantcart = new RestaurantCart({
      ...req.body,
    });

    await restaurantcart.save();
    res.status(201).json({ success: true, data: restaurantcart });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: error, message: error.message });
  }
};

const RestaurantCartsGet = async (req, res) => {
  try {
    const existingRestaurantCart = await RestaurantCart.find({
      user: req.user._id,
    })
      .populate("items.item")
      .populate("items.customizationList")
      .populate("user");
    if (!existingRestaurantCart) {
      return res.status(400).json({
        success: false,
        message: "The RestaurantCart data does not exist.",
      });
    }
    res.status(200).json({ success: true, data: existingRestaurantCart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const RestaurantCartGet = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurantcarts = await RestaurantCart.findById(id);
    if (!restaurantcarts) {
      return res.status(400).json({
        success: false,
        message: "The Restaurant Cart data does not exist.",
      });
    }
    res.status(200).json({ success: true, data: restaurantcarts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const RestaurantCartUpdate = async (req, res) => {
  try {
    const { id } = req.params;

    const existingRestaurantCart = await RestaurantCart.findById(id);
    if (!existingRestaurantCart) {
      return res.status(400).json({
        success: false,
        message: "The RestaurantCart data does not exist.",
      });
    }
    const updatedRestaurantCart = await RestaurantCart.findByIdAndUpdate(
      id,
      {
        ...req.body,
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({ success: true, data: updatedRestaurantCart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const RestaurantCartDelete = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurantcarts = await RestaurantCart.findByIdAndDelete(id);
    if (!restaurantcarts) {
      return res.status(400).json({
        success: false,
        message: "The RestaurantCart data does not exist.",
      });
    }
    res.status(200).json({ success: true, data: "RestaurantCart Delete" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  RestaurantCartAdd,
  RestaurantCartsGet,
  RestaurantCartGet,
  RestaurantCartUpdate,
  RestaurantCartDelete,
};
