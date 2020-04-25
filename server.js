const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const server = require("http").createServer(app);

//MiddleWare
app.use(bodyParser.json());
app.use(morgan())
app.use('/uploads', express.static('uploads'));
app.use(cors());


//DataBase Connection
require("./mongo");

//Models
require("./model/Signup");
require("./model/RegisterCar");
require("./model/CarBooking");

// //Routes
app.use("/signup", require("./routes/signup"));
app.use("/login", require("./routes/login"));
app.use("/cars", require("./routes/cars"));
app.use("/carBooking", require("./routes/carBooking"));


//Middleware for 404 error generator
app.use((req, res, next) => {
    req.status = 404;
    const error = new Error("route not found");
    next(error);
})

//Error Handler
app.use((error, req, res, next) => {
    res.status(req.status || 500).send({
        message: error.message,
        stack: error.stack
    });
});

const port = process.env.PORT || 9000;
server.listen(port, () => {
    console.log(`Mern-Stack Server is running at port ${port}`);
})   