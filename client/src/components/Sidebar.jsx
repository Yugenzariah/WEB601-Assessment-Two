// Sidebar component displays user info, filter buttons, and tag list.
import React from 'react';
import { FaUserCircle, FaStickyNote, FaArchive, FaTag } from 'react-icons/fa';

const Sidebar = ({ tags }) => {
  return (
    <div className="d-flex flex-column h-100 p-3">
      {/* Top user info */}
      <div className="text-center mb-4">
        <FaUserCircle size={60} className="text-secondary" />
        <h6 className="mt-2 fw-bold">Username</h6>
      </div>

      {/* Navigation */}
      <div>
        <div className="d-flex align-items-center mb-3">
          <FaStickyNote className="me-2" />
          <span>All Notes</span>
        </div>
        <div className="d-flex align-items-center mb-4">
          <FaArchive className="me-2" />
          <span>Archived Notes</span>
        </div>
      </div>

      {/* Tags */}
      <div className="mt-auto">
        <h6 className="fw-bold">Tags</h6>
        <ul className="list-unstyled">
          {tags.map((tag, index) => (
            <li key={index} className="d-flex align-items-center mb-2">
              <FaTag className="me-2" />
              <span>{tag}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
