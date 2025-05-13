import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import NoteCard from '../components/NoteCard';
import NoteForm from '../components/NoteForm';
import { getNotes, createNote, updateNote, deleteNote } from '../services/api';

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [activeNote, setActiveNote] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      getNotes(token)
        .then(res => setNotes(res.data))
        .catch(err => console.error(err));
    }
  }, [token]);

  useEffect(() => {
    if (notes.length > 0 && !activeNote) {
      setActiveNote(notes[0]);
    }
  }, [notes, activeNote]);

  const handleCreateNewNote = () => {
    const newNote = { title: '', content: '', tags: [], tempId: Date.now() };
    setNotes([newNote, ...notes]);
    setActiveNote(newNote);
  };

  const handleSaveNote = (noteData) => {
    if (!token || !activeNote) return;

    if (activeNote._id) {
      updateNote(activeNote._id, noteData, token)
        .then(() => {
          setNotes(notes.map(n => n._id === activeNote._id ? { ...n, ...noteData } : n));
        })
        .catch(err => console.error(err));
    } else {
      createNote(noteData, token)
        .then(res => {
          const updatedNotes = notes.map(n => n === activeNote ? res.data : n);
          setNotes(updatedNotes);
          setActiveNote(res.data);
        })
        .catch(err => console.error(err));
    }
  };

  const handleDeleteNote = (id) => {
    if (!token) return;
    deleteNote(id, token)
      .then(() => {
        setNotes(notes.filter(n => n._id !== id));
        setActiveNote(null);
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="container-fluid">
      <div className="row vh-100">
        <div className="col-2 border-end">
          <Sidebar tags={["Personal", "Fitness", "Cooking", "Projects", "Dev Projects"]} />
        </div>

        <div className="col-4 border-end d-flex flex-column">
          <div className="p-3 border-bottom">
            <h5>All Notes</h5>
            <button className="btn btn-primary w-100 mt-2" onClick={handleCreateNewNote}>+ Create New Note</button>
          </div>
          <div className="flex-grow-1 overflow-auto p-3">
            {notes.map(note => (
              <NoteCard
                key={note._id || note.tempId}
                note={note}
                onEdit={() => setActiveNote(note)}
                onDelete={() => note._id ? handleDeleteNote(note._id) : setNotes(notes.filter(n => n !== note))}
              />
            ))}
          </div>
        </div>

        <div className="col-6 d-flex flex-column">
          <div className="p-4 border-bottom">
            {activeNote ? (
              <NoteForm
                onSave={handleSaveNote}
                noteToEdit={activeNote}
                setActiveNote={setActiveNote}
                setNotes={setNotes}
                notes={notes}
              />
            ) : (
              <p className="text-muted">Select or create a note to edit.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;