const express = require("express");
require("dotenv").config();
const userRoutes = require("./routes/userRoutes");
const bookRoutes = require("./routes/bookRoutes");
const connectDb = require("./config/db");
const app = express();

const port = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // Add this line for JSON body parsing

// Use the user routes
app.use("/api/users", userRoutes);

// Use the book routes
app.use("/api/users", bookRoutes);

connectDb();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
