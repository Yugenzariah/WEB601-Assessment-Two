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
  const [userSelected, setUserSelected] = useState(false);
  const [activeNote, setActiveNote] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      getNotes(token)
        .then((res) => setNotes(res.data))
        .catch((err) => console.error(err));
    }
  }, [token]);

  useEffect(() => {
    if (notes.length > 0 && !activeNote && !userSelected) {
      setActiveNote(notes[0]);
      setIsEditing(false);
    }
  }, [notes, activeNote, userSelected]);

  // Click anywhere outside to deselect
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".col-md-3") && !e.target.closest(".col-md-7")) {
        setActiveNote(null);
        setIsEditing(false);
        setUserSelected(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleCreateNewNote = () => {
    if (!token) return;
    createNote({ title: "", content: "", tags: [] }, token)
      .then((res) => {
        const newNote = res.data;
        setNotes([newNote, ...notes]);
        setActiveNote(newNote);
        setIsEditing(true);
        setUserSelected(true);
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
        .then((res) => {
          setNotes([res.data, ...notes]);
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

  const filteredNotes = notes
    .filter((note) => !note.isArchived)
    .filter(
      (note) =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.tags.some((tag) =>
          tag.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );

  return (
    <div className="container-fluid">
      <div className="row vh-100">
        {/* Left Sidebar */}
        <div className="col-md-2 bg-light border-end px-0">
          <Sidebar
            tags={[
              "Personal",
              "Fitness",
              "Cooking",
              "Projects",
              "Dev Projects",
            ]}
          />
        </div>

        {/* Middle Notes List */}
        <div className="col-md-3 border-end d-flex flex-column">
          <div className="p-3 border-bottom">
            <input
              type="text"
              className="form-control form-control-sm mb-2"
              placeholder="Search notes by title or tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <h5 className="fw-bold">All Notes</h5>
            <button
              className="btn btn-primary w-100 mt-2"
              onClick={handleCreateNewNote}
            >
              + Create New Note
            </button>
          </div>
          <div className="flex-grow-1 overflow-auto p-2">
            {filteredNotes.length === 0 ? (
              <p className="text-center text-muted mt-4">
                No matching notes found.
              </p>
            ) : (
              filteredNotes.map((note) => (
                <NoteCard
                  key={note._id}
                  note={note}
                  activeNote={activeNote}
                  onSelect={() => {
                    if (activeNote?._id === note._id) {
                      setActiveNote(null); // toggle deselect
                      setIsEditing(false);
                      setUserSelected(true);
                    } else {
                      setActiveNote(note);
                      setIsEditing(false);
                      setUserSelected(true);
                    }
                  }}
                  onEdit={() => {
                    setActiveNote(note);
                    setIsEditing(true);
                    setUserSelected(true);
                  }}
                  onDelete={() =>
                    note._id
                      ? handleDeleteNote(note._id)
                      : setNotes(notes.filter((n) => n !== note))
                  }
                />
              ))
            )}
          </div>
        </div>

        {/* Right Note Editor */}
        <div className="col-md-7 d-flex flex-column">
          <div className="p-4 border-bottom">
            {activeNote ? (
              <>
                <div className="d-flex justify-content-end mb-3">
                  <button
                    className="btn btn-sm btn-outline-secondary me-2"
                    onClick={() =>
                      activeNote._id &&
                      archiveNote(activeNote._id, token)
                        .then(() =>
                          setNotes(
                            notes.map((n) =>
                              n._id === activeNote._id
                                ? { ...n, isArchived: true }
                                : n
                            )
                          )
                        )
                        .then(() => {
                          setActiveNote(null);
                          setIsEditing(false);
                        })
                        .catch((err) => console.error(err))
                    }
                  >
                    Archive
                  </button>
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