const express = require("express"); // Import express
const router = express.Router(); // Make a router

// Import controller
const categoryController = require("../controllers/categoryController");

// Make router
router
  .route("/")
  .get(categoryController.getAll)
  .post(categoryController.create);
router
  .route("/:id")
  .get(categoryController.getOne)
  .put(categoryController.update)
  .delete(categoryController.delete);

module.exports = router; // Export router
