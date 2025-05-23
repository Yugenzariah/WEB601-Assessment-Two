import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import NoteCard from "../components/NoteCard";
import NoteForm from "../components/NoteForm";
import {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
  archiveNote,
} from "../services/api";

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [activeNote, setActiveNote] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [showArchived, setShowArchived] = useState(false);
  const [activeTag, setActiveTag] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      getNotes(token)
        .then((res) => setNotes(res.data))
        .catch((err) => console.error(err));
    }
  }, [token]);

  const handleCreateNewNote = () => {
    if (!token) return;
    createNote({ title: "", content: "", tags: [] }, token)
      .then((res) => {
        setNotes([res.data, ...notes]);
        setActiveNote(res.data);
        setIsEditing(true);
      })
      .catch((err) => console.error(err));
  };

  const handleSaveNote = (noteData) => {
    if (!token || !activeNote) return;

    if (activeNote._id) {
      updateNote(activeNote._id, noteData, token)
        .then(() => {
          const updatedNote = { ...activeNote, ...noteData };
          setNotes(
            notes.map((n) => (n._id === activeNote._id ? updatedNote : n))
          );
          setActiveNote(null);
          setIsEditing(false);
        })
        .catch((err) => console.error(err));
    } else {
      createNote(noteData, token)
        .then(() => getNotes(token))
        .then((res) => {
          setNotes(res.data);
          setActiveNote(null);
          setIsEditing(false);
        })
        .catch((err) => console.error(err));
    }
  };

  const handleDeleteNote = (id) => {
    if (!token) return;
    deleteNote(id, token)
      .then(() => {
        setNotes(notes.filter((n) => n._id !== id));
        setActiveNote(null);
        setIsEditing(false);
      })
      .catch((err) => console.error(err));
  };

  const handleArchiveNote = (id) => {
    if (!token) return;
    archiveNote(id, token)
      .then(() => getNotes(token))
      .then((res) => {
        setNotes(res.data);
        setActiveNote(null);
        setIsEditing(false);
      })
      .catch((err) => console.error(err));
  };

  const filteredNotes = notes.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.tags.some((tag) =>
        tag.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesTag = !activeTag || note.tags.some((tag) => tag.name === activeTag);

    return note.isArchived === showArchived && matchesSearch && matchesTag;
  });

  const allTags = Array.from(
    new Set(notes.flatMap((note) => note.tags.map((tag) => tag.name)))
  );

  return (
    <div className="container-fluid">
      <div className="row vh-100">
        <div className="col-md-2 bg-light border-end px-0">
          <Sidebar
            tags={allTags}
            showArchived={showArchived}
            setShowArchived={setShowArchived}
            setActiveNote={setActiveNote}
            setIsEditing={setIsEditing}
            activeTag={activeTag}
            setActiveTag={setActiveTag}
          />
        </div>

        <div className="col-md-3 border-end d-flex flex-column">
          <div className="p-3 border-bottom">
            <input
              type="text"
              className="form-control form-control-sm mb-2"
              placeholder="Search notes by title or tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h5 className="fw-bold mb-0">
                {showArchived ? "Archived Notes" : "All Notes"}
              </h5>
              {activeTag && (
                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => setActiveTag(null)}
                >
                  Clear Filter
                </button>
              )}
            </div>
            {!showArchived && (
              <button
                className="btn btn-primary w-100 mt-2"
                onClick={handleCreateNewNote}
              >
                + Create New Note
              </button>
            )}
          </div>
          <div className="flex-grow-1 overflow-auto p-2">
            {filteredNotes.length === 0 ? (
              <p className="text-center text-muted mt-4">
                {showArchived
                  ? "No archived notes yet."
                  : "No matching notes found."}
              </p>
            ) : (
              filteredNotes.map((note) => (
                <NoteCard
                  key={note._id}
                  note={note}
                  activeNote={activeNote}
                  onSelect={() => {
                    setActiveNote(note);
                    setIsEditing(false);
                  }}
                  onEdit={() => {
                    setActiveNote(note);
                    setIsEditing(true);
                  }}
                  onDelete={() => note._id && handleDeleteNote(note._id)}
                />
              ))
            )}
          </div>
        </div>

        <div className="col-md-7 d-flex flex-column">
          <div className="p-4 border-bottom">
            {activeNote ? (
              <>
                <div className="d-flex justify-content-end mb-3">
                  {!showArchived && (
                    <button
                      className="btn btn-sm btn-outline-secondary me-2"
                      onClick={() =>
                        activeNote._id && handleArchiveNote(activeNote._id)
                      }
                    >
                      Archive
                    </button>
                  )}
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() =>
                      activeNote._id && handleDeleteNote(activeNote._id)
                    }
                  >
                    Delete
                  </button>
                </div>

                <NoteForm
                  onSave={handleSaveNote}
                  noteToEdit={activeNote}
                  setActiveNote={setActiveNote}
                  setNotes={setNotes}
                  notes={notes}
                  isEditing={isEditing}
                  setIsEditing={setIsEditing}
                />
              </>
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