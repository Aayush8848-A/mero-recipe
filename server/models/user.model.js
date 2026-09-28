const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema({
  username: String,
  email: String,
  passwordHash: String,
  role: {
    type: String,
    enum: ["USER", "ADMIN"],
    default: "USER",
  },
},{
  timeStamps : true
});

const User = mongoose.model("User", userSchema);
module.exports = User;
