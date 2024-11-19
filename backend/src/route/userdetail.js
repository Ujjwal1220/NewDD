const express = require("express");
const User = require("../models/user");
const userrouter = express.Router();
const { authentication } = require("../middlewares/Middleware");
const ConnectionRequest = require("../models/connectionrequest");

userrouter.get("/user/request/received", authentication, async (req, res) => {
  try {
    const loggedinUser = req.user;

    // Fetch connection requests where the logged-in user is the recipient (toUserId)
    const access = await ConnectionRequest.find({
      toUserId: loggedinUser._id,
      status: "interested",
    }).populate("fromUserId", ["FirstName", "LastName", "gender", "photourl"]);

    res.json({ message: "ok", data: access });
  } catch (err) {
    res.status(400).send("Check again request API, something went wrong");
  }
});

userrouter.get("/user/connections", authentication, async (req, res) => {
  try {
    const loginuser = req.user;

    const seeconnection = await ConnectionRequest.find({
      $or: [
        { fromUserId: loginuser._id, status: "accepted" },
        { toUserId: loginuser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", ["FirstName", "LastName", "photourl", "gender"])
      .populate("toUserId", ["FirstName", "LastName", "photourl", "gender"]);

    const data = seeconnection.map((key) => {
      if (key.fromUserId._id.toString() === loginuser._id.toString()) {
        return key.toUserId;
      }
      return key.fromUserId;
    });
    res.json({ data: data });
  } catch (err) {
    res.json({
      message: "Something wrong",
      data: err.message,
    });
  }
});

userrouter.get("/feed", authentication, async (req, res) => {
  try {
    const login = req.user;

    // Pagination setup
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 50 ? 50 : limit; // Maximum limit of 50
    const skip = (page - 1) * limit;

    // Fetch connection requests
    const findconnection = await ConnectionRequest.find({
      $or: [{ toUserId: login._id }, { fromUserId: login._id }],
    }).select("fromUserId toUserId");

    // Create a set of connected users (mutual friends)
    const mutualfriend = new Set();
    findconnection.forEach((req) => {
      mutualfriend.add(req.fromUserId.toString());
      mutualfriend.add(req.toUserId.toString());
    });

    // Find users not connected to the logged-in user
    const users = await User.find({
      $and: [
        { _id: { $nin: Array.from(mutualfriend) } }, // Exclude connected users
        { _id: { $ne: login._id } }, // Exclude the logged-in user
      ],
    })
      .select("FirstName LastName photourl gender") // Select required fields
      .skip(skip)
      .limit(limit);

    // Send response
    res.json({
      message: "Users fetched successfully",
      data: users,
    });
  } catch (err) {
    res.status(500).send("An error occurred: " + err.message);
  }
});

module.exports = userrouter;
