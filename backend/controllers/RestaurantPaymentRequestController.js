const Restaurant = require("../models/Restaurant.js");
const RestaurantOrder = require("../models/Order.js");

const RestaurantPaymentRequestConfirm = async (req, res) => {
  try {
    const { cart, type } = req.body;

    const restaurantOrder = await RestaurantOrder.findOne({
      restaurant: req.user.restaurant,
      user: req.user._id,
      cart: cart,
      paymentStatus: "Cash",
      type: type,
      status: "Pending",
    });
    if (!restaurantOrder) {
      return res.status(400).json({
        success: false,
        message: "The order could not be found!",
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

module.exports = {
  RestaurantPaymentRequestConfirm,
};
