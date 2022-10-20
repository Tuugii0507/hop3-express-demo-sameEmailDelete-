const express = require("express");
const mongoose = require("mongoose");
const app = express();
const User = require("./models/Users");

app.use(express.json());

const MONGODB_URL = "mongodb://localhost:27017/hop3-demo";

mongoose.connect(MONGODB_URL);
const connection = mongoose.connection;

connection.once("open", () => {
  console.log("Successfully connected to MongoDB server");
});

app.get("/", async (req, res) => {
  const users = await User.find().lean();
  res.send({
    data: users,
  });
});

app.post("/users", async (req, res) => {
  const { username, email, password } = req.body;
  const user = await User.create({
    username: username,
    email,
    password,
  });
  res.send({
    message: "user added",
  });
});

app.put("/users", async (req, res) => {
  const { username, email, password, id } = req.body;
  const user = await User.findOne({ email: email }).exec();
  let message;
  if (!user) {
    message = "user not found";
  } else {
    user.username = username;
    user.password = password;
    user.save();
    message = "updated user information";
  }

  res.send({
    message: "user updated",
  });
});

app.delete("/users", async (req, res) => {
  const { username, email, password, id } = req.body;
  const user = await User.findOne({ _id: id }).exec();
  let message;
  if (!user) {
    message = "user not found";
  } else {
    user.email = email;
    user.username = username;
    user.password = password;
    user.delete();
    message = "user deleted";
  }

  res.send({
    message: "user deleted",
  });
});

app.listen(3000, () => {
  console.log("web server is running on pc");
});
