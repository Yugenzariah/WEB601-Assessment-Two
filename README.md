# WEB601-Assessment-Two
A full-stack note taking web application

## Installation
Prerequisites
- Node.js v18+
- MongoDB instance (locak or cloud)

**Setup Instructuions**
1. Clone the repo: `git clone https://github.com/Yugenzariah/WEB601-Assessment-Two.git`
2. Install backend dependencies `cd server` then `npm install`
3. Install frontend dependencies `cd server` then `npm install`
4. Create an environment file inside server folder with MongoDB URI and JWT secret:
   `MONGO_URI=replace_this_with_yout_connection_string` `JWT_SECRET=add_your_secret_key`
5. Run backend <br> `cd ../server` `npm start`
6. Run frontend <br> `cd ../client` `npm start`
7. Visit `http://localhost:3000`

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
