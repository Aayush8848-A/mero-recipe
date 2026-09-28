const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const isAuthenticatedUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Authentication token is required",
    });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(403).json({
      success: false,
      message: "please login",
    });
  }

  jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
    if (err) {
      return res.status(401).json({
        message: "invalid or expired token",
      });
    }

    const userExist = await User.findOne({ _id: decoded.id });
    if (!userExist) {
      return res.status(401).json({
        message: "user does not exist with that id",
      });
    }
    req.user = userExist;
    next();
  });
};

module.exports = isAuthenticatedUser;
