const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name:String,
    email:String,
    number:String
})

const user = mongoose.model("user",userSchema)

module.exports = user