const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware"); // ✅ fixed path

// Public routes
router.post("/", userController.createUser);
router.post("/login", userController.loginUser);

// Protected routes
router.get("/me", authMiddleware, userController.getProfile); // ✅ new profile route
router.put("/:id", authMiddleware, userController.updateUser);
router.delete("/:id", authMiddleware, userController.deleteUser);

module.exports = router;
