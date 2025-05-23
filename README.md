# NovaMind - MERN Note-Taking App
NovaMind is a full-stack note-taking application built using the MERN stack (MongoDB, Express, React, Node.js). It supports user authentication, tag-based filtering, dark mode, and note archiving.

## Installation
Prerequisites
- Node.js v18+
- MongoDB instance (local or cloud)

**Setup Instructuions**
1. Clone the repo: `git clone https://github.com/Yugenzariah/WEB601-Assessment-Two.git`
2. cd WEB601-Assessment-Two
3. Install backend dependencies: `cd server` then `npm install`
4. Install frontend dependencies: `cd server` then `npm install`
5. Create an environment file inside server folder with MongoDB URI and JWT secret:
   `MONGO_URI=replace_this_with_yout_connection_string` `JWT_SECRET=add_your_secret_key`
6. Run backend <br> `cd ../server` `npm start`
7. Run frontend <br> `cd ../client` `npm start`
8. Visit `http://localhost:3000`

## Technical Specifications

| Layer | Details |
|-------|---------|
| **Frontend** | React.js, Bootstrap 5, CSS, JSX |
| **Backend** | Node.js with Express.js |
| **Database** | MongoDB using Mongoose ODM |
| **Authentication** | JWT-based token authentication stored in localStorage or HTTP-only cookies |
| **Validation** | Client-side: HTML5 + React validation<br> Server-side: Mongoose schema validation |
| **API** | RESTful API (`/api/notes`, `/api/auth`, etc.) with secure route handling |
| **Version Control** | Git + GitHub repository + GitHub Project Roadmap |

## Project Structure

### /client/
This is the React frontend for the application.

#### /public/
Contains static files like the root `index.html` template for the React app.

#### /src/
Main source code for the React client.

- **/assets/**: Intended for storing static assets such as icons, logos, or images.
- **/components/**: Reusable React components.
  - `NoteCard.jsx`: Renders individual note previews.
  - `NoteForm.jsx`: Handles note editing/creation UI.
  - `PrivateRoute.jsx`: (Optional) Protects private routes.
  - `ProgressBar.jsx`: Placeholder for future enhancements.
  - `Sidebar.jsx`: Displays logout, tag filter, and navigation.
- **/context/**:
  - `DarkModeContext.jsx`: Provides global dark mode state using React Context API.
- **/pages/**: Page-level views for routing.
  - `Homepage.jsx`: Landing view.
  - `Login.jsx`: User login with toast feedback.
  - `Register.jsx`: User registration with validation.
  - `Dashboard.jsx`: Main note management UI.
- **/services/**:
  - `api.js`: Axios-based HTTP services for communicating with the backend.
- `App.jsx`: Root React component with route setup.
- `index.js`: Entry point that mounts the app with `DarkModeProvider`.

### /server/
This is the Express backend for the app.

- **/config/**:
  - `db.js`: MongoDB connection using Mongoose.
- **/controllers/**:
  - `authController.js`: Handles user auth logic.
  - `notesController.js`: Manages CRUD operations for notes.
- **/middleware/**:
  - `authMiddleware.js`: Validates JWT tokens.
- **/models/**:
  - `User.js`: User schema (fullName, email, password).
  - `Note.js`: Note schema (title, content, tags, isArchived, userId).
- **/routes/**:
  - `auth.js`: Auth routes (register, login, get user info).
  - `notes.js`: Note management routes.
- `server.js`: Entry point for backend setup.

## Features
- Secure user authentication (JWT-based)
- Note CRUD operations
- Tagging system
- Archive and filter notes
- Responsive layout with Bootstrap
- Dark mode support
- Toast notifications
