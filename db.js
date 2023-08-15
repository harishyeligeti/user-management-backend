const mongoose = require("mongoose");
require("dotenv").config()

const connectDB = async() => {
  return await mongoose.connect(
    process.env.DATABASE_URL,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  ;
 
};


module.exports = connectDB