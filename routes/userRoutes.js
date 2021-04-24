const express = require("express");
const router = express.Router();

const userValidator = require("../middlewares/validators/userValidator");
const userController = require("../controllers/userController");
const auth = require("../middlewares/auth");

router.get("/", auth.adminOrUser, userController.getOne);
router.put("/", auth.adminOrUser, userValidator.update, userController.update);
router.put("/addWatchlist", auth.adminOrUser, userController.addWatchlist);
router.get("/getWatchlist", auth.adminOrUser, userController.getWatchlist);
router.put("/removeWatchlist", auth.adminOrUser, userController.removeWatchlist);

module.exports = router;
