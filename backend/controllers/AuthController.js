const RestaurantOwner = require("../models/RestaurantOwner.js");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendEmail = require("../utils/SendEmail.js");
const bcryptjs = require("bcryptjs");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check restaurantowner
    const restaurantowner = await RestaurantOwner.findOne({ email });
    if (!restaurantowner) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check password
    const isMatch = await bcryptjs.compare(password, restaurantowner.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Password Dose not match" });
    }
    const token = jwt.sign({ user: restaurantowner }, process.env.JWT_SECRET, {
      expiresIn: "7day",
    });

    res.status(200).json({
      message: "restaurantowner successfully login",
      data: restaurantowner,
      token: token,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;
    const restaurantowner = await RestaurantOwner.findOne({ email });
    if (!restaurantowner) {
      return res.status(400).json({ message: "RestaurantOwner not found" });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(20).toString("hex");

    // Set reset token and expiration
    restaurantowner.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    restaurantowner.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
    await restaurantowner.save();

    // Send email
    const resetUrl = `http://yourfrontend.com/reset-password/${resetToken}`;
    const message = `You requested a password reset. Please make a PUT request to: \n\n ${resetUrl}`;
    
    console.log("restaurantowner.email", restaurantowner.email);

    await sendEmail({
      to: restaurantowner.email,
      subject: "Password Reset",
      text: message,
    });

    res
      .status(200)
      .json({ message: "Password reset email sent", resetToken: resetToken });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;
    if (!password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    // Find restaurantowner by token and check expiration
    const restaurantowner = await RestaurantOwner.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!restaurantowner) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    // Set new password
    restaurantowner.password = hashedPassword;
    restaurantowner.resetPasswordToken = undefined;
    restaurantowner.resetPasswordExpires = undefined;
    await restaurantowner.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const authCheck = async (req, res) => {
  try {
    res.status(200).json({ restaurantowner: req.restaurantowner });
  } catch (error) {
    console.log("Error in authCheck controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  login,
  requestPasswordReset,
  resetPassword,
  authCheck,
};
