const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

// create express app
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

// Configuring the database
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(process.env.MONGO_DB_URL,
    { useNewUrlParser: true })
    .then(() => {
        console.log("Successfully connected to the database");
    }).catch(err => {
        console.log('Could not connect to the database. Exiting now...', err);
        process.exit();
    });

// define index route
require('./app/routes/index')(app);

// listen for requests
app.listen(process.env.PORT || 5000, () => {
    console.log("Server is listening on port 3000");
});