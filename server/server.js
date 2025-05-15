// Main backend server setup. Configures middleware. connects to the Database, and mounts routes.
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const authRoutes = require('./routes/auth');
require('dotenv').config();

const app = express();
connectDB(); // Connect to MongoDB
app.use(cors()); // Enable CORS for frontend communication
app.use(express.json()); // Parse incoming JSON requests
app.use('/api/auth', authRoutes); // Authenticate a user via login/register page

// Mount API routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is now running on port ${PORT}`));