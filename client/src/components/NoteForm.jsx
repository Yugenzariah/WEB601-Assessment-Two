// Displays a form to create or edit a note.
import React, { useState } from 'react';

const NoteForm = ({ onSave, noteToEdit }) => {
  // Initialize form fields with noteToEdit data if available
  const [title, setTitle] = useState(noteToEdit ? noteToEdit.title : '');
  const [content, setContent] = useState(noteToEdit ? noteToEdit.content : '');

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ title, content });
    setTitle('');
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Note Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <textarea
          className="form-control"
          placeholder="Note Content"
          rows="4"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        ></textarea>
      </div>
      <button type="submit" className="btn btn-primary">Save Note</button>
    </form>
  );
};

export default NoteForm;