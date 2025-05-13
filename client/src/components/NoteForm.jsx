import React from 'react';

const NoteForm = ({ onSave, noteToEdit, setActiveNote, setNotes, notes }) => {
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
          className="form-control"
          placeholder="Note Title"
          value={noteToEdit.title}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <textarea
          name="content"
          className="form-control"
          placeholder="Note Content"
          rows="6"
          value={noteToEdit.content}
          onChange={handleChange}
          required
        ></textarea>
      </div>
      <button type="submit" className="btn btn-primary w-100">Save Note</button>
    </form>
  );
};

export default NoteForm;