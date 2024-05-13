const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
    console.log(
      `DB INFO: MONGODB DATABASE CONNECTED AT ${conn.connection.host}`.white
        .bold.white.bold
    );
  } catch (e) {
    console.log(
      `DB ERROR: MONGODB DATABASE CONNECTION FAILED DUE TO : `.red.bold,
      e.message.red.bold
    );
    process.exit(1);
  }
};

module.exports = connectDB;
