const express = require("express"); // Import express
const router = express.Router(); // Make a router

// Import validator
const categoryValidator = require("../middlewares/validators/categoryValidator");

// Import controller
const categoryController = require("../controllers/categoryController");

// Make router
router
  .route("/")
  .get(categoryController.getAll)
  .post(categoryController.create);
router
  .route("/:id")
  .get(categoryValidator.getOne, categoryController.getOne)
  .put(categoryValidator.update, categoryController.update)
  .delete(categoryValidator.delete, categoryController.delete);

module.exports = router; // Export router
