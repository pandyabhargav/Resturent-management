const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        item: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Category",
          required: true,
        },
        customizationList: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Customization",
            required: true,
          },
        ],
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        price: {
          type: Number,
        },
      },
    ],
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
