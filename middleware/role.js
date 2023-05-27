// const userRoles = require("../constants/userRoles");

// const requireLibrarianRole = (req, res, next) => {
//   console.log("req.user:", req.user); // Log the value of req.user
//   // Check if the user object is defined and has the role property
//   if (req.user && req.user.role === userRoles.LIBRARIAN) {
//     // User has the required role, proceed to the next middleware
//     next();
//   } else {
//     // User does not have the required role, send a forbidden error response
//     res.status(403).json({ error: "Access denied. Librarian role required." });
//   }
// };

// module.exports = requireLibrarianRole;
