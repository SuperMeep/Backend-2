const mongoose = require("mongoose");
const { userRoles, genre } = require("../constants/constants");

const userSchema = new mongoose.Schema({
  // Schema definition...

  email: {
    type: String,
    required: [true, "Please add the user email address"],
    unique: [true, "Email address already taken"],
  },
  password: {
    type: String,
    required: [true, "Please add the user password"],
  },

  role: {
    type: String,
    enum: [userRoles.READER, userRoles.LIBRARIAN],
    default: userRoles.READER,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
