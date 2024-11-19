DEVTINDER
Backend Project
Overview
This project is built using modern backend technologies, providing a robust API and database solution.
Below is a detailed description of the technologies used and instructions on how to set up the project on your local machine.

Technologies Used
Backend:
Node.js: A JavaScript runtime for executing server-side code.
Express: A web application framework for Node.js, used for creating APIs.
MongoDB: A NoSQL database used to store and manage data

API Testing:
Postman: Used for testing APIs and ensuring that the endpoints work as expected.

Features
RESTful API: Built using Express and Node.js.
Database: MongoDB for data storage.
API Testing: Postman collections for testing various API endpoints.

Prerequisites
Make sure you have the following installed:

Node.js: Download
MongoDB: Download
Postman: Download

app.get("/feed", async (req, res) => {
const useremail = req.body.Email;

try {
const resu = await User.find({ Email: useremail });
if (resu != 0) {
res.send(resu);
} else {
res.send("user not found");
}
} catch (err) {
res.status(400).send("Something went wrong");
}
});

app.get("/getbyID", async (req, res) => {
try {
const resu = await User.findById("6704a4c4d756554351dfc4b9");
res.send(resu);
} catch (err) {
res.send("Something went wrong");
}
});

app.delete("/remove", async (req, res) => {
const userid = req.body.userid;
try {
const rese = await User.findOneAndDelete(userid);
res.send(rese);
} catch (err) {
res.send("something went wrong");
}
});

app.patch("/update", async (req, res) => {
const userid = req.body.userid;
const data = req.body;
try {
const rest = await User.findByIdAndUpdate({ \_id: userid }, data, {
runValidators: true,
});
res.send(rest);
} catch (err) {
res.send("Something went wrong");
}
});
