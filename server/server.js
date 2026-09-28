require("dotenv").config();
const express = require("express");
const connectToDatabase = require("./config/database/dbConfig");
const app = express();
const cors = require("cors");

app.use(express.json());

app.use(
  cors({
    origin: "*",
  }),
);

connectToDatabase();

const errorHandler = require("./middleware/error.middleware");

app.get("/", (_, res) => {
  return res.json({
    message: "Recipe Management Server is Live",
  });
});

const userRoute = require("./routes/user.route");
const authRoute = require("./routes/auth.route");
const recipeRoute = require("./routes/recipe.route");

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/recipes", recipeRoute);

app.use("/api/v1/uploads", express.static("./uploads"));


app.use(errorHandler);

const port = process.env.PORT;
app.listen(port, () => {
  console.log("server is up and running on port 5000");
});
