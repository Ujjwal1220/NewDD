const jwt = require("jsonwebtoken");
const User = require("../models/user");
const authentication = async (req, res, next) => {
  try {
    const resu = req.cookies;
    const { token } = resu;
    if (!token) {
      return res.status(401).send("Login Again");
    }
    const decodeddata = await jwt.verify(token, "UjjWal@123");
    const { _id } = decodeddata;
    const valid = await User.findById(_id);
    if (!valid) {
      throw new Error("User is not valid");
    }
    req.user = valid;
    next();
  } catch (err) {
    // Send the actual error message
    res.status(400).send(`ERROR:${err.message}`);
  }
};

module.exports = {
  authentication,
};
