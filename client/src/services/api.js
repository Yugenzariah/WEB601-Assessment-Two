// Handles API calls to backend for authentication and note management.
import axios from 'axios';

// Set your backend URL
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL
});

// =====================
// Auth endpoints
// =====================
export const registerUser = (userData) => api.post('/auth/register', userData);
export const loginUser = (userData) => api.post('/auth/login', userData);

// =====================
// Notes endpoints
// =====================
export const getNotes = (token) => api.get('/notes', { headers: { Authorization: token } });
export const createNote = (noteData, token) => api.post('/notes', noteData, { headers: { Authorization: token } });
export const updateNote = (noteId, noteData, token) => api.put(`/notes/${noteId}`, noteData, { headers: { Authorization: token } });
export const deleteNote = (noteId, token) => api.delete(`/notes/${noteId}`, { headers: { Authorization: token } });

export default api;