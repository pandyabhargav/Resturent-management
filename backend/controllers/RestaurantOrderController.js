const RestaurantOrder = require("../models/Order.js");
const RestaurantCart = require("../models/Cart.js");

const RestaurantOrdersGet = async (req, res) => {
  try {
    const { type, page = 1, limit = 10, paymentStatus, status } = req.query;

    const skip = (page - 1) * limit;

    let filter = {
      restaurant: req.user.restaurant,
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

    const existingRestaurantOrder = await RestaurantOrder.find(filter)
      .populate("user", "-createdBy -createdAt -updatedAt -__v -isActive")
      .skip(skip)
      .limit(parseInt(limit))
      .exec();

    if (!existingRestaurantOrder) {
      return res.status(400).json({
        success: false,
        message: "The RestaurantOrder data does not exist.",
      });
    }

    const totalRestaurantOrder = await RestaurantOrder.countDocuments(filter);

    res.status(200).json({
      success: true,
      pagination: {
        total: totalRestaurantOrder,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(totalRestaurantOrder / limit),
      },
      data: existingRestaurantOrder,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const RestaurantOrderUpdate = async (req, res) => {
  try {
    const { id } = req.params;

    const existingRestaurantOrder = await RestaurantOrder.findById(id);
    if (!existingRestaurantOrder) {
      return res.status(400).json({
        success: false,
        message: "The RestaurantOrder data does not exist.",
      });
    }
    const updatedRestaurantOrder = await RestaurantOrder.findByIdAndUpdate(
      id,
      {
        ...req.body,
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({ success: true, data: updatedRestaurantOrder });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const RestaurantOrderDelete = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurantorders = await RestaurantOrder.findByIdAndDelete(id);
    if (!restaurantorders) {
      return res.status(400).json({
        success: false,
        message: "The RestaurantOrder data does not exist.",
      });
    }
    res.status(200).json({ success: true, data: "RestaurantOrder Delete" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  RestaurantOrdersGet,
  RestaurantOrderUpdate,
  RestaurantOrderDelete,
};
