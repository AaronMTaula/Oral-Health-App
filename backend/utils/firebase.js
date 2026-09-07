// backend/utils/firebase.js
const admin = require("firebase-admin");
const { getAuth } = require("firebase-admin/auth");

const serviceAccount = {
  project_id: process.env.FIREBASE_PROJECT_ID,
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"), // Convert \n to actual line breaks
};

const firebaseApp = admin.initializeApp({
  credential: admin.cert(serviceAccount),
});

console.log("✅ Firebase initialized!");
module.exports = {
  auth: () => getAuth(firebaseApp),
};
