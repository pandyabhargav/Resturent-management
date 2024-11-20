const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    cart: { type: mongoose.Schema.Types.ObjectId, ref: "Cart", required: true },
    cookingRequest: { type: String, default: "" },
    type: { type: String, enum: ["Parcel", "Onsite"], required: true },
    restaurantStatus: {
      type: String,
      enum: ["Delivered", "InProgress", "Accept"],
    },
    status: {
      type: String,
      enum: ["Cancelled", "Pending", "Confirm"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
