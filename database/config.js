const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION);
    console.log("DB online");
  } catch (error) {
    console.error(error);
    throw new Error("Database error - Contact admin");
  }
};

module.exports = {
  dbConnection,
};
