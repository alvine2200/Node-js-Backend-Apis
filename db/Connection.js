const mongoose = require("mongoose");

const connectDB = async (url) => {
  try {
    mongoose.set("strictQuery", false);
    return mongoose.connect(url);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: "failed", error: "failed to connect to the db" });
  }
};

module.exports = connectDB;
