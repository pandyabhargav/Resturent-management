const express = require("express");
const Joi = require("joi");

const {
  login,
  requestPasswordReset,
  resetPassword,
  authCheck,
} = require("../controllers/AuthController.js");

const validateRequest = require("../middleware/validate-request.js");

const { authMiddleware, logout } = require("../middleware/authMiddleware.js");
const router = express.Router();

router.post("/login", LoginValidation, login);
router.post("/password-reset", ResetPasswordValidation, requestPasswordReset);
router.post("/password-reset/:token", resetPassword);
router.get("/authCheck", authMiddleware, authCheck);
router.post("/logout", authMiddleware, logout);

function LoginValidation(req, res, next) {
  const schema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password: Joi.string().min(6).max(255).required(),
  });
  validateRequest(req, res, next, schema);
}

function ResetPasswordValidation(req, res, next) {
  const schema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
  });
  validateRequest(req, res, next, schema);
}

module.exports = router;
