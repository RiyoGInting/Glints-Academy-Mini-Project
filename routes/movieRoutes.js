const express = require("express"); // Import express
const router = express.Router(); // Make router from app

const MovieValidator = require("../middlewares/validators/MovieValidator");
const MovieController = require("../controllers/MovieController");
const auth = require('../middlewares/auth')

router.get("/",  MovieController.getAll);
router.get("/:page", MovieValidator.getAllValidator, MovieController.getAll);
router.get("/detail/:id", MovieController.getOne);
router.get("/category/:category", MovieController.getAllbyCategory);
router.get("/category/:category/:page", MovieValidator.categoryValidator, MovieController.getAllbyCategory);
router.get("/title/:title", MovieController.getAllbyTitle);

router.post("/", auth.admin, MovieController.createMovie);

router.put("/update/:id", auth.admin, MovieController.updateMovie);

router.delete("/delete/:id", auth.admin, MovieController.deleteMovie);

module.exports = router; // Export router
