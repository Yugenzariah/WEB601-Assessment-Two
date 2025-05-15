import React from 'react';

const NoteForm = ({ onSave, noteToEdit, setActiveNote, setNotes, notes, isEditing, setIsEditing }) => {
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
          disabled={!isEditing}     // lock title when not editing
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
          disabled={!isEditing}     // lock content when not editing
        ></textarea>
      </div>

      {/* Show Save/Cancel only if editing */}
      {isEditing && (
        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-sm btn-primary">Save Note</button>
          <button
            type="button"
            className="btn btn-sm btn-secondary"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </button>
        </div>
      )}
    </form>
  );
};

export default NoteForm;