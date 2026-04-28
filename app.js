const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Connect MongoDB
mongoose.connect("mongodb://mongo:27017/testdb")
  .then(() => console.log("Mongo Connected"))
  .catch(err => console.log(err));

// Schema
const UserSchema = new mongoose.Schema({
  name: String
});

const User = mongoose.model("User", UserSchema);

// Home route
app.get("/", (req, res) => {
  res.send("Node + Mongo API Working 🚀");
});

// Add user
app.post("/add", async (req, res) => {
  const user = new User({ name: req.body.name });
  await user.save();
  res.send("User saved");
});

// Get users
app.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Start server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
