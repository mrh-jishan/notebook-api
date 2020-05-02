'use strict'

module.exports = function (err, req, res, next) {

    let message;
    let errorTitle = err.message || err.err;

    try {
        res.status(err.code || 401).send({
            'data':  err,
            'success': false,
            'status': err.code || 401
        });
    } catch (err) {
        console.log(err);
        res.status(401).send({
            'data': 'Something went wrong. Please try again',
            'success': false,
            'status': 401
        });
    }
}
