const express = require("express"); // Import express
const router = express.Router(); // Make router from app

const AuthValidator = require("../middlewares/validators/AuthValidator");
const Passport = require("../middlewares/auth");
const MovieController = require("../controllers/MovieController");
const CastController = require("../controllers/castController");

router.get("/", MovieController.getAll);
router.get("/:id", MovieController.getOne);
router.post("/", MovieController.createMovie);
router.put("/:id", MovieController.updateMovie);
router.delete('/:id', MovieController.deleteMovie)


// testing purposes
router.post("/test", MovieController.createReview);
router.post("/category", MovieController.createCategory);
router.post('/cast', CastController.create)

module.exports = router; // Export router
