const admin = require("../utils/firebase");

module.exports = async (req, res, next) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : null;

  if (!token) return res.status(401).json({ error: "No token, authorization denied" });

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = { uid: decodedToken.uid, email: decodedToken.email };
    next();
  } catch (err) {
    console.error("Firebase token verification failed:", err);
    res.status(401).json({ error: "Token is not valid" });
  }
};
