const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware"); 

// Public routes
router.post("/", userController.createUser);
router.post("/login", userController.loginUser);

// Protected routes
router.get("/me", authMiddleware, userController.getProfile); 
router.put("/:id", authMiddleware, userController.updateUser);
router.delete("/:id", authMiddleware, userController.deleteUser);

module.exports = router;
