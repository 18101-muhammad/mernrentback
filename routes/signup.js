const router = require('express').Router();
const mongoose = require('mongoose');
const Signup = mongoose.model("Signup");
const bcrypt = require("bcrypt");

router.post("/", async (req, res, next) => {
    console.log("Hello");

    const person = await Signup.findOne({
        email: req.body.email
    });
    if (person) return res.status(400).send("This Email Address already registered");
    else

        info = new Signup();
    info._id = mongoose.Types.ObjectId();
    info.firstName = req.body.fname;
    info.lastName = req.body.lname
    info.email = req.body.email;
    info.password = req.body.password;
    info.address = req.body.address;
    info.user_role = req.body.user_role

    const hash = await bcrypt.hashSync(info.password, 10);
    info.password = hash;

    // console.log(hash);
    // console.log(bcrypt.compareSync("a8", hash));
    info.save();
    res.send({ "Registered Successfully": info });

})


router.get("/", async (req, res) => {
    const person = await Signup.find({ user_role: "customer" });
    res.send(person)
})

router.get("/:signupId", async (req, res) => {
    const person = await Signup.findOne({ _id: req.params.signupId })
    res.send(person);
})


router.put("/:signupId", async (req, res) => {
    const person = await Signup.findOneAndUpdate({
        _id: req.params.signupId
    },
        req.body,
        {
            new: true,
            runValidators: true
        })
    res.send(person);
})

router.delete("/:signupId", async (req, res) => {
    const person = await Signup.findByIdAndRemove({
        _id: req.params.signupId
    });
    res.send({ "Record Deleted Successfully :": person });
})


module.exports = router;