module.exports = (app) => {
    const users = require('../controllers/user.controller');
    const authController = require('./../controllers/auth.controller');
    const authService = require('./../service/auth.service');

    app.get('/api/v1/me', authService.verifyAccessToken, authController.me);

    // Create a new User
    app.post('/users', users.create);

    // Retrieve all Users
    app.get('/users', users.findAll);

    // Retrieve a single User with userId
    app.get('/users/:userId', users.findOne);

    // Update a User with userId
    app.put('/users/:userId', users.update);

    // Delete a User with userId
    app.delete('/users/:userId', users.delete);
}