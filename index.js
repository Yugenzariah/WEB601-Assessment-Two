const jwt = require('jsonwebtoken');
const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');
const Note = require('./models/Note');
const cookieParser = require('cookie-parser');
const app = express();

// Use middleware for body parser and cookies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // Use cookie-parser middleware

const port = 3000;

// JWT Secret Key
const jwtSecret = 'UJLAeInVY58CrwzVLd1foBXeFkbO4G/6ZuRRuvfT8WE=';

// Connecting to the Database
const connectToMongoDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://Keith:WEB601-Assessment-Two@note-taking-web-applica.51gui5q.mongodb.net/?retryWrites=true&w=majority&appName=Note-Taking-Web-Application", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Successfully connected to MongoDB');
    } catch (err) {
        console.error('Failed to connect to MongoDB:', err.message);
        process.exit(1);
    }
};

// Middleware function for user authentication
const auth = async (req, res, next) => {
    try {
        const authHeader = req.header('Authorization');
        let token;

        if (authHeader) {
            token = authHeader.replace('Bearer ', '');
        } else if (req.cookies.auth) {
            token = req.cookies.auth;
        } else {
            throw new Error('Authorization header or token cookie not found');
        }

        const decoded = jwt.verify(token, jwtSecret);
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

        if (!user) {
            throw new Error('Authentication failed');
        }

        req.token = token;
        req.user = user;
        next();
    } catch (error) {
        console.error("Authentication error:", error.message);
        res.status(401).send({ error: 'Please authenticate.' });
    }
};

// Endpoints to serve user interface
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/pages/login.html');
});

app.get('/homepage', auth, (req, res) => {
    res.sendFile(__dirname + '/pages/homepage.html');
});

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/pages/login.html');
});

app.get('/signup', (req, res) => {
    res.sendFile(__dirname + '/pages/signup.html');
});

// Endpoints for APIs
app.post('/getnotes', auth, async (req, res) => {
    try {
        let notes = await Note.find({ email: req.user.email });
        res.status(200).json({ success: true, notes });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, password });
        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        const token = jwt.sign({ _id: user._id.toString() }, jwtSecret, { expiresIn: '1h' }); // Set token expiration to 1 hour
        user.tokens = user.tokens.concat({ token });
        await user.save();

        res.cookie('auth', token, { httpOnly: true }); // Set token as cookie
        res.status(200).json({ success: true, user: { _id: user._id, email: user.email }, token });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

app.post('/signup', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = new User({ email, password, tokens: [] });

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Email already exists' });
        }

        await user.save();
        res.status(201).json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to signup. Please try again later.' });
    }
});

app.post('/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        });
        await req.user.save();
        res.clearCookie('auth'); // Clear the auth cookie
        res.status(200).send({ success: true, message: 'Logged out successfully' });
    } catch (error) {
        res.status(500).send({ success: false, message: 'Failed to logout' });
    }
});

app.post('/addnote', auth, async (req, res) => {
    try {
        const note = await Note.create({ email: req.user.email, title: req.body.title, desc: req.body.desc });
        res.status(200).json({ success: true, note });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

app.post('/deletenote', auth, async (req, res) => {
    try {
        const noteId = req.body.noteId;
        const note = await Note.findOneAndDelete({ _id: noteId, email: req.user.email });

        if (!note) {
            return res.status(404).json({ success: false, message: "Note not found" });
        }

        res.status(200).json({ success: true, message: "Note deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

app.listen(port, () => {
    console.log(`The note taking web app is listening on port http://localhost:${port}`);
});

connectToMongoDB();