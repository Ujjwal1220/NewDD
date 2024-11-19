const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema(
  {
    FirstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 100,
    },
    LastName: {
      type: String,
    },
    Email: {
      type: String, // The email field should be a string
      required: true, // This field is required
      lowercase: true, // Automatically convert the email to lowercase
      unique: true, // Ensure the email is unique across the database
      trim: true, // Remove any leading or trailing whitespace
      validate(value) {
        // Custom validator for checking valid email format
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email: " + value); // Throws error if email format is invalid
        }
      },
    },
    password: {
      type: String,
      // required: true,
    },
    Age: {
      type: Number,
      min: 18,
    },

    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender data is not valid");
        }
      },
    },

    PhoneNo: {
      type: Number,
      min: 10,
      max: 10,
    },
    photourl: {
      type: String,
    },
    about: {
      type: String,
      default: "[javascript,cricket,song]",
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

// const user=mongoose.model("user",UserSchema);
// module.exports={
//   user,
// }

//BOTH ARE SAME

UserSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user.id }, "UjjWal@123", {
    expiresIn: "7d",
  });
  return token;
};

UserSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const passwordHash = user.password;
  const isPasswordValid = await bcrypt.compare(
    passwordInputByUser,
    passwordHash
  );
  return isPasswordValid;
};
module.exports = mongoose.model("user", UserSchema);
