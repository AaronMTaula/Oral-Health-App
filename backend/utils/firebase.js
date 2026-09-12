// backend/utils/firebase.js
const admin = require("firebase-admin");
const { getAuth } = require("firebase-admin/auth");

const rawPrivateKey = process.env.FIREBASE_PRIVATE_KEY || "";
const formattedPrivateKey = rawPrivateKey
  .replace(/^["']|["']$/g, "") // Strip leading and trailing quotes if present
  .replace(/\\n/g, "\n")       // Convert escaped \n strings to real newlines
  .split("\n")
  .map((line) => line.trim())  // Trim spaces on every PEM line (prevents OpenSSL decoder errors)
  .filter(Boolean)
  .join("\n");

const serviceAccount = {
  project_id: process.env.FIREBASE_PROJECT_ID,
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  private_key: formattedPrivateKey,
};

const firebaseApp = admin.initializeApp({
  credential: admin.cert(serviceAccount),
});

console.log("✅ Firebase initialized!");
module.exports = {
  auth: () => getAuth(firebaseApp),
};
