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

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Hash the OTP and set expiration
    restaurantowner.resetPasswordToken = crypto
      .createHash("sha256")
      .update(otp)
      .digest("hex");
    restaurantowner.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
    await restaurantowner.save();

    // Send OTP via email
    const message = `Your password reset OTP is: ${otp}. This OTP is valid for 10 minutes.`;

    await sendEmail({
      to: restaurantowner.email,
      subject: "Password Reset OTP",
      text: message,
    });

    return res.status(200).json({ message: "Password reset email sent" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

const resetPasswordOTP = async (req, res) => {
  try {
    const { otp } = req.body;
    if (!otp) {
      return res.status(400).json({ message: "OTP is required" });
    }
    const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");

    const restaurantowner = await RestaurantOwner.findOne({
      resetPasswordToken: hashedOtp,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!restaurantowner) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }
    res.status(200).json({ message: "OTP successfully verified" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
const resetPassword = async (req, res) => {
  try {
    const { otp, confirmPassword, password } = req.body;
    if (!password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
    const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");

    const restaurantowner = await RestaurantOwner.findOne({
      resetPasswordToken: hashedOtp,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!restaurantowner) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
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

const resetCurrantPassword = async (req, res) => {
  try {
    const { currantPassword, password, confirmPassword } = req.body;
    console.log(req.user._id);

    // Find restaurantowner by token and check expiration
    const restaurantowner = await RestaurantOwner.findById(req.user._id);
    if (!restaurantowner) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }
    const isMatch = await bcryptjs.compare(
      currantPassword,
      restaurantowner.password
    );
    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    // Check if new password and confirm password match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    restaurantowner.password = hashedPassword;
    await restaurantowner.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
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
  resetCurrantPassword,
  resetPasswordOTP,
};
