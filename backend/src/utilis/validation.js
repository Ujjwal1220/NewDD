const validator = require("validator");

const validationsignup = (req) => {
  const { FirstName, LastName, Email, password } = req.body;

  if (!FirstName || !LastName) {
    throw new Error("Name is not Valid");
  } else if (!validator.isEmail(Email)) {
    throw new Error("Email is not Valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter a strong password");
  }
};

const validateeditprofiledata = (req) => {
  const editdata = ["FirstName", "LastName", "Age", "gender", "photourl"];
  // Check if all fields in the request body are allowed for editing
  const iseditallowed = Object.keys(req.body).every((field) =>
    editdata.includes(field)
  );
  return iseditallowed; // Return true if valid, false otherwise
};

module.exports = {
  validationsignup,
  validateeditprofiledata,
};
