const jwt = require("jsonwebtoken");
require("dotenv").config();

const Auth = async (req, res, next) => {
  const authHeader = req.headers.Authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res
      .status(403)
      .json({ status: "failed", msg: "User Not authorized " });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(403)
      .json({ status: "failed", msg: "User Not authorized" });
  }
  const user = await jwt.verify(token, process.env.JWT_SECRET);
  if (user) {
    req.user = { userId: user.id, email: user.email };
    next();
  }

  return res.status(403).json({ status: "failed", msg: "User Not authorized" });
};

module.exports = Auth;
