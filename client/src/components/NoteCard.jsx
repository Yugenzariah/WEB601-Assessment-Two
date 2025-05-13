// Displays a single note with title, content, tags, and edit/delete buttons.
import React from 'react';

const NoteCard = ({ note, activeNote, onSelect, onEdit, onDelete }) => {
  return (
    <div
      className={`card mb-3 ${activeNote === note ? 'border-primary' : ''}`}
      onClick={() => onSelect(note)}
      style={{ cursor: 'pointer' }}
    >
      <div className="card-body">
        <h5 className="card-title">{note.title || 'Untitled Note'}</h5>
        <p className="card-text text-truncate">{note.content}</p>
        <div className="mb-2">
          {note.tags.map((tag, index) => (
            <span
              key={index}
              className="badge me-1"
              style={{ backgroundColor: tag.color, color: '#fff' }}
            >
              {tag.name}
            </span>
          ))}
        </div>
        <button className="btn btn-sm btn-outline-primary me-2" onClick={(e) => { e.stopPropagation(); onEdit(note); }}>Edit</button>
        <button className="btn btn-sm btn-outline-danger" onClick={(e) => { e.stopPropagation(); onDelete(note); }}>Delete</button>
      </div>
    </div>
  );
};

export default NoteCard;