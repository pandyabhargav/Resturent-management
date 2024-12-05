const RestaurantUser = require("../models/User.js");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

const RestaurantUserAdd = async (req, res) => {
  try {
    const { name, phoneNumber } = req.body;

    const restaurantUsers = await RestaurantUser.findOne({
      name: { $regex: new RegExp(name, "i") },
      phoneNumber: phoneNumber,
    });

    if (restaurantUsers) {
      const token = jwt.sign(
        { user: restaurantUsers },
        process.env.USER_JWT_SECRET,
        {
          expiresIn: "30day",
        }
      );
      return res
        .status(201)
        .json({ success: true, data: restaurantUsers, token: token });
    } else {
      const restaurantUser = new RestaurantUser({
        ...req.body,
        createdBy: name,
      });

      await restaurantUser.save();
      const token = jwt.sign(
        { user: restaurantUser },
        process.env.USER_JWT_SECRET,
        {
          expiresIn: "7day",
        }
      );
      return res
        .status(201)
        .json({ success: true, data: restaurantUser, token: token });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const RestaurantUsersGet = async (req, res) => {
  try {
    const restaurantUsers = await RestaurantUser.find();
    return res.status(200).json({ success: true, data: restaurantUsers });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const RestaurantUserGet = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurantUsers = await RestaurantUser.findById(id);
    if (!restaurantUsers) {
      return res.status(400).json({
        success: false,
        message: "The User ID data does not exist.",
      });
    }

    return res.status(200).json({ success: true, data: restaurantUsers });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const RestaurantUserUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName } = req.body;

    const existingRestaurantUser = await RestaurantUser.findById(id);
    if (!existingRestaurantUser) {
      return res.status(400).json({
        success: false,
        message: "The User ID data does not exist.",
      });
    }
    const updatedRestaurantUser = await RestaurantUser.findByIdAndUpdate(
      id,
      {
        ...req.body,
        lastModifiedBy: firstName || existingRestaurantUser.firstName,
      },
      { new: true, runValidators: true }
    );

    return res.status(200).json({ success: true, data: updatedRestaurantUser });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const RestaurantUserDelete = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurantUsers = await RestaurantUser.findByIdAndDelete(id);
    if (!restaurantUsers) {
      return res.status(400).json({
        success: false,
        message: "The User ID data does not exist.",
      });
    }
    return res.status(200).json({ success: true, data: "User Delete" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  RestaurantUserAdd,
  RestaurantUsersGet,
  RestaurantUserGet,
  RestaurantUserUpdate,
  RestaurantUserDelete,
};
