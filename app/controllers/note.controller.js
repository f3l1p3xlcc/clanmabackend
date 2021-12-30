const Note = require('../models/note.model.js');
const multer = require('multer');
const express = require('express');
const path = require('path');
const fs = require('fs');
const upload = multer({ dest: 'public/images/' })


exports.single = (req, res) => {
		fs.renameSync(req.file.path, req.file.path + '.' + req.file.mimetype.split('/')[1]);
		//res.send('Se ha subido');
		console.log('Se ha subido');
	}

// Create and Save a new Note
exports.create = (req, res) => {
    // Validate request
    if(!req.body.contrasenha) {
		console.log(' if(!req.body.content) ',req.body )
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }

    // Create a Note
    const note = new Note({
        email: req.body.email || "Untitled Note", 
        contrasenha: req.body.contrasenha,
		nombre: "",
		fechanac: "",
		dedicas: "",
		etapamaternidad: "",
		quebuscas: "",
		sobremi: "",
		amigospiensan : ""		
    });

    // Save Note in the database
    note.save()
    .then(data => {
		console.log(' then(data => { ',data )
		console.log(' then(req.body => { ',req.body )
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    });
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    Note.find()
    .then(notes => {
        res.send(notes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};

// Find a single note with a noteId
// Find a single note with a noteId
exports.findOne = (req, res) => {
    Note.findById(req.params.noteId)
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });            
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving note with id " + req.params.noteId
        });
    });
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    // Validate Request
    /*if(!req.body.email) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }*/

    // Find note and update it with the request body
    Note.findByIdAndUpdate(req.params.noteId, {
        email: req.body.email,
        contrasenha: req.body.contrasenha,
		nombre: req.body.nombre,
		fechanac: req.body.fechanac,
		dedicas: req.body.dedicas,
		etapamaternidad: req.body.etapamaternidad,
		quebuscas: req.body.quebuscas,
		sobremi: req.body.sobremi,
		amigospiensan: req.body.amigospiensan,
		image1: req.file.path
    }, {new: true})
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Error updating note with id " + req.params.noteId
        });
    });
};

// mach

exports.match = (req, res) => {
    // Validate Request
    /*if(!req.body.email) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }*/

    // Find note and update it with the request body
    Note.findByIdAndUpdate(req.params.noteId, {
        listamach : req.body.match
    }, {new: true})
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Error updating note with id " + req.params.noteId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Note.findByIdAndRemove(req.params.noteId)
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        res.send({message: "Note deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Could not delete note with id " + req.params.noteId
        });
    });
};
