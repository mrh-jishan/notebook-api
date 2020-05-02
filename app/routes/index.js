'use strict';

const responseHandler = require('./../middlewares/responseHandler');
const routes = require('./routes');


module.exports = (app) => {

    app.get('/', (req, res) => {
        res.status(200).json({ "message": "Welcome to EasyNotes application. Take notes quickly." });
    });

    // public
    app.use('/api/v1', routes, responseHandler)

  
    app.use('*', function (req, res, next) {
        console.log("NO ROUTE MATCH");
        next({ err: 'NO_API_FOUND' });
    });

    return app;
}

