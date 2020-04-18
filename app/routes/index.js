
module.exports = (app) => {    
    app.get('/', (req, res) => {
        res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});
    });  
    require('./note.routes')(app);
    require('./user.routes')(app);
}

