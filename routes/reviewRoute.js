const express = require("express");
const router = express.Router();

// import validator, controller & authorization
const reviewValidator = require("../middlewares/validators/reviewValidator");
const reviewController = require("../controllers/reviewController");
const auth = require("../middlewares/auth");

// Get All
router.get("/", reviewController.getAll);
// router.get("/:page", /* reviewValidator.getAllValidator,*/ reviewController.getAll);
// router.get("/user/:user", /* reviewValidator.userValidator, ?*/ reviewController.getAllByUser);
// router.get("/user/:user/:page", /*reviewValidator.userValidator, ?*/ reviewController.getAllByUser)

// Get One, Create, Update, Delete
router.get("/:id", reviewValidator.getOne, reviewController.getOne);
router.post("/", auth.user, reviewValidator.create, reviewController.create);
router.put("/:id", auth.user, reviewValidator.update, reviewController.update);
router.delete("/id", auth.user, reviewValidator.delete, reviewController.delete);

module.exports = router; 