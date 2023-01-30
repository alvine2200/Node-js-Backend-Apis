require("dotenv").config();
const port = process.env.PORT || 3000;
const express = require("express");
const connectDB = require("./db/Connection");
const cors = require("cors");
const UserRouter = require("./routes/UserRoutes");
const conn = process.env.MONGO_URL;
const app = express();

app.use(express.json());
app.use(cors());
app.use("api/v1/", UserRouter);

const start = async (req, res) => {
  await connectDB(conn);
  app.listen(port, () => {
    console.log(`App is running on port ${port}`);
  });
};

start();
