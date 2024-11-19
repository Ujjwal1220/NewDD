const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieparser = require("cookie-parser");
const app = express();
const { connectdb } = require("./src/config/database");
const User = require("./src/models/user");
const { validationsignup } = require("./src/utilis/validation");
const { authrouter } = require("./src/route/auth");
const { profilerouter } = require("./src/route/profile");
const { requestrouter } = require("./src/route/request");
const userrouter = require("./src/route/userdetail");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
app.use(express.json());
app.use(cookieparser());
dotenv.config();
const _dirname = path.resolve();
const PORT = process.env.PORT || 7777;
app.use(
  cors({
    origin: "https://newdd.onrender.com",
    credentials: true,
  })
);
app.options("*", cors());
app.use("/", authrouter);
app.use("/", profilerouter);
app.use("/", requestrouter);
app.use("/", userrouter);
app.use(express.static(path.join(_dirname, "/frontend/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
});

connectdb()
  .then(() => {
    console.log("connected successfully");
    app.listen(PORT, () => {
      console.log("Hey! Server is running on port 7777");
    });
  })
  .catch((err) => {
    console.error("disconnected");
  });
