const jwt = require("jsonwebtoken");
require("dotenv").config();

const Auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res
        .status(403)
        .json({ status: "failed", msg: "User Not authorized, No token " });
    }

    const token = authHeader.split(" ")[1];
    const payload = await jwt.verify(token, process.env.JWT_SECRET);
    if (payload) {
      req.user = { userId: payload.id, email: payload.email };
      return next();
    }
    return res.status(403).json({
      status: "failed",
      msg: "User Not authorized, token doesnt match",
    });
  } catch (error) {
    console.log(error);
    return res.status(403).json({
      status: "failed",
      msg: "User Not authorized, token doesnt match",
      error: error,
    });
  }
};

module.exports = Auth;
