const mongoose = require("mongoose");

const customizationSchema = new mongoose.Schema({
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
      extraRate: { type: Number, default: 0 },
    },
  ],
});

const Customization = mongoose.model("Customization", customizationSchema);

module.exports = Customization;
