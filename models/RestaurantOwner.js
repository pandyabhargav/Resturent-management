const mongoose = require("mongoose");

const restaurantownerSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    phoneNumber: {
      type: Number,
    },
    role: {
      type: String,
      required: true,
      enum: ['owner', 'user'],
    },
    resetPasswordExpires: {
      type: Date,
    },
    resetPasswordToken: {
      type: String,
    },
    isActive: {
      type: Number,
      default: 1,
      enum: [0, 1],
    },
    createdBy: {
      type: String,
      required: true,
    },
    lastModifiedBy: {
      type: String,
    },
  },
  { timestamps: true }
);

const RestaurantOwner = mongoose.model("RestaurantOwner", restaurantownerSchema);

module.exports = RestaurantOwner;
