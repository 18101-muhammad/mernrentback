const router = require('express').Router();
const mongoose = require('mongoose');
const Signup = mongoose.model("Signup");
const bcrypt = require("bcrypt");


router.post("/", async (req, res) => {
  const password = req.body.password;
  const person = await Signup.findOne({
    email: req.body.email
  });
  if (!person) return res.status(400).send("No account registered against the inserted Email Address");
  else
    bcrypt.compare(password, person.password, function (err, isMatch) {
      if (err) {
        throw err
      } else if (!isMatch) {
        res.send("Incorrect Email Or Password");
      } else {
        res.send(person)
      }
    })
})
module.exports = router;