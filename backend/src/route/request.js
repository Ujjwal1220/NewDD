const express = require("express");
const requestrouter = express.Router();
const { authentication } = require("../middlewares/Middleware");
const ConnectionRequest = require("../models/connectionrequest");
const User = require("../models/user");

requestrouter.post(
  "/sendconnectionrequest/:status/:touserid",
  authentication,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.touserid;
      const status = req.params.status;
      const isallowedstatus = ["interested", "ignored"];

      if (!isallowedstatus.includes(status)) {
        return res.status(400).send("Invalid status type " + status);
      }

      // API VALIDATION
      if (fromUserId.equals(toUserId)) {
        throw new Error("You can't send a connection request to yourself");
      }

      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });
      if (existingConnectionRequest) {
        return res
          .status(400)
          .send({ message: "Connection Request Already Exists!!" });
      }

      // Fetch the user information (photourl and gender) from the database
      const fromUser = await User.findById(fromUserId);
      if (!fromUser) {
        throw new Error("User not found");
      }

      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
        photourl: fromUser.photourl, // use fromUser's photourl
        gender: fromUser.gender, // use fromUser's gender
      });

      const result = await connectionRequest.save();
      res.json({
        message: "Connection request sent successfully",
        result,
      });
    } catch (err) {
      res.status(400).send("Error in sending request--" + err.message);
    }
  }
);

requestrouter.post(
  "/request/review/:status/:requestId",
  authentication,
  async (req, res) => {
    try {
      const todata = req.user;
      const { status, requestId } = req.params;

      const checkstatus = ["accepted", "rejected"];

      if (!checkstatus.includes(status)) {
        return res.status(400).send("status is not correct");
      }

      const legal = await ConnectionRequest.findOne({
        status: "interested",
        _id: requestId,
        toUserId: todata._id,
      });
      if (!legal) {
        return res
          .status(400)
          .json({ message: "Connection request not found" });
      }
      legal.status = status;

      const data = await legal.save();

      res.json({ message: "Connection request " + status, data });
    } catch (err) {
      res.status(400).send("ERROR: " + err.message);
    }
  }
);

module.exports = { requestrouter };
