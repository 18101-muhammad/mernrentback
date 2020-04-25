const router = require('express').Router();
const mongoose = require('mongoose');
const RegisterCar = mongoose.model("RegisterCar");
const multer = require('multer');
// const bcrypt = require("bcrypt");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (!file.mimetype.match(/jpe|jpeg|png|gif$i/)) {

        cb(new Error('File is not supported'), false)
        return
    } else cb(null, true)
}


const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 },
    fileFilter: fileFilter
})

router.post("/", upload.single('carImage'), async (req, res, next) => {
    console.log("Hello")

    const car = new RegisterCar();

    if (req.file) {
        console.log({ "File attached: ": req.file });
        car.carImage = req.file.path;
    }
    else
        console.log("file not attached");
    car._id = mongoose.Types.ObjectId();
    car.company = req.body.company;
    car.model = req.body.model;
    car.rent = req.body.rent;
    car.save();
    res.send({ "Car Registered Successfully": car });
})


router.get("/", async (req, res) => {
    const allCars = await RegisterCar.find({});
    res.send(allCars);
})


router.put("/:carId", async (req, res) => {
    var id = req.params.carId;
    const updateCar = await RegisterCar.findOneAndUpdate({
        _id: id
    },
        req.body,
        {
            new: true,
            // runValidators: true
        })
    console.log(id);
    res.send({ "Record Updated Successfully": updateCar });
})




router.delete("/:carId", async (req, res) => {
    const car = await RegisterCar.findByIdAndRemove({
        _id: req.params.carId
    });
    // res.send(person);
    res.send({ "Record Deleted Successfully": car });
})
module.exports = router;