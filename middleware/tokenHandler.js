// const asyncHandler = require("express-async-handler");
// const jwt = require("jsonwebtoken");
// require("dotenv").config();

// const validateToken = asyncHandler(async (req, res, next) => {
//   let token;
//   const authHeader = req.headers.authorization;

//   if (authHeader && authHeader.startsWith("Bearer ")) {
//     token = authHeader.substring(7);
//     try {
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       req.user = decoded.user;
//       next();
//     } catch (error) {
//       res.status(401);
//       throw new Error("User is not authorized");
//     }
//   } else {
//     res.status(401);
//     throw new Error("User is not authorized or token is missing");
//   }
// });

// module.exports = validateToken;
