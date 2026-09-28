const User = require("../models/user.model");

const getUserProfile = async (req, res) => {
  const userId = req.user._id;

  const user = await User.findById(userId).select("-passwordHash");

  if (!user) {
    return res.status(400).json({
      message: "user not found",
    });
  }

  return res.status(200).json({
    success: true,
    message: "user fetched successfully",
    data: user,
  });
};

module.exports = {
  getUserProfile,
};
