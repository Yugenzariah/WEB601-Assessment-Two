// Main Dashboard layout 
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import NoteCard from '../components/NoteCard';

const Dashboard = () => {
  const [notes] = useState([ // dummy notes for layout
    { id: 1, title: 'Develop Note Taking App', content: 'Task list and plans', tags: [{ name: 'Dev Projects', color: '#007bff' }] },
    { id: 2, title: '30 Day Exercise Goal', content: 'Workout schedule', tags: [{ name: 'Fitness', color: '#28a745' }] }
  ]);

  const [activeNote] = useState(notes[0]); // dummy active note

  return (
    <div className="container-fluid">
      <div className="row vh-100">
        {/* Left Sidebar (Tags) */}
        <div className="col-2 border-end">
          <Sidebar tags={["Personal", "Fitness", "Cooking", "Projects", "Dev Projects"]} />
        </div>

        {/* Middle Notes List */}
        <div className="col-4 border-end d-flex flex-column">
          <div className="p-3 border-bottom">
            <h5>All Notes</h5>
            <button className="btn btn-primary w-100 mt-2">+ Create New Note</button>
          </div>
          <div className="flex-grow-1 overflow-auto p-3">
            {notes.map(note => (
              <NoteCard key={note.id} note={note} onEdit={() => {}} onDelete={() => {}} />
            ))}
          </div>
        </div>

        {/* Right Active Note View */}
        <div className="col-6 d-flex flex-column">
          <div className="p-4 border-bottom d-flex justify-content-between align-items-start">
            <div>
              <h4>{activeNote.title}</h4>
              <p><small>Last edited: May 4, 2025</small></p>
              <div>
                {activeNote.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="badge me-1"
                    style={{ backgroundColor: tag.color, color: '#fff' }}
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>
            <div className="ms-3">
              <button className="btn btn-outline-secondary mb-2 w-100">Archive Note</button>
              <button className="btn btn-outline-danger w-100">Delete Note</button>
            </div>
          </div>

          <div className="flex-grow-1 p-4 overflow-auto">
            <p>{activeNote.content}</p>
          </div>

          <div className="p-3 border-top">
            <button className="btn btn-primary w-100 mb-2">Save Note</button>
            <button className="btn btn-secondary w-100">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;