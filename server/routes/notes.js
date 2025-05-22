const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');

const {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
  archiveNote,
} = require('../controllers/notesController');


// Notes API routes
router.get('/', auth, getNotes); // Get all notes
router.post('/', auth, createNote); // Create a note
router.put('/:id', auth, updateNote); // Update a note
router.delete('/:id', auth, deleteNote); // Delete a note
router.patch('/:id/archive', auth, archiveNote); // Puts the note to archives

module.exports = router;