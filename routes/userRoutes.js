// nah ignore this file, user model and api for mas riyo
const express = require("express"); // Import express
const router = express.Router(); // Make router from app

const AuthValidator = require('../middlewares/validators/AuthValidator');
const Passport = require('../middlewares/auth')
const AuthController = require('../controllers/AuthController')

router.post("/signup", AuthValidator.signup, Passport.signup, AuthController.getToken);

router.post("/signin", AuthValidator.signin, Passport.signin, AuthController.getToken);

module.exports = router; // Export router