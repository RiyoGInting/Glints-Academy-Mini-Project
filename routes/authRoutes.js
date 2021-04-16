const express = require("express");
const passport = require("passport");

const authValidator = require("../middlewares/validators/authValidator");
const authController = require("../controllers/authController");

const auth = require("../middlewares/auth");
const router = express.Router();

router.post(
  "/signup",
  authValidator.signup,
  auth.signup,
  authController.getToken
);

router.post(
  "/signin",
  authValidator.signin,
  auth.signin,
  authController.getToken
);

module.exports = router;
