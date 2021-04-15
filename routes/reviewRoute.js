const express = require("express");
const router = express.Router();

// import validator
const reviewValidator = require("../middlewares/validators/reviewValidator");

// import controller
const reviewController = require("../controllers/reviewController");

router.get("/", reviewController.getAll);
router.get("/:id", reviewValidator.getOne, reviewController.getOne);
router.post("/", auth.user, reviewValidator.create, reviewController.create);
router.put("/:id", auth.user, reviewValidator.update, reviewController.update);
router.delete("/id", auth.user, reviewValidator.delete, reviewController.delete);

module.exports = router; 