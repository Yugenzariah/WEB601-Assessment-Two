// Displays a single note with title, content, tags, and edit/delete buttons.
import React from 'react';

const NoteCard = ({ note, onEdit, onDelete }) => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{note.title}</h5>
        <p className="card-text">{note.content}</p>
        {/* Display tags as colored badges */}
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
        {/* Action buttons */}
        <button className="btn btn-sm btn-outline-primary me-2" onClick={() => onEdit(note)}>
          Edit
        </button>
        <button className="btn btn-sm btn-outline-danger" onClick={() => onDelete(note._id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default NoteCard;