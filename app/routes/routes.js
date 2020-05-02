'use strict';

const router = require('express').Router();

const authValidators = require('../validators/auth.validators');
const authController = require('./../controllers/auth.controller');
const users = require('../controllers/user.controller');

const todos = require('./../controllers/todo.controller');
const todoValidators = require('./../validators/todo.validators');

const notes = require('../controllers/note.controller');
const authService = require('./../service/auth.service');
const noteValidators = require('./../validators/note.validators');


// public 
router.post('/login', authValidators.loginValidator, authController.login);
router.post('/register', authValidators.registerValidator, authController.register);


// secure 
router.post('/notes', authService.verifyAccessToken, noteValidators.noteValidator, notes.create);
router.get('/notes', authService.verifyAccessToken, notes.findAll);
router.get('/notes/:noteId', authService.verifyAccessToken, notes.findOne);
router.put('/notes/:noteId', authService.verifyAccessToken, notes.update);
router.delete('/notes/:noteId', authService.verifyAccessToken, notes.delete);


router.post('/todos', authService.verifyAccessToken, todoValidators.todoValidator, todos.create);
router.get('/todos', authService.verifyAccessToken, todos.findAll);


router.get('/me', authService.verifyAccessToken, authController.me);
router.post('/users', users.create);
router.get('/users', users.findAll);
router.get('/users/:userId', users.findOne);
router.put('/users/:userId', users.update);
router.delete('/users/:userId', users.delete);

module.exports = router;
