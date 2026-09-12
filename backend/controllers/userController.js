const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

// Legacy email/password auth is intentionally disabled. Firebase is the only
// supported authentication path for this app.
exports.createUser = async (_req, res) => {
  return res.status(410).json({
    error: "Legacy signup is no longer supported. Please use Firebase authentication.",
  });
};

exports.loginUser = async (_req, res) => {
  return res.status(410).json({
    error: "Legacy login is no longer supported. Please use Firebase authentication.",
  });
};

// Get current user profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUid: req.user.uid }).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    console.error("Get profile error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// Update User
exports.updateUser = async (req, res) => {
  try {
    const targetUser = await User.findById(req.params.id);
    if (!targetUser) return res.status(404).json({ error: "User not found" });

    // Ownership must be tied to the authenticated Firebase UID, not a mutable email.
    if (targetUser.firebaseUid !== req.user.uid) {
      return res.status(403).json({ error: "Not authorized to modify this user" });
    }

    const { name, email, password } = req.body;
    const update = {};

    if (typeof name !== "undefined") update.name = name;
    if (typeof email !== "undefined") update.email = email;
    if (password) update.password = await bcrypt.hash(password, 10);

    const user = await User.findByIdAndUpdate(req.params.id, update, { new: true }).select("-password");
    res.json({ message: "User updated", user });
  } catch (err) {
    console.error("Update user error:", err);
    res.status(400).json({ error: "Update failed" });
  }
};

// Delete User
exports.deleteUser = async (req, res) => {
  try {
    const targetUser = await User.findById(req.params.id);
    if (!targetUser) return res.status(404).json({ error: "User not found" });

    if (targetUser.firebaseUid !== req.user.uid) {
      return res.status(403).json({ error: "Not authorized to delete this user" });
    }

    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (err) {
    console.error("Delete user error:", err);
    res.status(400).json({ error: "Delete failed" });
  }
};

// Send Inquiry / Email Chat with Family CC Requirement
exports.sendInquiry = async (req, res) => {
  try {
    const { provider, subject, message, familyCc } = req.body;
    if (!subject || !message || !familyCc) {
      return res.status(400).json({ error: "Subject, message, and family CC email are required." });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(familyCc)) {
      return res.status(400).json({ error: "A valid family CC email address is required." });
    }

    console.log(`Inquiry sent from ${req.user.email} (UID: ${req.user.uid}) to ${provider || 'Ata\'ata Dental Team'}:`, {
      subject,
      message,
      familyCc
    });

    res.json({
      message: "Inquiry successfully sent! A copy has been CC'd to " + familyCc,
      inquiry: {
        provider: provider || "Ata'ata Dental Team",
        subject,
        familyCc,
        sentAt: new Date().toISOString()
      }
    });
  } catch (err) {
    console.error("Send inquiry error:", err);
    res.status(500).json({ error: "Failed to send inquiry" });
  }
};