const express = require("express"); // Import express
const router = express.Router(); // Make router from app

const MovieValidator = require("../middlewares/validators/MovieValidator");
const MovieController = require("../controllers/MovieController");

router.get("/",  MovieController.getAll);
router.get("/:page", MovieValidator.getAllValidator, MovieController.getAll);
router.get("/detail/:id", MovieController.getOne);
router.get("/category/:category", MovieController.getAllbyCategory);
router.get("/category/:category/:page", MovieValidator.categoryValidator, MovieController.getAllbyCategory);
router.get("/title/:title", MovieController.getAllbyTitle);

router.post("/",  MovieController.createMovie);

router.put("/update/:id",  MovieController.updateMovie);

router.delete("/delete/:id", MovieController.deleteMovie);

module.exports = router; // Export router
