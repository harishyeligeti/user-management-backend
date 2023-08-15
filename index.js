const express = require("express");
const connectDB = require("./db");
const user = require("./model");
const bodyParser = require("body-parser");
const cors = require("cors")
const app = express();

// Middleware to parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

// Home page
app.get("/", (req, res) => {
  res.send("Server running on port 5000");
});

// Get all users
app.get("/users", async (req, res) => {
  const allUsers = await user.find({});
  res.json(allUsers);
  // console.log(allUsers);
});

// Get single user
app.get("/users/:id", async (req, res) => {
  const singleUser = await user.findOne({ _id: req.params.id });
  res.json(singleUser);
});

//update user
app.put("/users/:id", (req, res) => {
  const userId = req.params.id;
  const userData = req.body;
  user.findByIdAndUpdate(userId, userData, { new: true }).then(updatedUser=>{
    if(!updatedUser){
      return res.status(400).json({error:'user not found'})
    }
    res.status(200).json({success:'user updated successfully'})
  }).catch(error=>{
    res.status(400).json({error:`${error}`})
    console.error(error)
  })
});

//delete user by id
app.delete("/users/:id", async (req, res) => {
  const userId = req.params.id;
  await user.findByIdAndDelete(userId).then(()=>{
    res.status(200).json({message:'user deleted successfully'})
  }).catch(error=>{
    res.status(400).json({error:'user id does not exists'})
    console.log(error);
  })
});

// Create a new user
app.post("/newuser", async (req, res) => {
  const { name, email, number } = req.body;
  const newUser = { name, email, number };
  await user.create(newUser).then(newUser=>{
    res.status(200).json({success:'user created successfully'})
  }).catch(error=>{
    res.status(400).json({error:`${error}`})
    console.log(error);
  })
});

// Starting the server
const start = async () => {
  try {
    await connectDB();
    app.listen(5000, () => {
      console.log("Server started on port 5000");
    });
  } catch (error) {
    console.log(error);
  }
};

start();
