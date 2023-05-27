const express = require("express");
const router = express.Router();
const { requireRole, validateToken } = require("../middleware/auth");
const {
  registerUser,
  loginUser,
  currentUser,
} = require("../controllers/userController");
// const requireLibrarianRole = require("../middleware/role");
// const validateToken = require("../middleware/tokenHandler");

// Route for user registration
router.post("/register", registerUser);

// Route for user login
router.post("/login", loginUser);

// Route for getting current user
router.get("/current", validateToken, currentUser);

module.exports = router;
