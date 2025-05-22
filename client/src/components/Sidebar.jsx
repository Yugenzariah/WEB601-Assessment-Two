import { FaUserCircle, FaStickyNote, FaArchive, FaTag } from 'react-icons/fa';

const Sidebar = ({ tags, showArchived, setShowArchived, setActiveNote, setIsEditing, activeTag, setActiveTag }) => {
  const handleToggle = (archived) => {
    setShowArchived(archived);
    setActiveNote(null);
    setIsEditing(false);
    setActiveTag(null);
  };

  const handleTagClick = (tag) => {
    setActiveTag(prev => prev === tag ? null : tag);
    setActiveNote(null);
    setIsEditing(false);
  };

  return (
    <div className="d-flex flex-column h-100 p-3">
      {/* Top user info */}
      <div className="text-center mb-4">
        <FaUserCircle size={60} className="text-secondary" />
        <h6 className="mt-2 fw-bold">Username</h6>
        <button
          className="btn btn-sm btn-outline-secondary mt-2"
          onClick={() => {
            localStorage.removeItem('token');
            window.location.href = '/login';
          }}
        >
          Logout
        </button>
      </div>

      {/* Navigation */}
      <div>
        <div
          className={`d-flex align-items-center mb-3 ${!showArchived ? 'fw-bold text-primary' : ''}`}
          style={{ cursor: 'pointer' }}
          onClick={() => handleToggle(false)}
        >
          <FaStickyNote className="me-2" />
          <span>All Notes</span>
        </div>
        <div
          className={`d-flex align-items-center mb-4 ${showArchived ? 'fw-bold text-primary' : ''}`}
          style={{ cursor: 'pointer' }}
          onClick={() => handleToggle(true)}
        >
          <FaArchive className="me-2" />
          <span>Archived Notes</span>
        </div>
      </div>

      {/* Tags */}
      <div className="mt-auto">
        <h6 className="fw-bold">Tags</h6>
        <ul className="list-unstyled">
          {tags.map((tag, index) => (
            <li
              key={index}
              className={`d-flex align-items-center mb-2 ${activeTag === tag ? 'fw-bold text-primary' : ''}`}
              style={{ cursor: 'pointer' }}
              onClick={() => handleTagClick(tag)}
            >
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