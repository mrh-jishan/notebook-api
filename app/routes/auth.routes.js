
module.exports = (app) => {
    const authValidators = require('../validators/auth.validators');
    const authController = require('./../controllers/auth.controller');

    app.post('/api/v1/login', authValidators.loginValidator, authController.login);
    app.post('/api/v1/register', authValidators.registerValidator, authController.register);

}