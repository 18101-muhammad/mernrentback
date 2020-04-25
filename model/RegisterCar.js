const mongoose = require("mongoose");


const registerCar_schema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    company:String,
    model:String,
    rent:String, 
    carImage:String
    })

module.exports = mongoose.model("RegisterCar", registerCar_schema);