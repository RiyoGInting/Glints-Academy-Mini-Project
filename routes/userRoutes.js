const express = require("express");
const router = express.Router();

const userValidator = require("../middlewares/validators/userValidator");
const userController = require("../controllers/userController");
const auth = require("../middlewares/auth");

router.get("/", userController.getUserReviews);
router.get("/:id", auth.adminOrUser, userController.getOne);
router.put("/:id", auth.adminOrUser, userValidator.update, userController.update);

module.exports = router;