require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');
const errorHandler = require('./app/middlewares/errorHandler');

// create express app
const app = express();

// cros origin 
app.use(cors())

// HTTP request logger middleware for node.js
app.use(logger('dev'));

// // parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

// define index route
require('./app/routes')(app);


// Configuring the database
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(process.env.MONGO_DB_URL, { useNewUrlParser: true })
    .then(() => {
        console.log("Successfully connected to the database");
        // listen for requests
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
        });
        return app;
    })
    .then(app => {
        app.use(errorHandler);
    })
    .catch(err => {
        console.log('Could not connect to the database. Exiting now...', err);
        process.exit();
    });

