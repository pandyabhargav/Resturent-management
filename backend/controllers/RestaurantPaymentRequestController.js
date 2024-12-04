const Restaurant = require("../models/Restaurant.js");
const RestaurantOrder = require("../models/Order.js");
const RestaurantCart = require("../models/Cart.js");

const RestaurantPaymentRequestConfirm = async (req, res) => {
  try {
    const { cart, type, status } = req.body;

    const restaurantcart = await RestaurantCart.findById(cart);

    if (!restaurantcart) {
      return res.status(400).json({
        success: false,
        message: "The cart could not be found!",
      });
    }
    const restaurantOrder = await RestaurantOrder.find({
      restaurant: req.user.restaurant,
      user: restaurantcart.user,
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

    restaurantOrder.status = status;
    await restaurantOrder.save();

    await RestaurantCart.findOneAndUpdate(
      { user: user, restaurant: req.user.restaurant },
      { $set: { status: "Hide" } },
      { new: true, useFindAndModify: false }
    );

    return res.status(201).json({
      success: true,
      message: "Order updated successfully!",
      data: restaurantOrder,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: error, message: error.message });
  }
};

module.exports = {
  RestaurantPaymentRequestConfirm,
};
