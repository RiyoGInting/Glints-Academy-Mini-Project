const express = require("express");
const router = express.Router();

// import validator, controller & authorization
const reviewValidator = require("../middlewares/validators/reviewValidator");
const reviewController = require("../controllers/reviewController");
const auth = require("../middlewares/auth");

// Get One, Create, Update, Delete
router.get("/", auth.adminOrUser, reviewController.getMyReview);
router.get("/:id", auth.adminOrUser, reviewValidator.getOne, reviewController.getUserReviews);
router.post("/", auth.adminOrUser, reviewValidator.create, reviewController.create);
router.put("/:id", auth.adminOrUser, reviewValidator.update, reviewController.update);
router.delete("/:id", auth.adminOrUser, reviewValidator.delete, reviewController.delete);

module.exports = router; 