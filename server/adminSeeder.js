const bcrypt = require("bcryptjs");
const User = require("./models/user.model");

const adminSeeder = async () => {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const adminUsername = process.env.ADMIN_USERNAME;

  if (!adminEmail || !adminPassword || !adminUsername) {
    throw new Error(
      "ADMIN_EMAIL, ADMIN_PASSWORD and ADMIN_USERNAME must be defined",
    );
  }

  const adminUser = await User.findOne({ email: adminEmail });

  if (!adminUser) {
    await User.create({
      username: adminUsername,
      email: adminEmail,
      role: "ADMIN",
      fullName: "admin",
      passwordHash: bcrypt.hashSync(adminPassword, 8),
    });
    console.log("admin created successfully");
  } else {
    console.log("admin already created");
  }
};

module.exports = adminSeeder;
