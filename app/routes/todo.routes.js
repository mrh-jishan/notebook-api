module.exports = (app) => {
    const todos = require('./../controllers/todo.controller');
    const authService = require('./../service/auth.service');
    const todoValidators = require('./../validators/todo.validators');

    // Create a new Todo
    app.post('/api/v1/todos', authService.verifyAccessToken, todoValidators.todoValidator, todos.create);

    app.get('/api/v1/todos', authService.verifyAccessToken, todos.findAll);

}