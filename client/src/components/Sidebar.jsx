import React, { useState, useEffect } from "react";
import { FaUserCircle, FaStickyNote, FaArchive, FaTag } from "react-icons/fa";
import { getUser } from "../services/api";
import { useDarkMode } from "../context/DarkModeContext";
import { FaMoon, FaSun } from "react-icons/fa";

const Sidebar = ({
  tags,
  showArchived,
  setShowArchived,
  setActiveNote,
  setIsEditing,
  activeTag,
  setActiveTag,
}) => {
  const [username, setUsername] = useState("User");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getUser(token)
        .then((res) => setUsername(res.data.fullName || "User"))
        .catch((err) => console.error("Failed to fetch user info", err));
    }
  }, []);

  const handleToggle = (archived) => {
    setShowArchived(archived);
    setActiveNote(null);
    setIsEditing(false);
    setActiveTag(null);
  };

  const handleTagClick = (tag) => {
    setActiveTag((prev) => (prev === tag ? null : tag));
    setActiveNote(null);
    setIsEditing(false);
  };

  const { darkMode, setDarkMode } = useDarkMode();

  return (
    <div className="d-flex flex-column h-100 p-3">
      {/* Top user info */}
      <div className="text-center mb-4">
        <FaUserCircle size={60} className="text-secondary" />
        <h6 className="mt-2 fw-bold">{username}</h6>
        <button
          className="btn btn-sm btn-outline-secondary mt-2"
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
        >
          Logout
        </button>
        <button
          className="btn btn-sm btn-outline-dark mt-2"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? <FaSun className="me-1" /> : <FaMoon className="me-1" />}
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      {/* Navigation */}
      <div>
        <div
          className={`d-flex align-items-center mb-3 ${
            !showArchived ? "fw-bold text-primary" : ""
          }`}
          style={{ cursor: "pointer" }}
          onClick={() => handleToggle(false)}
        >
          <FaStickyNote className="me-2" />
          <span>All Notes</span>
        </div>
        <div
          className={`d-flex align-items-center mb-4 ${
            showArchived ? "fw-bold text-primary" : ""
          }`}
          style={{ cursor: "pointer" }}
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
              className={`d-flex align-items-center mb-2 ${
                activeTag === tag ? "fw-bold text-primary" : ""
              }`}
              style={{ cursor: "pointer" }}
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