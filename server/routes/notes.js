const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
  getNotes,
  createNote,
  updateNote,
  deleteNote
} = require('../controllers/notesController');

// Notes API routes
router.get('/', auth, getNotes); // Get all notes
router.post('/', auth, createNote); // Create a note
router.put('/:id', auth, updateNote); // Update a note
router.delete('/:id', auth, deleteNote); // Delete a note

module.exports = router;