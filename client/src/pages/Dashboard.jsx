// Main dashboard page. Displays ProgressBar, NoteForm, and list of NoteCards.
import React, { useState } from 'react';
import NoteForm from '../components/NoteForm';
import NoteCard from '../components/NoteCard';
import ProgressBar from '../components/ProgressBar';

const Dashboard = () => {
  const [notes, setNotes] = useState([]); // TODO: Change dummy state
  const [noteToEdit, setNoteToEdit] = useState(null);

  // Add or update note
  const handleSaveNote = (noteData) => {
    if (noteToEdit) {
      // Update existing note
      setNotes(
        notes.map((note) =>
          note.id === noteToEdit.id ? { ...note, ...noteData } : note
        )
      );
      setNoteToEdit(null);
    } else {
      // Add new note
      const newNote = {
        id: Date.now(), // Temporary local ID
        title: noteData.title,
        content: noteData.content,
        tags: [] // No tags yet
      };
      setNotes([newNote, ...notes]);
    }
  };

  // Delete note
  const handleDeleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  // Edit note
  const handleEditNote = (note) => {
    setNoteToEdit(note);
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">My Notes</h1>

      {/* ProgressBar showing dummy completed vs total */}
      <ProgressBar completed={0} total={notes.length} />

      {/* Note form to add/edit notes */}
      <NoteForm onSave={handleSaveNote} noteToEdit={noteToEdit} />

      {/* Render list of NoteCards */}
      {notes.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          onEdit={handleEditNote}
          onDelete={handleDeleteNote}
        />
      ))}
    </div>
  );
};

export default Dashboard;