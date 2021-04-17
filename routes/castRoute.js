const express = require("express"); // Import express
const router = express.Router(); // Make a router

// Import imageUpload function
const castUpload = require("../middlewares/uploads/castUpload");

// Import validator
const castValidator = require("../middlewares/validators/castValidator");

// Import controller
const castController = require("../controllers/castController");

// Make router
router
  .route("/")
  .get(castController.getAll)
  .post(castUpload, castController.create);
router
  .route("/:id")
  .get(castValidator.getOne, castController.getOne)
  .put(castUpload, castValidator.update, castController.update)
  .delete(castValidator.delete, castController.delete);

module.exports = router; // Export router
