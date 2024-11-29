const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      un: true,
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

const User = mongoose.model("User", userSchema);

module.exports = User;
