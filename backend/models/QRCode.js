const mongoose = require("mongoose");

const qrCodeSchema = new mongoose.Schema(
  {
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    qrname: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    additionalText: {
      type: String,
      default: "",
    },
    color: {
      type: String,
    },
    frameBackground: {
      type: String,
    },
    qrBackground: {
      type: String,
    },
    category: {
      type: String,
    },
    qrType: {
      type: String,
      enum: ["SVG", "PNG"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const QRCode = mongoose.model("QRCode", qrCodeSchema);

module.exports = QRCode;
