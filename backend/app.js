const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/oral_health_app")
  .then(() => console.log("✅ MongoDB connected successfully!"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
