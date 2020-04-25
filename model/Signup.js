const mongoose = require("mongoose");


const signup_schema = mongoose.Schema({
    
_id:mongoose.Schema.Types.ObjectId,
    firstName:String,
    lastName:String,
    email:  {type: String, required: true },
    password:String,
    address:String,  
    user_role:String
    })
module.exports = mongoose.model("Signup", signup_schema);