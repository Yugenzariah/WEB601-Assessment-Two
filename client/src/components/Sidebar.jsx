// Sidebar component displays user info, filter buttons, and tag list.
import React from 'react';

const Sidebar = ({ tags }) => {
  return (
    <div className="bg-light border-end p-3 h-100">
      <h6>Tags</h6>
      <ul className="list-unstyled">
        {tags.map((tag, index) => (
          <li key={index}>{tag}</li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
