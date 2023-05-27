// middleware/auth.js

const jwt = require("jsonwebtoken");
require("dotenv").config();
const asyncHandler = require("express-async-handler");
const JWT_SECRET = "loko123";

// Middleware to check user role
const requireRole = (role) => {
  return (req, res, next) => {
    if (req.user.role === role) {
      next();
    } else {
      res.status(403).json({ error: "Access denied" });
    }
  };
};

// Middleware to validate token and extract user details
const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.substring(7);
    try {
      const decodedToken = jwt.verify(token, JWT_SECRET);
      const { userId, role } = decodedToken;
      req.user = { userId, role };
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Invalid token");
    }
  } else {
    res.status(401);
    throw new Error("User is not authorized or token is missing");
  }
});

module.exports = {
  requireRole,
  validateToken,
};
