require("dotenv").config();
const port = process.env.PORT || 3000;
const express = require("express");
const connectDB = require("./db/Connection");
const cors = require("cors");
const UserRouter = require("./routes/UserRoutes");
const ConversationRouter = require("./routes/ConversationRoutes");
const conn = process.env.MONGO_URL;
const auth = require("./middlewares/AuthenticationMiddleware");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("api/v1/", UserRouter);
app.use("api/v1/conversation", ConversationRouter);

const start = async (req, res) => {
  await connectDB(conn);
  console.log(`Database is connected`);
  app.listen(port, () => {
    console.log(`App is running on port ${port}`);
  });
};

start();
