const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    name: { type: String, required: true },
    ingredients: { type: String },
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    itemType: { type: String, enum: ["Veg", "Nonveg"], required: true },
    type: { type: String, enum: ["Spicy", "Sweet"], required: true },
    options: {
      type: String,
      enum: ["Less", "Regular", "Extra"],
      default: "Less",
    },
    image: { type: String },
    availability: {
      type: String,
      enum: ["Available", "Unavailable"],
      default: "Available",
    },
    customization: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customization",
      },
    ],
    createdBy: { type: String },
    lastModifiedBy: { type: String },
  },
  { timestamps: true }
);

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
