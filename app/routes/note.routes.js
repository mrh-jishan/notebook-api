module.exports = (app) => {
    const notes = require('../controllers/note.controller');
    const authService = require('./../service/auth.service');
    const noteValidators = require('./../validators/note.validators');

    // Create a new Note
    app.post('/api/v1/notes', authService.verifyAccessToken, noteValidators.noteValidator, notes.create);

    // Retrieve all Notes
    app.get('/api/v1/notes', authService.verifyAccessToken, notes.findAll);

    // Retrieve a single Note with noteId
    app.get('/api/v1/notes/:noteId', authService.verifyAccessToken, notes.findOne);

    // Update a Note with noteId
    app.put('/api/v1/notes/:noteId', authService.verifyAccessToken, notes.update);

    // Delete a Note with noteId
    app.delete('/api/v1/notes/:noteId', authService.verifyAccessToken, notes.delete);
}