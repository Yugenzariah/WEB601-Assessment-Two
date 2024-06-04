const express = require('express')
const mongoose = require('mongoose')
const User = require('./models/User')
const Note = require('./models/Note')
const app = express()
// Use middleware for body parser
app.use(express.json({ extended: true }))
app.use(express.urlencoded({extended:true}))
const port = 3000

// Connecting to the Database
const connectToMongoDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://Keith:WEB601-Assessment-Two@note-taking-web-applica.51gui5q.mongodb.net/?retryWrites=true&w=majority&appName=Note-Taking-Web-Application", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Successfully connected to MongoDB');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}

// Endpoints to serve user interface
app.get('/', (req, res) => {
    res.sendFile("/pages/homepage.html", { root: __dirname })
})

app.get('/login', (req, res) => {
    res.sendFile("/pages/login.html", { root: __dirname })
})

app.get('/signup', (req, res) => {
    res.sendFile("/pages/signup.html", { root: __dirname })
})

// Endpoints for APIs
app.post('/getnotes', (req, res) => {
    // Using json webtoken for user authentication
    const { userToken } = req.body
    res.sendFile("/pages/signup.html", { root: __dirname })
})

app.post('/login', async (req, res) => {
    let user = await User.findOne(req.body)
    if(!user){
        res.status(200).json({success: false, message: "No user found"})
    }
    else {
        res.status(200).json({success: true, user: {email: user.email}, message: "User found"})
    }
})

app.post('/signup', async (req, res) => {
    const { userToken } = req.body
    console.log(req.body)
    let user = await User.create(req.body)
    res.status(200).json({ success: true, user: user })
})

app.post('/addnote', (req, res) => {
    const { userToken } = req.body
    res.sendFile("/pages/signup.html", { root: __dirname })
})

app.post('/deletenote', (req, res) => {
    const { userToken } = req.body
    res.sendFile("/pages/signup.html", { root: __dirname })
})

app.listen(port, () => {
    console.log(`The note taking web app is listening on port http://localhost:${port}`)
})

module.exports = connectToMongoDB;