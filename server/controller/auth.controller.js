const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: "pls provide email or password",
    });
  }

  const userExist = await User.find({ email: email });
  if (userExist.length === 0) {
    return res.status(404).json({
      message: "user not found",
    });
  }

  const isPasswordMatched = bcrypt.compareSync(
    password,
    userExist[0].passwordHash,
  );
  if (isPasswordMatched) {
    const token = jwt.sign({ id: userExist[0]._id }, process.env.SECRET_KEY, {
      expiresIn: "20d",
    });

    res.status(200).json({
      success: true,
      message: "user logged in successfully",
      data: userExist,
      token: token,
    });
  } else {
    res.status(404).json({
      message: "invalid email or password",
    });
  }
};

module.exports = {
  loginUser,
};
