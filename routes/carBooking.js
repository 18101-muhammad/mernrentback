const router = require('express').Router();
const mongoose = require('mongoose');
const CarBooking = mongoose.model("CarBooking");
const RegisterCar = mongoose.model("RegisterCar");
const Signup = mongoose.model("Signup");


router.post("/:bookedBy/:car", async (req, res, next) => {
    const registered = new CarBooking();
    registered._id = mongoose.Types.ObjectId();
    registered.bookedBy = req.params.bookedBy;
    registered.cars = req.params.car;
    registered.save()
        .then(result => {
            res.status(201).json(
                { "Car Booked Successfully": result });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
})

router.get("/", (req, res) => {
    CarBooking.find()
        .populate('bookedBy', 'email')
        .populate('cars')
        .exec()
        .then(docs => {
            res.status(200).json(docs)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
})


module.exports = router;