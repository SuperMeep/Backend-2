const jwt = require("jsonwebtoken");
require("dotenv").config();

// Generate a token
const user = { id: "645e6f5b4a26bf671d81586d", role: "librarian" };
const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1h" });

console.log(token);
