const RestaurantOwner = require("../models/RestaurantOwner");
const bcryptjs = require("bcryptjs");
const crypto = require("crypto");

const RestaurantOwnerAdd = async (req, res) => {
  try {
    const { firstName, email, password } = req.body;

    const restaurantOwners = await RestaurantOwner.findOne({ email });
    if (restaurantOwners) {
      return res.status(400).json({
        success: false,
        message:
          "This email has already been used. Please use a different email address.",
      });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const restaurantOwner = new RestaurantOwner({
      ...req.body,
      createdBy: firstName,
      password: hashedPassword,
      role: "owner",
    });

    await restaurantOwner.save();
    res.status(201).json({ success: true, data: restaurantOwner });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const RestaurantOwnersGet = async (req, res) => {
  try {
    const restaurantOwners = await RestaurantOwner.find().populate(
      "restaurant"
    );
    res.status(200).json({ success: true, data: restaurantOwners });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const RestaurantOwnerGet = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurantOwners = await RestaurantOwner.findById(id).populate(
      "restaurant"
    );
    if (!restaurantOwners) {
      return res.status(400).json({
        success: false,
        message: "The Owner ID data does not exist.",
      });
    }

    res.status(200).json({ success: true, data: restaurantOwners });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const RestaurantOwnerUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName } = req.body;

    const existingRestaurantOwner = await RestaurantOwner.findById(id);
    if (!existingRestaurantOwner) {
      return res.status(400).json({
        success: false,
        message: "The Owner ID data does not exist.",
      });
    }
    const updatedRestaurantOwner = await RestaurantOwner.findByIdAndUpdate(
      id,
      {
        ...req.body,
        lastModifiedBy: firstName || existingRestaurantOwner.firstName,
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({ success: true, data: updatedRestaurantOwner });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const RestaurantOwnerDelete = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurantOwners = await RestaurantOwner.findByIdAndDelete(id);
    if (!restaurantOwners) {
      return res.status(400).json({
        success: false,
        message: "The Owner ID data does not exist.",
      });
    }
    res.status(200).json({ success: true, data: "Owner Delete" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  RestaurantOwnerAdd,
  RestaurantOwnersGet,
  RestaurantOwnerGet,
  RestaurantOwnerUpdate,
  RestaurantOwnerDelete,
};
