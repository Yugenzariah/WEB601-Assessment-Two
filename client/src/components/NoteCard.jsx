import React from 'react';

const NoteCard = ({ note, activeNote, onSelect, onEdit, onDelete }) => {
  return (
    <div
      className={`card mb-2 shadow-sm ${activeNote === note ? 'border-primary' : ''}`}
      onClick={() => onSelect(note)}
      style={{ cursor: 'pointer' }}
    >
      <div className="card-body p-3">
        <h6 className="card-title text-truncate mb-2 fw-bold">
          {note.title || 'Untitled Note'}
        </h6>
        <p className="card-text text-truncate small mb-3">
          {note.content}
        </p>
        <div className="d-flex flex-wrap">
          {note.tags.map((tag, index) => (
            <span
              key={index}
              className="badge me-1 mb-1"
              style={{ backgroundColor: tag.color, color: '#fff' }}
            >
              {tag.name}
            </span>
          ))}
        </div>
        <div className="mt-3 d-flex justify-content-end">
          <button
            className="btn btn-sm btn-outline-primary me-2"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(note);
            }}
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;