const express = require("express"); // Import express
const router = express.Router(); // Make a router

// Import auth (middleware)
const auth = require("../middlewares/auth");

// Import imageUpload function
const castUpload = require("../middlewares/uploads/castUpload");

// Import controller
const castController = require("../controllers/castController");

// Make router
router
  .route("/")
  .get(castController.getAll)
  .post(castUpload, castController.create);
router
  .route("/:id")
  .get(castController.getOne)
  .put(castUpload, castController.update)
  .delete(castController.delete);

module.exports = router; // Export router
