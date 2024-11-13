const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    name: { type: String, required: true },
    ingredients: { type: String },
    price: { type: String, required: true },
    discount: { type: String },
    type: { type: String, enum: ["Spicy", "Sweet"], required: true },
    options: {
      type: String,
      enum: ["Less Spicy", "Regular Spicy", "Extra Spicy"],
    },
    image: { type: String },
    availability: {
      type: String,
      enum: ["Available", "Unavailable"],
      default: "Available",
    },
    customization: [
      {
        title: { type: String, required: true },
        selection: {
          type: String,
          enum: ["Single", "Multiple"],
          required: true,
        },
        name: { type: String, required: true },
        detail: { type: String },
        extraRate: { type: Number },
      },
    ],
    createdBy: { type: String },
    lastModifiedBy: { type: String },
  },
  { timestamps: true }
);

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
