const express = require("express");
const { getUserProfile } = require("../controller/user.controller");
const catchAsync = require("../services/catchAsync");
const isAuthenticatedUser = require("../middleware/isAuthenticatedUser.middleware");

const router = express.Router();

router.route("/profile").get(isAuthenticatedUser, catchAsync(getUserProfile));

module.exports = router;
