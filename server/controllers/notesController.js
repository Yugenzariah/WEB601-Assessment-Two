const Note = require('../models/Note');

// Get all notes for logged-in user
exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user.id });
    res.json(notes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Create a new note
exports.createNote = async (req, res) => {
  const { title, content, tags } = req.body;

  try {
    const newNote = new Note({
      userId: req.user.id,
      title,
      content,
      tags
    });

    const note = await newNote.save();
    res.json(note);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Update existing note
exports.updateNote = async (req, res) => {
  const { title, content, tags, isArchived } = req.body;

  try {
    let note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ msg: 'Note not found' });
    if (note.userId.toString() !== req.user.id)
      return res.status(401).json({ msg: 'Not authorized' });

    if (title) note.title = title;
    if (content) note.content = content;
    if (tags) note.tags = tags;
    if (isArchived !== undefined) note.isArchived = isArchived;

    const updatedNote = await note.save();
    res.json(updatedNote);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Delete a note
exports.deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ msg: 'Note not found' });
    if (note.userId.toString() !== req.user.id)
      return res.status(401).json({ msg: 'Not authorized' });

    await Note.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Note removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Archive a note
exports.archiveNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ msg: 'Note not found' });
    if (note.userId.toString() !== req.user.id)
      return res.status(401).json({ msg: 'Not authorized' });

    note.isArchived = true;
    await note.save();
    res.json({ msg: 'Note archived successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};