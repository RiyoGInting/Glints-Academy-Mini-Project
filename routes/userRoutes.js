const express = require("express");

const userValidator = require("../middlewares/validators/userValidator");
const userController = require("../controllers/userController");

const router = express.Router();

router.get("/:id", userController.getOne);
router.put("/:id", userValidator.update, userController.update);

module.exports = router;
