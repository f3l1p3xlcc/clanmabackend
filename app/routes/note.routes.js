module.exports = (app) => {
    const notes = require('../controllers/note.controller.js');

    // Create a new Note
    app.post('/notes', notes.create);

    // Retrieve all Notes
    app.get('/notes', notes.findAll);

    // Retrieve a single Note with noteId
    app.get('/notes/:noteId', notes.findOne);

    // Update a Note with noteId
    app.put('/notes/:noteId', notes.update);
	
	// Update a Note with noteId
    app.put('/match/:noteId', notes.match);

    // Delete a Note with noteId
    app.delete('/notes/:noteId', notes.delete);
	
	app.post('/upload', notes.single);
	
}
