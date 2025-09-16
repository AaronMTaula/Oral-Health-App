const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Optional: duplicate routes for clarity
router.post("/signup", userController.createUser);
router.post("/login", userController.loginUser);

module.exports = router;
