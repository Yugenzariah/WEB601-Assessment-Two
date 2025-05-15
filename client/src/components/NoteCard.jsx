// Displays a single note with title, content, tags, and edit/delete buttons.
import React from 'react';

const NoteForm = ({ onSave, noteToEdit, setActiveNote, setNotes, notes }) => {
  if (!noteToEdit) return null;
  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedNote = { ...noteToEdit, [name]: value };
    setActiveNote(updatedNote);
    setNotes(notes.map(n => n === noteToEdit ? updatedNote : n));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ title: noteToEdit.title, content: noteToEdit.content });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <input
          type="text"
          name="title"
          className="form-control form-control-sm fw-bold"
          placeholder="Note Title"
          value={noteToEdit.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <textarea
          name="content"
          className="form-control form-control-sm"
          placeholder="Note Content"
          rows="10"
          value={noteToEdit.content}
          onChange={handleChange}
          required
        ></textarea>
      </div>

      {/* Action buttons */}
      <div className="d-flex justify-content-between">
        <button type="submit" className="btn btn-sm btn-primary">Save Note</button>
        <button type="button" className="btn btn-sm btn-secondary" onClick={() => setActiveNote(null)}>Cancel</button>
      </div>
    </form>
  );
};

export default NoteForm;