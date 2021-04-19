const express = require("express");
const router = express.Router();

// import validator, controller & authorization
const reviewValidator = require("../middlewares/validators/reviewValidator");
const reviewController = require("../controllers/reviewController");
const auth = require("../middlewares/auth");

// Get One, Create, Update, Delete
router.get("/:id", reviewValidator.getOne, reviewController.getOne);
router.post("/", auth.user, reviewValidator.create, reviewController.create);
router.put("/:id", auth.user, reviewValidator.update, reviewController.update);
router.delete("/:id", auth.user, reviewValidator.delete, reviewController.delete);

module.exports = router; 