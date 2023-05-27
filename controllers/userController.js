// userController.js
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { userRoles, genre } = require("../constants/constants");
const Book = require("../models/Book");
const asyncHandler = require("express-async-handler");
const JWT_SECRET = "loko123";

// Step 3: Implement user registration
const registerUser = async (req, res) => {
  try {
    // Validate and extract user data from the request body
    const { email, password, role } = req.body;

    // Check if the role is valid
    if (!Object.values(userRoles).includes(role)) {
      return res.status(400).json({ error: "Invalid user role" });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    // Create a new user instance
    const user = new User({
      email,
      password,
      role,
    });

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Set the hashed password
    user.password = hashedPassword;

    // Save the user to the database
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Step 4: Implement user login
const loginUser = async (req, res) => {
  try {
    // Validate and extract user credentials
    const { email, password, ...rest } = req.body;

    // Check if any additional properties are present in the request body
    if (Object.keys(rest).length > 0) {
      return res.status(400).json({ error: "Invalid request body" });
    }

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Perform password verification
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Determine the role of the user
    const role = user.role;

    // Generate and send the access token
    const tokenPayload = { userId: user._id, role };
    const token = jwt.sign(tokenPayload, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token, userId: user._id, role });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// // Step 7: Implement getBooks for librarian
// const getBooks = async (req, res) => {
//   try {
//     // Retrieve books from the database
//     const books = await Book.find();

//     res.status(200).json({ books });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

//@desc Current user info
//@route GET /api/users/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
  res.json({ message: "current user bitch" });
});

module.exports = {
  registerUser,
  loginUser,
  currentUser,
};
