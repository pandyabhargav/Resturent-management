const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    restaurant:{type: mongoose.Schema.Types.ObjectId, ref: "Restaurant", required: true},
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        item: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Item",
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
    status: {
      type: String,
      enum: ["Visible", "Hide"],
      default: "Visible",
    },    
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
