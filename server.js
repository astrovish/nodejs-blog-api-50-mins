const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const blogRoutes = require("./routes/blogRoutes");

// configuring .env file path
dotenv.config({path: "./config/config.env"});

// creating an express application
const app = express();

// connecting application with database
mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
.then(result => {
    console.log("Application successfully connected with database");
})
.catch(err => {
    console.log(`Following error occured while connecting with database: ${err}`);
})

// listening application on assigned port
const PORT = process.env.PORT || 3201;
app.listen(PORT, () => {
    console.log(`Application is up and running on port: ${PORT}`);
})

app.use(bodyParser.json());

// blog routes
app.use("/api/v1/blogs", blogRoutes);