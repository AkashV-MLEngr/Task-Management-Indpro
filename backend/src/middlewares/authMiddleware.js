const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

// authenticateUser (Token without "Bearer")
const authenticateUser = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Access Denied: No token provided" });
  }

  try {
    const verified = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET, { algorithm: "HS256", expiresIn: "24h" });
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid Token" });
  }
};

// verifyToken (Token with "Bearer")
const verifyToken = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access Denied. No token provided." });
  }

  const token = authHeader.split(" ")[1]; // Extract token after "Bearer"

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET, { algorithm: ["HS256"] });
    req.user = decoded; // Attach user data to req.user
    console.log("user.tokrn", req.user.id);
    
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid or expired token" });
  }
};

module.exports = { authenticateUser, verifyToken };
