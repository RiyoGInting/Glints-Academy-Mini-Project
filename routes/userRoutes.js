const express = require("express");

// import validator

const userController = require("../controllers/userController");

const router = express.Router();

router.get("/:id", userController.getOne);
router.put("/:id", userController.update);

module.exports = router;
