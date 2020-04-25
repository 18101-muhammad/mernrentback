const mongoose = require("mongoose");


const carBooking_schema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    bookedBy:{ type: mongoose.Schema.Types.ObjectId, ref:'Signup'},
    cars:{ type: mongoose.Schema.Types.ObjectId, ref:'RegisterCar'},
    // quantity: {type: Number , default: 1}
    })

    console.log("In Car Booking");
module.exports = mongoose.model("CarBooking", carBooking_schema);