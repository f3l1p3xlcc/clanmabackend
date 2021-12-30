const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
    email: String,
    contrasenha: String,
	nombre: String,
	fechanac: String,
	dedicas: String,
	etapamaternidad: String,
	quebuscas: String,
	sobremi: String,
	amigospiensan : String,
	listamach: String,
	image1: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Note', NoteSchema);
