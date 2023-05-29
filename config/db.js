const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(
      "mongodb+srv://lokomoko2:uvcOqfNk4p84uf6N@cluster0.t3ofapx.mongodb.net/library-backend-2?retryWrites=true&w=majority"
    );
    console.log(
      "Database connected: ",
      connect.connection.host,
      connect.connection.name
    );
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDb;
