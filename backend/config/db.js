// backend/config/db.js
const mongoose = require("mongoose");

let mongoMemoryServer = null;

const connectDB = async () => {
  try {
    let uri = process.env.MONGO_URI;
    const isProduction = process.env.NODE_ENV === "production";
    const useMemoryDb = process.env.USE_MEMORY_DB === "true" || (!isProduction && process.env.USE_MEMORY_DB !== "false");

    if (useMemoryDb) {
      try {
        const { MongoMemoryServer } = require("mongodb-memory-server");
        mongoMemoryServer = await MongoMemoryServer.create();
        uri = mongoMemoryServer.getUri();
        console.log("⚡ Connected to isolated in-memory MongoDB (local fake database)");
      } catch (err) {
        console.warn("⚠️ Could not start in-memory MongoDB, falling back to MONGO_URI:", err.message);
      }
    }

    if (!uri) {
      throw new Error("MONGO_URI environment variable is not set");
    }

    const conn = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: process.env.MONGO_DB_NAME || "oral-health-app",
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}/${conn.connection.name}`);
    return conn;
  } catch (error) {
    throw error;
  }
};

module.exports = connectDB;
