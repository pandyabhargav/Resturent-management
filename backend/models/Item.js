const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    name: { type: String, required: true },
    ingredients: { type: String },
    price: { type: Number, required: true },
    discount: { type: Number },
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
        title: { type: String, required: true },
        selection: {
          type: String,
          enum: ["Single", "Multiple"],
          default: "Multiple",
        },
        list: [
          {
            name: { type: String, required: true },
            detail: { type: String },
            extraRate: { type: Number },
          },
        ],
      },
    ],
    createdBy: { type: String },
    lastModifiedBy: { type: String },
  },
  { timestamps: true }
);

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
