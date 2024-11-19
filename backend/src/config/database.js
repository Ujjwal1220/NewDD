const mongoose = require("mongoose");

const connectdb = async () => {
  await mongoose.connect(
    "mongodb+srv://Practice:pFEKHZ6tIMDBlumQ@practice.pjx3b.mongodb.net/devTinder"
  );
};

module.exports = {
  connectdb,
};
